import { init, msg } from 'mosi/client'
import {
  initModes,
  addEventListeners,
  removeEventListeners,
  changeMode,
  clientOptions
} from './modes'
import Disabled from 'modes/disabled/client'
import Command from 'modes/command/client'
import Pass from 'modes/pass/client'
import Text from 'modes/text/client'
import Hints from 'modes/hints/client'

/**
 * Initializes a Saka key client, making keyboard shortcuts available.
 * Specify the type of client:
 * * 'cs' - for content scripts
 * * 'popup' - for the popup
 * * 'options' - for options
 * @param {string} type - the type of client
 */
export function initialize(type, otherActions = {}) {
  if (SAKA_DEBUG) {
    console.log(`${type} client loaded for version ${SAKA_VERSION}`)
  }

  const actions = {
    ...otherActions,
    changeMode,
    clientOptions
  }

  addEventListeners(type)

  // Initialize the messaging system
  init({
    log: SAKA_DEBUG,
    subscriptions: ['client', type],
    actions,
    onClientDisconnect: removeEventListeners
  })

  msg(1, 'clientOptions')

  initModes(
    'Disabled',
    {
      Disabled,
      Command,
      Pass,
      Text,
      Hints
    },
    actions
  )
}
