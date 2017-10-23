import {
  storageGet,
  storageSet,
  storageRemove,
  storageClear
} from 'storage/storage'
import { msg } from 'mosi/client'
import { categories as installCategories } from 'storage/transform'
import { downloadJSON } from 'lib/dom'
import compareVersions from 'compare-versions'

// TODO: test this code, lots of room for error, should really have unit tests

export async function storageInstallProcedure () {
  try {
    await storageSet({ ready: false })
    await createCategories()
    await createConfig()
    if (SAKA_DEBUG) await validateConfig()
    await createBuiltInProfiles()
    await createCustomProfiles()
    await createActiveProfiles()
    await createBuiltInOptions()
    await storageSet({ ready: true })
  } catch (e) {
    console.error(
      'FATAL ERROR: INSTALLATION FAILED. DELETE THEN REINSTALL THE EXTENSION.',
      e
    )
  }
}

export async function storageUpdateProcedure (previousVersion) {
  try {
    // order matters: e.g. you must delete the old built-in options using the
    // built-in profiles already in storage, not the built-in profiles in the update
    await storageSet({ ready: false })
    if (compareVersions(previousVersion, '1.16') <= 0) {
      await storageClear()
      await storageInstallProcedure()
    } else {
      await deleteBuiltInOptions()
      await deleteBuiltInProfiles()
      await deleteConfig()
      await deleteCategories()
      await createCategories()
      await createConfig()
      if (SAKA_DEBUG) await validateConfig()
      await createBuiltInProfiles()
      await renameCustomProfilesAndOptions() // if a new built-in profile 'steals' the name of an existing custom profile
      await correctActiveProfiles() // if the active profile is a deleted built-in profile
      await createBuiltInOptions()
      await correctCustomOptions()
    }
    await storageSet({ ready: true })
  } catch (e) {
    console.error(
      'FATAL ERROR: UPDATE FAILED. WIPING STORAGE AND REINITIALIZING.',
      e
    )
    await storageClear()
    await storageInstallProcedure()
  }
}

// TODO: proper import validation
export async function storeageImportProcedure () {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', '.json')
  input.addEventListener('change', e => {
    const reader = new FileReader()
    reader.onload = async () => {
      await storageResetProcedure()
      const { customProfiles, options } = await storageGet([
        'customProfiles',
        'options'
      ])
      const { activeProfiles, profiles } = JSON.parse(reader.result)
      for (const category in profiles) {
        for (const profile in profiles[category]) {
          customProfiles[category].push(profile)
          options[`${category}_${profile}`] = profiles[category][profile]
        }
      }
      await storageSet({ customProfiles, activeProfiles, options })
      msg('options_page', 'RERENDER')
    }
    reader.readAsText(e.target.files[0])
  })
  input.click()
}

export async function storageExportProcedure () {
  const { customProfiles, activeProfiles, options } = await storageGet([
    'customProfiles',
    'activeProfiles',
    'options'
  ])
  const profiles = {}
  for (const category in customProfiles) {
    profiles[category] = {}
    customProfiles[category].forEach(profile => {
      profiles[category][profile] = options[`${category}_${profile}`]
    })
  }
  await downloadJSON({ activeProfiles, profiles }, 'saka_key_config.json')
}

export async function storageResetProcedure () {
  await storageClear()
  await storageInstallProcedure()
  msg('options_page', 'RERENDER')
}

async function createCategories () {
  await storageSet({ categories: installCategories })
}

async function createConfig () {
  const { categories } = await storageGet('categories')
  const config = {}
  for (const category of categories) {
    const request = await fetch(`/config_${category}.json`)
    const result = await request.json()
    config[category] = result.options
  }
  await storageSet({ config })
}

// TODO: define a per-type validation function
async function validateConfig () {
  const { config } = await storageGet('config')
  const allKeys = {}
  for (const [category, _config] of Object.entries(config)) {
    for (const item of _config) {
      if (!item.hasOwnProperty('type')) {
        throw Error(
          `Config validation failed: item ${category}:${item.key ||
            '[no key]'} has no type`,
          item
        )
      }
      if (item.hasOwnProperty('key')) {
        if (allKeys.hasOwnProperty(item.key)) {
          throw Error(
            `Config validation failed: two items share the key ${item.key}`
          )
        } else {
          allKeys[item.key] = true
        }
        if (!item.hasOwnProperty('default')) {
          throw Error(
            `Config validation failed: no default value for key ${item.key}`
          )
        }
      }
    }
  }
}

