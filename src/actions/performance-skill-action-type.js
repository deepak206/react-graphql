import { createAction } from '../utils';

export const PERFORMANCE_SKILL_REQUESTED = 'PERFORMANCE_SKILL_REQUESTED';
export const performanceSkillRequested = createAction(PERFORMANCE_SKILL_REQUESTED, 'payload');

export const PERFORMANCE_SKILL_SUCCESS = 'PERFORMANCE_SKILL_SUCCESS';
export const performanceSkillSuccess = createAction(PERFORMANCE_SKILL_SUCCESS, 'payload');

export const PERFORMANCE_SKILL_FAILURE = 'PERFORMANCE_SKILL_FAILURE';
export const performanceSkillFailure = createAction(PERFORMANCE_SKILL_FAILURE, 'payload');