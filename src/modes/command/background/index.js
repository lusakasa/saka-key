import * as tabCommands from './commands/tab'
import * as clipboardCommands from './commands/clipboard'

export default {
  messages: {
    ...tabCommands,
    ...clipboardCommands
  }
}
