// Access control according to user
import AccessControlRoutes from './access-control-routes';

// Config
import { Admin, Learner } from '../utils';

// Layouts
import Layout from '../views/layout';

// Common components
import Login from '../pages/login';
import CreateAccount from '../pages/create-account';
import ResetPassword from '../pages/reset-password';
import ResetPasswordSendLink from '../pages/reset-password-send-link';
import ResetPasswordSendLinkSuccess from '../pages/reset-password-send-link/send-link-success';
import ResetPasswordErrorOrSuccess from '../pages/reset-password/success-or-error';
import ScoreCardWelcome from '../pages/score-card-welcome';
import NotFound from '../views/not-found';

// Admin components
import AdminDashboard from '../pages/dashboard/admin-dashboard';
import ManageInstitutes from '../pages/institute';
// import ThemeCourse from '../pages/theme-course';
// import ManageCourses from '../pages/manage-courses';
// import Reports from '../pages/reports';
// import ECommerce from '../pages/e-commerce';
// import EditLicense from '../pages/edit-license';
// import EditInstructor from '../pages/edit-instructor';
import AddLearner from '../pages/add-learner';
import ManageAccountLayout from '../pages/manage-account-layout';
import LearnerManagement from '../pages/learner-management';
import EditLearner from '../pages/edit-learner';
import AddInstitute from '../pages/add-institute';
// import SelectedCourse from '../pages/selected-course';
// import AssignAdmin from '../pages/assign-admin';
// import CreateLicense from '../pages/create-license';
// import AddInstructor from '../pages/add-instructor';
// import StepperLayout from '../pages/stepper-layout';
// import EditInstitute from '../pages/edit-institute';
// import AddCourse from '../pages/add-course';

// Learner components
import LearnerDashboard from '../pages/dashboard/learner-dashboard';
import LearnerModuleLayout from '../pages/learner-module-layout';
import Score from '../pages/score';
import Welcome from '../pages/welcome';
import LearningModules from '../pages/learning-modules';
import Test from '../pages/test';
import TaskStoryboards from '../pages/task-storyboards';
import DataLoader from '../pages/data-loader/data-loader';
// import MyPerformance from '../pages/my-performance';
// import Remediation from '../pages/remediation'
// import Instructions from '../pages/instructions';
// import Report from '../pages/report';
// import MyPerformanceOverall from '../pages/my-performance-overall';
// import MyPerformanceSkill from '../pages/my-performance-skill';
// import MyPerformanceTest from '../pages/my-performance-test';

