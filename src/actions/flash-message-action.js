import { createAction } from '../utils';

export const FLASH_MESSAGE_DISPLAY = 'FLASH_MESSAGE_DISPLAY';
export const flashMessageDisplay = createAction(FLASH_MESSAGE_DISPLAY, 'payload');

export const FLASH_MESSAGE_HIDE = 'FLASH_MESSAGE_HIDE';
export const flashMessageHide = createAction(FLASH_MESSAGE_HIDE, 'payload');