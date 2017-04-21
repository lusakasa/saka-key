export const mode = {
  name: 'Basic',
  onInstalled: () => {},
  clientSettings: (options, { enabled }) => ({
    values: { enabled },
    errors: {}
  }),
  messages: {
    toggleHelpMenu: () => {
      // chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
      //   msg(`tab[${tab.id}]&topFrame`, 'modeMessage', {
      //     mode: 'Basic',
      //     action: 'toggleHelpMenu'
      //   });
      // });
    }
  }
};
