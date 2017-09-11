import { msg } from 'mosi/client'
export const background = (action, arg) => () => msg(1, action, arg)