async function createBuiltInProfiles () {
  const { categories } = await storageGet('categories')
  const builtInProfiles = {}
  for (const category of categories) {
    const request = await fetch(`/default_${category}.json`)
    const { profiles } = await request.json()
    builtInProfiles[category] = profiles.map(profile => profile.name)
  }
  await storageSet({ builtInProfiles })
}

async function createCustomProfiles () {
  const { categories } = await storageGet('categories')
  const customProfiles = {}
  for (const category of categories) {
    customProfiles[category] = []
  }
  await storageSet({ customProfiles })
}

async function createActiveProfiles () {
  const { categories } = await storageGet('categories')
  const activeProfiles = {}
  for (const category of categories) {
    activeProfiles[category] = 'default'
  }
  await storageSet({ activeProfiles })
}

/**
 * If options don't exist, creates them using the built-in profiles.
 * If options exist, adds built-in profile options.
 */
async function createBuiltInOptions () {
  const { options = {} } = await storageGet('options')
  const { categories } = await storageGet('categories')
  for (const category of categories) {
    const request = await fetch(`/default_${category}.json`)
    const { profiles } = await request.json()
    for (const profile of profiles) {
      options[`${category}_${profile.name}`] = profile.options
    }
  }
  await storageSet({ options })
}

async function deleteBuiltInOptions () {
  const { categories, options, builtInProfiles } = await storageGet([
    'categories',
    'options',
    'builtInProfiles'
  ])
  for (const category of categories) {
    for (const profile of builtInProfiles[category]) {
      delete options[`${category}_${profile}`]
    }
  }
  await storageSet({ options })
}

async function deleteBuiltInProfiles () {
  await storageRemove('builtInProfiles')
}

async function deleteConfig () {
  await storageRemove('config')
}

/**
 * Accounts for the case where a built-in profile introduced in an update conflicts with
 * a custom profile already installed. Renames the custom profile, active profile, and action
 * if a conflict is detected.
 */
async function renameCustomProfilesAndOptions () {
  const {
    categories,
    customProfiles,
    builtInProfiles,
    activeProfiles,
    options
  } = await storageGet([
    'categories',
    'customProfiles',
    'builtInProfiles',
    'activeProfiles',
    'options'
  ])
  for (const category of categories) {
    const _builtInProfiles = builtInProfiles[category]
    const _customProfiles = customProfiles[category]
    const _activeProfile = activeProfiles[category]
    _customProfiles.forEach((customProfile, i) => {
      if (_builtInProfiles.indexOf(customProfile) !== -1) {
        // rename custom profile
        const newProfileName = `${customProfile}_renamed_${Date.now()}`
        _customProfiles[i] = newProfileName
        // rename active profile
        if (_activeProfile === customProfile) {
          activeProfiles[category] = newProfileName
        }
        // rename options
        options[`${category}_${newProfileName}`] =
          options[`${category}_${customProfile}`]
        delete options[`${category}_${customProfile}`]
      }
    })
  }
  await storageSet({ customProfiles, activeProfiles, options })
}

async function deleteCategories () {
  await storageRemove('categories')
}
/**
 * Accounts for the case where the active profile has been deleted
 */
async function correctActiveProfiles () {
  const {
    categories,
    activeProfiles,
    builtInProfiles,
    customProfiles
  } = await storageGet([
    'categories',
    'activeProfiles',
    'builtInProfiles',
    'customProfiles'
  ])
  for (const category of categories) {
    const profiles = [...builtInProfiles[category], ...customProfiles[category]]
    if (profiles.indexOf(activeProfiles[category]) === -1) {
      activeProfiles[category] = 'default'
    }
  }
  await storageSet({ activeProfiles })
}

async function correctCustomOptions () {
  const { config, options, categories, customProfiles } = await storageGet([
    'config',
    'options',
    'categories',
    'customProfiles'
  ])
  for (const category of categories) {
    for (const profile of customProfiles[category]) {
      const key = `${category}_${profile}`
      options[key] = correctedOptions(options[key], config[category])
    }
  }
  await storageSet({ options })
}

function correctedOptions (options, config) {
  const newOptions = {}
  for (const item of config) {
    newOptions[item.key] = correctValue(options[item.key], item)
  }
  return newOptions
}

/**
 * If the value conforms to the constraints defined in the config file,
 * returns the value unchanged. Otherwise returns the default value for the option.
 */
function correctValue (value, configItem) {
  // TODO
  return value === undefined ? configItem.default : value
}
