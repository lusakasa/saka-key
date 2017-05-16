# The theory of how external users could interface with saka key


They write their own extension using a provided template.

1. Their extension sends a request for permission to receive messages for any of a supplied array of commands.

Bob's Bookmark Extension sends:
{
  connection_setup_protocol_version: 1,
  theme: {
    color1: 'blue',
    color2: 'red'
  },
  data: [{
      command: 'showBookmarks',
      suggestedKeyBindings: [
        [{key: 'b'}, {key: 'c'}]
      ]
    }, 
    {
      command: 'openAllBookmarks',
      suggestedKeyBindings: [
        [{key: 'b'}, {key: 'd'}]
      ]
    }
  ]
}
  
to Saka Key.

2. Mosi sends a notification (and a ! appears on the browser actions) saying Bob's Bookmarks Extension wants permission to map those commands.

3. User navigates to menu where they:
  1. Give permission to send those commands to Bob's Bookmark Extension
  2. Choose to accept the default bindings (or not and make their own)

4. Any time a mapped external command key binding is pressed, Saka Key sends a message to external extension.

5. External extension does its own processing of event.

6. External extension sends new state back to saka key

Must think about:
* should any data be made available to external extensions?
* must think deeply about mosi connections and lifetimes
* must add external interface connections to mosi
* how to add or remove commands
* Consider supporting
  1. Simple mapped bindings with no response
  2. External extension can establish their own 'modes' and control transition back to saka key.


-------


external extensions can register:
1. custom commands
2. custom modes
*. possibly onEnter/onExit handlers