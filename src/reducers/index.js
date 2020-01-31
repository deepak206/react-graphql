import { combineReducers } from 'redux';
import languageState from './language-state';
import authState from './auth-state';
import performanceTestState from './performance-test-state';
import performanceOverallState from './performance-overall-state';
import performanceSkillState from './performance-skill-state';
import addInstitutesState from './add-institutes-state';
import EditLearnerState from './edit-learner-state';
import addLearnerState from './add-learner-state';
import ResetPasswordState from './reset-password-state';
import flashMessageState from './flash-message-action';
import breadcrumbsState from './breadcrumbs-state';
import DeleteLearnerState from './delete-learner-state';
import LearnerModuleState from './learner-module-state';
import AdminDashboardState from './admin-dashboard-state';
import leftNavigationState from './left-navigation-state'

const reducers = combineReducers({
  authState,
  addInstitutesState,
  languageState,
  performanceTestState,
  performanceOverallState,
  performanceSkillState,
  flashMessageState,
  addLearnerState,
  breadcrumbsState,
  ResetPasswordState,
  EditLearnerState,
  DeleteLearnerState,
  LearnerModuleState,
  AdminDashboardState,
  leftNavigationState
});

export default reducers;
