# modes

All logic for a given mode is isolated within one directory here. 

For example, Command mode is in *command*, and Hints mode is in  *hints*.

Each mode's directory must have the following structure:

* **mode/**
  * **background/**
    * **index.js** - logic that runs in the background page
  * **client/**
    * **index.js** - logic that runs on every page
  * **config.json** - describes the mode's settings (used to generate the options page)
  * **default.json** - defines built-in settings profiles

See the [developer guide](/notes/developer_guide.md) to learn more about modes.



