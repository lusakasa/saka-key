import { msg } from 'mosi/client';



export function modeMsg (target, action, arg) {
  msg(target, 'modeAction', { action, arg });
};
