export function toggleHelpMenu() {
  // TODO
}

export function toggleSaka() {
  try {
    browser.runtime.sendMessage(
      'nbdfpcokndmapcollfpjdpjlabnibjdi',
      'toggleSaka'
    )
  } catch (e) {
    console.error(
      'Install Saka at https://chrome.google.com/webstore/detail/saka/nbdfpcokndmapcollfpjdpjlabnibjdi'
    )
  }
}
export function passOneKey(event) {
  // preventDefault() to suppress keypress event
  // no way to suppress keyup event, so Pass mode must ignore
  // first keyup event
  event.preventDefault()
  event.passKeyType = 'one'
  return 'Pass'
}

export function passAllKeys(event) {
  event.preventDefault()
  event.passKeyType = 'all'
  return 'Pass'
}
