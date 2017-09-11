import { msg } from 'mosi/client'
import { findHints, setHintFindSettings } from './findHints'
import {
  showHints,
  hideHints,
  advanceHints,
  setHintRenderSettings
} from './HintRenderer'
import { showVideoControls, hideVideoControls } from './video'

let hints
export let hintType

export default {
  onEnter: event => {
    // first frame to enter Hints mode is triggered by a keypress from command mode
    // all other frames must be notified of mode change via message
    if (event.type === 'keydown') {
      msg(1, 'gatherHints', event.hintType)
    }
  },
  onExit: event => {
    if (!event.type.startsWith('message')) {
      msg('thisTab&otherFrames', 'exitHintsMode')
    }
    hideHints()
    hideVideoControls()
  },
  onOptionsChange: options => {
    setHintRenderSettings(options)
    setHintFindSettings(options)
  },
  keydown: event => {
    event.stopImmediatePropagation()
    msg(1, 'processKey', {
      key: event.key,
      code: event.code,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    })
    return 'Same'
  },
  keypress: event => {
    event.stopImmediatePropagation()
    return 'Same'
  },
  focus: () => 'TryText',
  mousedown: () => (SAKA_DEBUG ? 'Same' : 'Reset'),
  messages: {
    findHints: ht => {
      showVideoControls()
      hintType = ht
      hints = findHints(ht)
      return {
        nextMode: 'Hints',
        value: hints.length
      }
    },
    renderHints: hintStrings => {
      showHints(hints, hintStrings)
      hints = undefined
    },
    exitHintsMode: () => ({ nextMode: 'Reset' }),
    advanceHints: key => {
      const nextMode = advanceHints(key)
      return {
        nextMode: nextMode === 'Filtered' ? 'Same' : nextMode,
        value: nextMode
      }
    }
  }
}
