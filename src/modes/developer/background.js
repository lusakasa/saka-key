const MODE = 'Developer';

export const mode = {
  name: MODE,
  onInstalled: () => {},
  clientSettings: (options, settings) => ({
    values: {},
    errors: {}
  }),
  messages: {}
};
