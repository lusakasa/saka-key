export function toggleHelpMenu () {
  // TODO
}

export function toggleSaka () {
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
export function passOneKey (event) {
  // preventDefault() to suppress keypress event
  // no way to suppress keyup event, so Pass mode must ignore
  // first keyup event
  event.preventDefault()
  event.passKeyType = 'one'
  return 'Pass'
}

export function passAllKeys (event) {
  event.preventDefault()
  event.passKeyType = 'all'
  return 'Pass'
}

// TODO: Get from options.
let customCommands = {
  toHttps: {
    preventDefault: true, // The default.
    code:
      'document.location = document.location.href.replace(/^http:/, "https:")'
  }
}

export function customCommand (id, event) {
  let impl = customCommands[id]
  console.log('Custom command', id, impl)

  if (impl.preventDefault) event.preventDefault()
  let global_eval = eval; // This causes the eval to happen in the global scope.
  let func = global_eval(`
    (event) => {
      ${impl.code}
    }
  `);
  return func(event);
}
