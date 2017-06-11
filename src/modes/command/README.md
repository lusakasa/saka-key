# Command Mode

Command mode is the default mode for entering keyboard commands. It listens for keydown events, checks to see if a key sequence corresponding to a command has been entered, then executes the command.

There are commands for scrolling, managing tabs, switching modes and more.

Command mode relies on a trie data structure in which internal nodes correspond to keys and leaf nodes correspond to commands. Key presses advance through the trie until a command is found.