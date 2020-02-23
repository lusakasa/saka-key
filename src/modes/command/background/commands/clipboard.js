import { searchURL } from 'lib/url'
import { paste } from 'lib/dom'
import browser from 'webextension-polyfill'

export async function clipboardCurrentTab () {
  await browser.tabs.update({ url: searchURL(paste()) })
}

export async function clipboardBackgroundTab () {
  await browser.tabs.create({ url: searchURL(paste()), active: false })
}

export async function clipboardForegroundTab () {
  await browser.tabs.create({ url: searchURL(paste()) })
}

export async function clipboardNewWindow () {
  await browser.windows.create({ url: searchURL(paste()) })
}

export async function clipboardIncognitoWindow () {
  await browser.windows.create({ url: searchURL(paste()), incognito: true })
}
