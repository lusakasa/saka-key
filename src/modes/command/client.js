import { Mode } from 'modes/mode/client';
import { commandTrie } from './commandTrie';
import { isTextEditable } from 'lib/dom';
import {
  scrollDown,
  scrollUp,
  scrollLeft,
  scrollRight,
  scrollPageDown,
  scrollPageUp,
  scrollHalfPageDown,
  scrollHalfPageUp,
  scrollToBottom,
  scrollToTop,
  scrollToLeft,
  scrollToRight
} from 'saka-commands/scroll-actions';

class Command extends Mode {
  onEnter = async (event) => {
    commandTrie.reset();
  }
  onExit = async (event) => {
    commandTrie.reset();
  }
  keydown = async (event) => {
    event.stopImmediatePropagation();
    return this.name;
  }
  keypress = async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const command = commandTrie.advance(event);
    if (command) {
      const nextMode = this.commands[command]();
      if (nextMode) {
        return nextMode;
      }
    }
    return this.name;
  }
  keyup = async (event) => {
    event.stopImmediatePropagation();
    return this.name;
  }
  focusin = async (event) => {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return this.name;
  }
  focusout = async (event) => {
    return this.name;
  }
  click = async (event) => {
    return this.name;
  }
  mousedown = async (event) => {
    return this.name;
  }
  scroll = async (event) => {
    return this.name;
  }
  actions = {}
  BP = (command, args) => () => { this.sendMsg(command, args); };
  commands = {
    toggleHelpMenu: this.BP('toggleHelpMenu'),
    scrollDown,
    scrollUp,
    scrollLeft,
    scrollRight,
    scrollPageDown,
    scrollPageUp,
    scrollHalfPageDown,
    scrollHalfPageUp,
    scrollToBottom,
    scrollToTop,
    scrollToLeft,
    scrollToRight,
    previousTab: this.BP('previousTab'),
    nextTab: this.BP('nextTab'),
    firstTab: this.BP('firstTab'),
    lastTab: this.BP('lastTab'),
    moveTabLeft: this.BP('moveTabLeft'),
    moveTabRight: this.BP('moveTabRight'),
    moveTabFirst: this.BP('moveTabFirst'),
    moveTabLast: this.BP('moveTabLast'),
    closeTab: this.BP('closeTab'),
    closeOtherTabs: this.BP('closeOtherTabs'),
    closeRightTabs: this.BP('closeRightTabs'),
    closeLeftTabs: this.BP('closeLeftTabs'),
    newTab: this.BP('newTab'),
    restoreTab: this.BP('restoreTab'),
    duplicateTab: this.BP('duplicateTab'),
    newWindow: this.BP('newWindow'),
    switchWindow: this.BP('switchWindow'),
    zoomIn: this.BP('zoomIn'),
    zoomOut: this.BP('zoomOut'),
    zoomReset: this.BP('zoomReset'),
    refreshTab: this.BP('refreshTab'),
    refreshAllTabs: this.BP('refreshAllTabs'),
    toggleMuteTab: this.BP('toggleMuteTab'),
    toggleMuteAllTabs: this.BP('toggleMuteAllTabs'),
    togglePinTab: this.BP('togglePinTab')
  }
};

export const COMMAND = new Command('COMMAND');
