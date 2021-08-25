import { posMod } from 'lib/util'
import browser from 'webextension-polyfill'

/** Activate the tab to the right of the active tab of the current window */
export async function nextTab () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const activeTabIndex = tabs.findIndex(tab => tab.active)
  const nextTabId = tabs[posMod(activeTabIndex + 1, tabs.length)].id
  await browser.tabs.update(nextTabId, { active: true })
}

/** Activate the tab to the left of the active tab of the current window */
export async function previousTab () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const activeTabIndex = tabs.findIndex(tab => tab.active)
  const previousTabId = tabs[posMod(activeTabIndex - 1, tabs.length)].id
  await browser.tabs.update(previousTabId, { active: true })
}

/** Activate the first tab of the current window */
export async function firstTab () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const firstTabId = tabs[0].id
  await browser.tabs.update(firstTabId, { active: true })
}

/** Activate the last tab of the current window */
export async function lastTab () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const lastTabId = tabs[tabs.length - 1].id
  await browser.tabs.update(lastTabId, { active: true })
}

/** Move the active tab of the current window left */
export async function moveTabLeft () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.move(tab.id, { index: tab.index - 1 })
}

/** Move the active tab of the current window right */
export async function moveTabRight () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const activeTabIndex = tabs.findIndex(tab => tab.active)
  const nextTabIndex = posMod(activeTabIndex + 1, tabs.length)
  await browser.tabs.move(tabs[activeTabIndex].id, { index: nextTabIndex })
}

/** Move the active tab of the current window to the far left */
export async function moveTabFirst () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.move(tab.id, { index: 0 })
}

/** Move the active tab of the current window to the far right */
export async function moveTabLast () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.move(tab.id, { index: -1 })
}

/** Move the active tab of the current window to a new window */
export async function moveTabNewWindow () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.windows.create({ tabId: tab.id })
}

/** Close the active tab of the current window */
export async function closeTab () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.remove(tab.id)
}

/** Close all tabs of the current window except the active tab */
export async function closeOtherTabs () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  await Promise.all(
    tabs.map(async tab => {
      if (!tab.active) await browser.tabs.remove(tab.id)
    })
  )
}

/** Close all tabs to the right of the active tab of the current window */
export async function closeRightTabs () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const activeTabIndex = tabs.findIndex(tab => tab.active)
  await Promise.all(
    tabs.slice(activeTabIndex + 1).map(async tab => {
      await browser.tabs.remove(tab.id)
    })
  )
}

/** Close all tabs to the left of the active tab of the current window */
export async function closeLeftTabs () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  const activeTabIndex = tabs.findIndex(tab => tab.active)
  await Promise.all(
    tabs.slice(0, activeTabIndex).map(async tab => {
      await browser.tabs.remove(tab.id)
    })
  )
}

/** Create and activate a new tab */
export async function newTab () {
  await browser.tabs.create({})
}

/** Reopen and activate the last closed tab */
export async function restoreTab () {
  await browser.sessions.restore()
}

/** Duplicate and activate the active tab of the current window */
export async function duplicateTab () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.duplicate(tab.id)
}


/** Create a new window */
export async function newWindow () {
  await browser.windows.create()
}

/** Create a new incognito window */
export async function newIncognitoWindow () {
  await browser.windows.create({ incognito: true })
}

/** Activate the next window */
export async function switchWindow () {
  // TODO: Implement
  console.error('switchWindow not implemented')
}

const zoomStep = 10 // for 10%

/** Zoom in the active tab of the current window */
export async function zoomIn () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  const zoomFactor = await browser.tabs.getZoom()
  await browser.tabs.setZoom(tab.id, Math.min(zoomFactor + zoomStep / 100, 3.0))
}

/** Zoom out the active tab of the current window */
export async function zoomOut () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  const zoomFactor = await browser.tabs.getZoom()
  await browser.tabs.setZoom(tab.id, Math.max(zoomFactor - zoomStep / 100, 0.3))
}

/** Reset the zoom of the active tab of the current window */
export async function zoomReset () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.setZoom(tab.id, 0)
}

/** Refresh the active tab of the current window */
export async function refreshTab () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.reload(tab.id)
}

/** Refresh all tabs of the current window */
export async function refreshAllTabs () {
  const tabs = await browser.tabs.query({ currentWindow: true })
  await Promise.all(
    tabs.map(async tab => {
      await browser.tabs.reload(tab.id)
    })
  )
}

/** Hard refreshes the active tab of the current window */
export async function hardRefreshTab () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.reload(tab.id, { bypassCache: true })
}

/** Toggle the mute state of the active tab of the current window */
export async function toggleMuteTab () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.update(tab.id, { muted: !tab.mutedInfo.muted })
}

let muted = false

/** Mute all tabs of all windows */
export async function toggleMuteAllTabs () {
  muted = !muted
  const tabs = await browser.tabs.query({})
  await Promise.all(
    tabs.map(async tab => {
      await browser.tabs.update(tab.id, { muted })
    })
  )
}

/** Toggle the pin state of the active tab of the current window */
export async function togglePinTab () {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  await browser.tabs.update(tab.id, { pinned: !tab.pinned })
}
