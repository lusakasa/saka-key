import { msg, get, meta } from 'mosi/core'
import { generateHintStrings } from './hintStrings'
import { isModifierKey } from 'lib/keys'

let hintChars = 'adsfghjkl;'

export default {
  onOptionsChange: ({ hintChars: hc }) => {
    hintChars = hc.length >= 2 ? hc : 'bad'
  },
  messages: {
    gatherHints: async (hintType, src) => {
      // 1. Gather the number of link hints in each frame
      const hintsPerFrame = await get(
        `tab[${meta(src).tabId}]|id[${src}]`,
        'findHints',
        hintType
      )
      // 2. Generate Hint Strings
      const totalHints = hintsPerFrame.reduce((total, { v }) => total + v, 0)
      const hintStrings = generateHintStrings(hintChars, totalHints)
      // 3. Send each frame the strings for its hints
      let offset = 0
      hintsPerFrame.forEach(({ id, v }) => {
        const nextOffset = offset + v
        msg(id, 'renderHints', hintStrings.slice(offset, nextOffset))
        offset = nextOffset
      })
    },
    processKey: async (event, src) => {
      if (!isModifierKey(event)) {
        const currentTabTarget = `tab[${meta(src).tabId}]|id[${src}]`
        try {
          const results = await get(currentTabTarget, 'advanceHints', event.key)
          if (results.every(({ v }) => v === 'Filtered')) {
            msg(currentTabTarget, 'exitHintsMode')
          }
          // if a link is activated, no response will be received
          // and a transaction timeout exception will be raised
        } catch (e) {}
      }
    },
    openLinkInIncognitoWindow: url => {
      // TODO: consider more robust URL verification like Vimium's
      browser.windows.create({ url, incognito: true })
    },
    // Needed to activate links on firefox because it ignores keyboard modifiers
    // or doesn't execute default behaviors on click events
    ...(SAKA_PLATFORM === 'chrome'
      ? {}
      : {
          openLinkInBackgroundTab: url => {
            browser.tabs.create({ url, active: false })
          },
          openLinkInForegroundTab: url => {
            browser.tabs.create({ url, active: true })
          },
          openLinkInNewWindow: url => {
            browser.windows.create({ url })
          }
        })
  }
}
