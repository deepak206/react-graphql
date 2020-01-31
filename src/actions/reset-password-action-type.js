import { createAction } from '../utils';

export const RESET__PASSWORD__REQUESTED= 'RESET__PASSWORD__REQUESTED';
export const resetPasswordRequested= createAction(RESET__PASSWORD__REQUESTED,'payload');