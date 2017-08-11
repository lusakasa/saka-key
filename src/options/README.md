# Options

Each subdirectory here represents an options category.
Each category subdirectory contains the files:

* **config.json** - defines the settings key, type, label, and other values
* **default.json** - defines default profiles that specify the value for each key in config.json
* **index.js** - defines a transform function that takes the user-defined options and per-category configs and returns the options reported to the background page and clients. Also returns an error message for each option with an invalid value.

```typescript
transform: (options: JSON[], config: JSON) => ({
  backgroundOptions: JSON,
  clientOptions: JSON
  errors: JSON,
})
```

The outputs of the transform function of each category are merged. The merged `backgroundOptions` object is forwarded to the background page and passed to the `onOptionsChange()` function of each mode's background component.

Similarly, the merged `clientOptions` object is forwarded to every open Saka Key client and passed to the `onOptionsChange()` function of each mode's client component.

The merged `errors` object is used by the options page to notify user's of errors in the options.