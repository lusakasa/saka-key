export const mode = {
  name: 'Basic',
  clientSettings: (options, { enabled, preventStealFocus }) => {
    return {
      values: { enabled, preventStealFocus },
      errors: {}
    };
  },
  messages: {}
};
