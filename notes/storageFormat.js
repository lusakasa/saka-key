const storageFormat = {
  modes: ['Basic', 'Command', 'Hints'],
  profiles: [

  ]
};

// enabled state
// keybindings

const accesibleByContentScripts = {
  //modes: ['Basic', 'Command', 'Hints', 'Developer', 'Text'], unneeded since modes are part of client
  Basic: { enabled: true },
  Command: { bindings: { ... }, }

}


settings = {
  modes: [
    {
      name: 'Basic',
      profiles: [
        {
          name: 'standard',
          settings: {
            enabled: false,
            primaryColor: '#ffffff',
            secondaryColor: '#777777'
          }
        },
        {
          name: 'funny colors',
          settings: {
            enabled: false,
            primaryColor: '#89365f',
            secondaryColor: '#777777'
          }
        },
      ]
    },
    {
      name: 'Command',
      profiles: [
        {
          name: 'standard',
          settings: {
            smoothScroll: true
          }
        },
        {
          name: 'left hand',
          settings: {
            smoothScroll: true
          }
        },
      ]
    }
  ],
  selectedProfilesGroup: 'left hand',
  profilesGroups: [
    {
      name: 'standard'
      settings: {
        Basic: 'standard',
        Command: 'standard',
        Hints: 'standard',
        Text: 'standard'
      }
    },
    {
      name: 'left hand',
      settings: {
        Basic: 'standard',
        Command: 'left hand',
        Hints: 'left hand',
        Text: 'standard'
      }
    }

  ]
}