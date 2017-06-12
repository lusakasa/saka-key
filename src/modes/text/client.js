export default {
  keydown: (event) => {
    if (event.key === 'Escape') {
      document.activeElement.blur();
    }
    return 'Same';
  },
  blur: () => 'Reset',
  focus: () => 'Reset'
};
