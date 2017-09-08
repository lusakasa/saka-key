# Adding Commands

## Intro

Commands in Saka Key are functions that take exactly one argument - the keydown event that triggered the command. For most commands, this argument can be ignored. For example, the command that goes back in history is:

```javascript
function goBack () {
  window.history.go(-1);
}
```

Commands can optionally return the next mode. For example, the command that switches to Hints mode, to open a link in a new window is:

```javascript
function openLinkInNewWindow (event) {
  event.hintType = 'newWindow';
  return 'Hints';
};
```

Attaching hintType to the event is useful because the event is passed to the next mode's (in this case Hints') `onEnter` function.

## Background Page Commands

Commands can message the background page if they require access to privileged APIs or persistent data. Saka Key provides a function `background` explicitly for this purpose. `background` takes two arguments:

1. The name of the function to execute in the background page
2. The argument that should be passed to this function, if any

```javascript
function closeTab () {
  background('closeTab');
}
```

The function that is called on the background page takes two arguments:

1. The argument passed as the second parameter to `background`
2. The id of the message sender (see [Mosi](https://github.com/eejdoowad/mosi))

```javascript
async function closeTab () {
  const [tab] =  await browser.tabs.query({ currentWindow: true, active: true });
  await browser.tabs.remove(tab.id);
}
```

## Useful Directories

* [**Command Mode**: /src/modes/command/](https://github.com/lusakasa/saka-key/tree/master/src/modes/command)
* [**Client Commands**: /src/modes/command/client/commands](https://github.com/lusakasa/saka-key/tree/master/src/modes/command/client/commands)
* [**Background Commands**: /src/modes/command/background/](https://github.com/lusakasa/saka-key/tree/master/src/modes/command/background)
* [**Command Bindings**: /src/options/Keybindings](https://github.com/lusakasa/saka-key/blob/master/src/options/Keybindings)

## Step-by-step

1. Add a client command
2. If needed, add a corresponding background command
3. Add a new keybinding option for your command [here](https://github.com/lusakasa/saka-key/blob/master/src/options/Keybindings/config.json)
Add default bindings for your command to the built-in profiles [here](https://github.com/lusakasa/saka-key/blob/master/src/options/Keybindings/default.json)

## Example

Commit [a640f33a8dfc0a53b3524790c18cccf39bae0bcd](https://github.com/lusakasa/saka-key/commit/a640f33a8dfc0a53b3524790c18cccf39bae0bcd) shows how the "Hard Refresh Tab" command was added.