# Settings

**NOTE THIS IS A WORK IN PROGRESS AND IS CURRENTLY UNUSED**

Settings are _complicated_.

Each subdirectory here represents a settings category.

Each category has an independent per-domain configuration (e.g. Keybindings might have a special setting for https://www.gmail.com/ but Appearance is unchanged).

Each category subdirectory contains the files:

* **config.json** - defines the settings key, type, label, and other values
* **default.json** - defines default profiles that specify the value for each key in config.json
* **index.js** - defines a function that takes the config object from config.json and the key-value map for each setting in the category, and returns the errors, the background page values, and client values.

```typescript
settingsGenerator: (config: JSON, settings: JSON) => ({
  errors: JSON,
  backgroundSettings: JSON,
  clientSettings: JSON
})
```

Each mode then defines a function 

It stores settings in a per-category, per-domain LRU cache. Retrieving values requires the function (category, domain) => settings

---

## Generating settings

1. User navigates to a page
2. Page sends message to background page requesting settings
3. Background page checks settings cache for URL of message sender
    * If URL in cache:
    * I

* function getSettings(domain): completeSettings =>
    combine(cache.get())

```javascript
const getSettings = (url) => {
  const glob = closestMatch(url)
  return Object.assign({}, ...categories.map((c) =>
    cache.get(`${c}_${glob}`) || computeSettings(c, glob)));
}

const computeSettings = (c, glob) => {
  const config = await fetch(`${d}_config.json`);
  const settings = await browser.storage.get(`${c}_${glob}_clientSettings`);
}

// when settings is changed:
function onSettingChanged ( category, profile, url, key, value ) {
  const { errors, backgroundSettings, clientSettings } = await generateSettings(config, settings);
}


// background pages can import the function settings(c, url) to fetch their
// settings on the fly

```