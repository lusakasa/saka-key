import { msg } from 'mosi/client'
import { configureActivate } from './activate'
import { findHints, setHintFindSettings } from './findHints'
import {
  showHints,
  hideHints,
  advanceHints,
  setHintRenderSettings
} from './HintRenderer'
import { showVideoControls, hideVideoControls } from './video'
import { isModifierKey, simplify } from 'lib/keys'

let hints
export let activator

export default {
  onExit: event => {
    hideHints()
    hideVideoControls()
  },
  onOptionsChange: options => {
    setHintRenderSettings(options)
    setHintFindSettings(options)
  },
  keydown: event => {
    event.stopImmediatePropagation()
    event.preventDefault()
    if (!isModifierKey(event)) {
      msg(1, 'processKey', simplify(event))
    }
    return 'Same'
  },
  keypress: event => {
    event.stopImmediatePropagation()
    return 'Same'
  },
  focus: () => 'TryText',
  mousedown: () => (SAKA_DEBUG ? 'Same' : 'Reset'),
  messages: {
    findHints: ({ filter, activate }) => {
      showVideoControls()
      configureActivate(activate)
      hints = findHints(filter)
      return {
        nextMode: 'Hints',
        value: hints.length
      }
    },
    renderHints: hintStrings => {
      showHints(hints, hintStrings)
      hints = undefined
    },
    exitHintsMode: (nextMode = 'Reset') => ({ nextMode }),
    advanceHints: event => {
      const status = advanceHints(event)
      return {
        nextMode: 'Same',
        value: status
      }
    }
  }
}
