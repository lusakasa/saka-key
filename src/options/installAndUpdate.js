import {
  storageGet,
  storageSet,
  storageHas
} from 'options/storage';
import { categories as installCategories } from 'options/transform';

export async function storageInstallProcedure () {
  await createCategories();
  await createConfig();
  await createBuiltInProfiles();
  await createCustomProfiles();
  await createActiveProfiles();
  await createBuiltInOptions();
}

export async function storageUpdateProcedure () {
  // order matters: e.g. you must delete the old built-in options using the
  // built-in profiles already in storage, not the built-in profiles in the update
  await deleteBuiltInOptions();
  await deleteBuiltInProfiles();
  await deleteConfig();
  await deleteCategories();
  await createCategories();
  await createConfig();
  await createBuiltInProfiles();
  await correctActiveProfiles(); // if the active profile is a deleted built-in profile
  await createBuiltInOptions();
  await correctCustomOptions();
}

async function createCategories () {
  await storageSet({ categories: installCategories });
}

async function createConfig () {
  const { categories } = await storageGet('categories');
  const config = {};
  for (const category of categories) {
    const request = await fetch(`/config_${category}.json`);
    const result = await request.json();
    config[category] = result.options;
  }
  await storageSet({ config });
}

async function createBuiltInProfiles () {
  const { categories } = await storageGet('categories');
  const builtInProfiles = {};
  for (const category of categories) {
    const request = await fetch(`/default_${category}.json`);
    const { profiles } = await request.json();
    builtInProfiles[category] = profiles.map((profile) => profile.name);
  }
  await storageSet({ builtInProfiles });
}

async function createCustomProfiles () {
  const { categories } = await storageGet('categories');
  const customProfiles = {};
  for (const category of categories) {
    customProfiles[category] = [];
  }
  await storageSet({ customProfiles });
}

async function createActiveProfiles () {
  const { categories } = await storageGet('categories');
  const activeProfiles = {};
  for (const category of categories) {
    activeProfiles[category] = 'default';
  }
  await storageSet({ activeProfiles });
}

/**
 * If options don't exist, creates them using the built-in profiles.
 * If options exist, adds built-in profile options.
 */
async function createBuiltInOptions () {
  const { options = {} } = await storageGet('options');
  const { categories } = await storageGet('categories');
  for (const category of categories) {
    const request = await fetch(`/default_${category}.json`);
    const { profiles } = await request.json();
    for (const profile of profiles) {
      options[`${category}_${profile.name}`] = profile.options;
    }
  }
  await storageSet({ options });
}

async function deleteBuiltInOptions () {
  // TODO
}

async function deleteBuiltInProfiles () {
  // TODO
}

async function deleteConfig () {

}

async function deleteCategories () {
  // TODO
}

async function correctActiveProfiles () {

}

async function correctCustomOptions () {
  // TODO
}
