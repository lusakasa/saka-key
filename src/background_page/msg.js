import { msg } from 'mosi/core';

export function modeMsg (target, action, arg) {
  msg(target, 'modeAction', { action, arg });
};
