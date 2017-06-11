export default {
  clientSettings: (options, { enabled, preventStealFocus }) => {
    return {
      values: { enabled, preventStealFocus },
      errors: {}
    };
  }
};
