import 'lib/browser_polyfill'
import { init } from 'mosi/core'
import {
  loadClient,
  initModes,
  setup,
  clientOptions
} from 'background_page/modes'
import Command from 'modes/command/background'
import Hints from 'modes/hints/background'

if (SAKA_DEBUG) {
  console.log('background page initialize begin')
}

// messaging endpoints, see Mosi (https://github.com/eejdoowad/mosi)
const actions = {
  loadClient,
  clientOptions
}

// initialize messaging system
init({
  log: SAKA_DEBUG,
  actions
})

initModes(
  {
    Command,
    Hints
  },
  actions
)

setup()

if (SAKA_DEBUG) {
  console.log(`background page initialized for version ${SAKA_VERSION}`)
}
