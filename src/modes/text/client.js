export default {
  keydown: (event) => {
    if (event.key === 'Escape') {
      document.activeElement.blur();
    }
    // firefox doesn't fire blur events if the active element is removed from
    // the DOM or its style is set to none. The following is hacky workaround
    // https://bugzilla.mozilla.org/show_bug.cgi?id=559561
    // TODO: return 'Same' on all platforms when firefox fixes the bug
    return SAKA_PLATFORM === 'firefox' ? 'Reset' : 'Same';
  },
  blur: () => 'Reset',
  focus: () => 'Reset'
};
