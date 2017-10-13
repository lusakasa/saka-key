# Storage

This file contains functions used to interact with persistent storage (and save options).

## Storage Format

The following is an example of how configuration and options are persisted to local storage.

```javascript
{
  // available categories
  "categories": ["General", "Keybindings", "Hints"],
  // configuration array for each category pulled from config_{category}.json
  "config_General": [{ "type": "header", "label": "welcome" }],
  "config_Keybindings": [],
  "config_Hints": [],
  // built-in profiles for each category
  "builtInProfiles_General": ["default", "power"],
  "builtInProfiles_Keybindings": ["default", "power", "one_hand", "vimium"],
  "builtInProfiles_Hints": ["default", "vimium"],
  // available profiles for each category
  "customProfiles_General": ["test"],
  "customProfiles_Keybindings": ["test", "cat"],
  "customProfiles_Hints": [],
  // active profile for each category
  "activeProfile_General": "sufyan",
  "activeProfile_Keybindings": "default",
  "activeProfile_Hints": "vimium",
  // options for each category+profile
  "options_General_sufyan": {
    "enabled": true,
    "preventStealFocus": true,
    "disablePageShortcuts": false,
    "hintDetectByCursorStyle": true,
    "smoothScroll": true,
    "scrollStep": 26
  },
  "options_General_test": {
    "enabled": true,
    "preventStealFocus": true,
    "disablePageShortcuts": true,
    "hintDetectByCursorStyle": true,
    "smoothScroll": true,
    "scrollStep": 10
  },
  "options_Keybindings_test":  {
    "physicalKeys": true,
    "ignoreModifierKeys": false,
    "toggleHelpMenu": [
      [{ "code": "Slash", "key": "?", "shiftKey": true }]
    ],
    "toggleOmnibar": [],
    "openLink": [],
    "openLinkInBackgroundTab": [],
    "openLinkInForegroundTab": [],
    "openLinkInNewWindow": [],
    "openLinkInIncognitoWindow": [],
    "downloadLink": [],
    "focusLink": [],
    "hintChars": "ajskdlgheworuvncm",
    "scrollDown": [],
    "scrollUp": [],
    "scrollLeft": [],
    "scrollRight": [],
    "scrollPageDown": [],
    "scrollPageUp": [],
    "scrollHalfPageDown": [],
    "scrollHalfPageUp": [],
    "scrollToBottom": [],
    "scrollToTop": [],
    "goBack": [],
    "goForward": [],
    "goUp": [],
    "goToRoot": [],
    "nextTab": [],
    "previousTab": [],
    "firstTab": [],
    "lastTab": [],
    "moveTabLeft": [],
    "moveTabRight": [],
    "moveTabFirst": [],
    "moveTabLast": [],
    "closeTab": [],
    "closeOtherTabs": [],
    "closeLeftTabs": [],
    "closeRightTabs": [],
    "newTab": [],
    "restoreTab": [],
    "duplicateTab": [],
    "switchWindow": [],
    "zoomIn": [],
    "zoomOut": [],
    "zoomReset": [],
    "refreshTab": [],
    "refreshAllTabs": [],
    "toggleMuteTab": [],
    "toggleMuteAllTabs": [],
    "togglePinTab": [],
    "passOneKey": [],
    "passAllKeys": [],
    "copyURL": [],
    "clipboardCurrentTab": [],
    "clipboardBackgroundTab": [],
    "clipboardForegroundTab": [],
    "clipboardNewWindow": [],
    "clipboardIncognitoWindow": []
  },
  // TODO(not yet implemented): user-defined options
  "customOptions_General": ["switchToTabN", "moveTabToN", "saveToPocket", "saveToPocketWithTags"],
  "customOptions_Keybindings": [],
  "customOptions_Hints": [],
  "customOptions": {
    "switchToTabN": {
      "type": "keybinding",
      "label": "Switch To Tab N",
      "key": "switchToTabN",
      "default": []
    },
    "moveTabToN": {
      "type": "keybinding",
      "label": "Move Tab To Index N",
      "key": "moveTabToN",
      "default": []
    },
    "saveToPocket": {
      "type": "keybinding",
      "label": "Save To Pocket",
      "key": "saveToPocket",
      "default": []
    },
    "saveToPocketWithTags": {
      "type": "keybinding",
      "label": "Save To Pocket With Tags",
      "key": "saveToPocketWithTags",
      "default": []
    }
  },
  "customCommands": {
    
  }
}
```