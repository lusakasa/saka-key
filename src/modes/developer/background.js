const MODE = 'Developer';

export const mode = {
  name: MODE,
  onInstalled: () => {},
  onSettingChange: (profile, newSettings) => {},
  clientSettings: (options, settings) => undefined,
  messages: {}
};