const Routes = [
  {
    component: Login,
    exact: true,
    path: '/',
    title: 'Login',
  },
  {
    component: CreateAccount,
    exact: true,
    path: '/create-account',
    title: 'Create Account',
  },
  {
    component: ResetPassword,
    exact: true,
    path: '/resetpassword',
    title: 'Reset Password',
  },
  {
    component: ResetPasswordSendLink,
    exact: true,
    path: '/resetpasswordsendlink',
    title: 'Reset Password Send',
  },
  {
    component: ResetPasswordSendLinkSuccess,
    exact: true,
    path: '/resetpasswordsendlinksuccess',
    title: 'Reset Password Send Success',
  },
  {
    component: ResetPasswordErrorOrSuccess,
    exact: true,
    path: '/resetpasswordchangesuccess',
    title: 'Reset Password Send Error',
  },
  {
    component: Score,
    exact: true,
    path: '/score',
    title: 'Score',
  },
  {
    component: Welcome,
    exact: true,
    path: '/welcome',
    title: 'Welcome',
  },
  {
    component: ScoreCardWelcome,
    exact: true,
    path: '/score-card-welcome',
    title: 'Welcome',
  },
  {
    component: AccessControlRoutes,
    exact: false,
    path: '/',
    routes: {
      [Admin]: {
        initalComponent: Layout,
        routes: [
          {
            component: AdminDashboard,
            exact: true,
            path: '/dashboard',
            title: 'Dashboard',
          },
          {
            component: ManageInstitutes,
            exact: true,
            path: '/manage-institutes',
            title: 'Manage Institutes',
          },
          // {
          //   component: ThemeCourse,
          //   exact: true,
          //   path: '/manage-accounts/:institueId/theme-course/:themeId',
          //   title: 'Manage Institutes',
          // },
          {
            component: AddInstitute,
            exact: true,
            path: '/manage-institutes/AddInstitute',
            title: 'Add Institutes',
          },
          {
            component: AddInstitute,
            exact: true,
            path: '/manage-institutes/institute/edit/:params',
            title: 'Edit Institute',
          },
          // {
          //   component: EditInstructor,
          //   exact: true,
          //   path: '/manage-institutes/:institueId/edit-instructor/:instructorId',
          //   title: 'Edit Instructor',
          // },
          // {
          //   component: EditLicense,
          //   exact: true,
          //   path: '/manage-accounts/:institueId/edit-license/:licenseId',
          //   title: 'Edit License',
          // },
          {
            component: ManageAccountLayout,
            exact: false,
            path: '/manage-institutes/',
            subRoutes: [
              {
                component: AddLearner,
                exact: true,
                isBreadcrumbVisible: true,
                path: '/institute/manage-learner/new/:params',
                title: 'Add Learners'
              },
              {
                component: LearnerManagement,
                exact: true,
                isBreadcrumbVisible: true,
                path: '/institute/manage-learner/list/:params',
                title: 'Add Learners'
              },
              {
                component: EditLearner,
                exact: true,
                isBreadcrumbVisible: true,
                path: '/institute/manage-learner/edit/:params',
                title: 'Edit Learner'
              },
              {
                component: NotFound,
                exact: false,
                path: '/*',
                title: 'NotFound',
              },
            ],
            title: 'Manage Accounts',
            urlPrefix: '/admin/manage-institutes',
          },
          // {
          //   component: StepperLayout,
          //   exact: false,
          //   path: '/manage-accounts/',
          //   subRoutes: [
          //     {
          //       component: AssignAdmin,
          //       exact: true,
          //       isStepperVisible: true,
          //       path: ':institueId/assign-admin',
          //       title: 'Assign Admin',
          //     },
          //     {
          //       component: AddCourse,
          //       exact: true,
          //       isStepperVisible: true,
          //       path: ':institueId/course-management',
          //       title: 'Course Management',
          //     },
          //     {
          //       component: SelectedCourse,
          //       exact: true,
          //       isStepperVisible: true,
          //       path: ':institueId/selected-course',
          //       title: 'Selected Course',
          //     },
          //     {
          //       component: CreateLicense,
          //       exact: true,
          //       isStepperVisible: true,
          //       path: ':institueId/create-license',
          //       title: 'Create License',
          //     },
          //     {
          //       component: AddInstructor,
          //       exact: true,
          //       isStepperVisible: true,
          //       path: ':institueId/add-instructors',
          //       title: 'Add Instructors',
          //     },
          //     {
          //       component: AddLearner,
          //       exact: true,
          //       isStepperVisible: true,
          //       path: ':institueId/add-learners',
          //       title: 'Add Learners'
          //     },
          //   ],
          //   title: 'Manage Institute',
          //   urlPrefix: '/admin/manage-accounts/',
          // },
          // {
          //   component: ManageCourses,
          //   exact: true,
          //   path: '/manage-courses',
          //   title: 'Manage Courses',
          // },
          // {
          //   component: Reports,
          //   exact: true,
          //   path: '/reports',
          //   title: 'Reports',
          // },
          // {
          //   component: ECommerce,
          //   exact: true,
          //   path: '/e-commerce',
          //   title: 'ECommerce',
          // },
          {
            component: NotFound,
            exact: false,
            path: '/*',
            title: 'NotFound',
          },
        ],
        urlPrefix: '/admin',
      },
      [Learner]: {
        initalComponent: Layout,
        routes: [
          // This is the Learner Dashboard
          {
            component: LearnerDashboard,
            exact: true,
            path: '/dashboard',
            title: 'Dashboard',
          },
          {
            component: LearnerModuleLayout,
            exact: false,
            path: '/level/',
            subRoutes: [
              {
                // This is used to pre-fetch course and level info before showing the modules
                component: DataLoader,
                exact: true,
                path: '/',
                title: 'Learning Modules'
              },
              {
                component: LearningModules,
                exact: true,
                path: '/modules/:params',
                title: 'Add Learners'
              },
              {
                component: TaskStoryboards,
                exact: true,
                path: '/module/task/:params',
                title: 'Task Storyboard',
              },
              {
                component: Test,
                exact: true,
                path: '/module/start/:params',
                title: 'Test',
              },
              {
                component: NotFound,
                exact: false,
                path: '/*',
                title: 'NotFound',
              },
            ],
            title: 'Manage Accounts',
            urlPrefix: '/learner/level',
          },
          // {
          //   component: Instructions,
          //   exact: true,
          //   path: '/modules/:courseId/level-:levelId/module-:moduleId/:assetId/instructions',
          //   title: 'Instructions',
          // },
          // {
          //   component: Report,
          //   exact: true,
          //   path: '/modules/:courseId/level-:levelId/module-:moduleId/:assetId/score',
          //   title: 'Report',
          // },
          // {
          //   component: MyPerformance,
          //   exact: false,
          //   path: '/my-performance/level-:levelId',
          //   subRoutes: [
          //     {
          //       component: MyPerformanceOverall,
          //       exact: true,
          //       path: '/level-:levelId/overall',
          //       title: 'Overall',
          //     },
          //     {
          //       component: MyPerformanceSkill,
          //       exact: true,
          //       path: '/level-:levelId/skill/:skill',
          //       title: 'Skill',
          //     },
          //     {
          //       component: MyPerformanceTest,
          //       exact: true,
          //       path: '/level-:levelId/test',
          //       title: 'Test',
          //     },
          //     {
          //       component: NotFound,
          //       exact: false,
          //       path: '/*',
          //       title: 'NotFound',
          //     },
          //   ],
          //   title: 'My Performance',
          //   urlPrefix: '/learner/my-performance',
          // },
          // {
          //   component: Remediation,
          //   exact: true,
          //   path: '/modules/level-:levelId/remediation',
          //   title: 'Remediation',
          // },
          {
            component: NotFound,
            exact: false,
            path: '/*',
            title: 'NotFound',
          },
        ],
        urlPrefix: '/learner',
      },
    },
  },
];

export default Routes;
