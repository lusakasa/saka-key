import browser from 'webextension-polyfill'

export const storageGet = browser.storage.local.get
export const storageSet = browser.storage.local.set
export const storageRemove = browser.storage.local.remove
export const storageClear = browser.storage.local.clear

export async function getAllActiveProfileOptions () {
  const { activeProfiles } = await storageGet('activeProfiles')
  const { options } = await storageGet('options')
  const activeOptions = {}
  for (const [category, profile] of Object.entries(activeProfiles)) {
    Object.assign(activeOptions, options[`${category}_${profile}`])
  }
  return activeOptions
}
