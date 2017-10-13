import { background } from 'lib/msg'

export const openLink = background('findHints', {
  filter: 'links',
  activate: 'openLink'
})
export const openLinkInBackgroundTab = background('findHints', {
  filter: 'links',
  activate: 'openLinkInBackgroundTab'
})
export const openLinkInForegroundTab = background('findHints', {
  filter: 'links',
  activate: 'openLinkInForegroundTab'
})
export const openLinkInNewWindow = background('findHints', {
  filter: 'links',
  activate: 'openLinkInNewWindow'
})
export const openLinkInIncognitoWindow = background('findHints', {
  filter: 'links',
  activate: 'openLinkInIncognitoWindow'
})
export const downloadLink = background('findHints', {
  filter: 'links',
  activate: 'downloadLink'
})
export const focusLink = background('findHints', {
  fitler: 'links',
  activate: 'focusLink'
})
