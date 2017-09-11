const activate = hintType => event => {
  event.hintType = hintType
  return 'Hints'
}

export const openLink = activate('currentTab')
export const openLinkInBackgroundTab = activate('backgroundTab')
export const openLinkInForegroundTab = activate('foregroundTab')
export const openLinkInNewWindow = activate('newWindow')
export const openLinkInIncognitoWindow = activate('incognitoWindow')
export const downloadLink = activate('download')
export const focusLink = activate('focusLink')
