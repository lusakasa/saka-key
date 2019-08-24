# Storage

This file contains functions used to interact with persistent storage (and save options).

## Storage Format

The following is an example of how configuration and options are persisted to local storage.

```javascript
{
  // available categories
  "categories": ["General", "Keybindings", "Hints", "Custom Commands"],
  // configuration array for each category pulled from config_{category}.json
  "config_General": [ /* see General.json  at https://github.com/lusakasa/saka-key/blob/master/src/options/General/config.json*/ ],
  "config_Keybindings": [ /* see Keybindings.json */ ],
  "config_Hints": [ /* see Hints.json */ ],
  "config_Custom Commands": [ { type: "CustomCommand", "key": "customCommands", label: "Custom Commands"],
  /* or see Custom Commands.json */
  // built-in profiles for each category
  "builtInProfiles_General": ["default", "power"],
  "builtInProfiles_Keybindings": ["default", "power", "one_hand", "vimium"],
  "builtInProfiles_Hints": ["default", "vimium"],
  "builtInProfiles_Custom Commands": ["default"],
  // available profiles for each category
  "customProfiles_General": ["test"],
  "customProfiles_Keybindings": ["test", "cat"],
  "customProfiles_Hints": [],
  "customProfiles_Custom Commands": [],
  // active profile for each category
  "activeProfile_General": "sufyan",
  "activeProfile_Keybindings": "default",
  "activeProfile_Hints": "vimium",
  "activeProfile_Custom Commands": "default",
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
  "options_Custom Commands_default": {
    // this item is used for rendering the CustomCommands Widget
    // the "customOptions" key is used to render additional widgets
    "customCommands": [
      {
        "key": "switchToHTTPS",
        "label": "Switch To HTTPS",
        "function": "()=>{document.location=document.location.href.replace(/^http:/,'https:')}"
      },
      {
        "key": "toggleYouTubePlay",
        "label": "Pause/Play YouTube",
        "function": "()=>{document.querySelector('.ytp-play-button').click()}"
      }
    ]
  },
  // Custom Config Items
  "customOptions_General": [],
  "customOptions_Keybindings": ["switchToHTTPS", "toggleYouTubePlay"],
  "customOptions_Hints": [],
  "customOptions_Custom Commands": [],
  // Custom Options
  "customOptions": {
    "switchToHTTPS": {
      "type": "keybinding",
      "label": "Switch To HTTPS",
      "key": "switchToHTTPS",
      "default": []
    },
    "toggleYouTubePlay": {
      "type": "keybinding",
      "label": "Pause/Play YouTube",
      "key": "toggleYouTubePlay",
      "default": []
    }
  }
}
```
