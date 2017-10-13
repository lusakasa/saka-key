# Args Mode

This mode is in the concept phase

Some commands you think of might require arguments. An example is saving the current url to Pocket with custom tags. Creating a command that saves the link to Pocket is easy enough, but how do you specify tags? That's where Args mode comes in. 

Upon entering, args mode checks the keydown event for the `activate` property. The previous mode (Command or Hints) will have set the `activate` property to a callback that takes one parameter: `args`.

Args mode presents the user with a text input. The user types text in then hits enter. The `activate` callback is passed the text content of the input and executed. The return value of the callback determines the next mode.

It may be useful to limit what can be entered in args mode by passing either a list of valid options or a regex defining valid options. Will have to see.
