import { background } from 'lib/msg'

export const openLink = background('findHints', {
  filter: '*',
  activate: 'openLink'
})
export const openLinkInBackgroundTab = background('findHints', {
  filter: '*',
  activate: 'openLinkInBackgroundTab'
})
export const openLinkInForegroundTab = background('findHints', {
  filter: '*',
  activate: 'openLinkInForegroundTab'
})
export const openLinkInNewWindow = background('findHints', {
  filter: '*',
  activate: 'openLinkInNewWindow'
})
export const openLinkInIncognitoWindow = background('findHints', {
  filter: '*',
  activate: 'openLinkInIncognitoWindow'
})
export const downloadLink = background('findHints', {
  filter: '*',
  activate: 'downloadLink'
})
export const focusLink = background('findHints', {
  filter: '*',
  activate: 'focusLink'
})
export const focusInput = background('findHints', {
  filter:
    'input:not([type=submit]):not([type=button]):not([type=reset]):not([type=file]), textarea, select',
  activate: 'openLink'
})
