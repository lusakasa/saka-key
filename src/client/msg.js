import { msg, get } from 'mosi/client';

export const modeMsg = (dst, mode, action, arg) => msg(dst, 'modeMessage', {
  mode,
  action,
  arg
});

export const modeGet = (dst, mode, action, arg) => get(dst, 'modeMessage', {
  mode,
  action,
  arg
});
