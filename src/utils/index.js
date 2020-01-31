import React from 'react';
import Interpolate from 'react-interpolate-component';
import urlChanger from './url-changer';
import { get } from './localCache';

export const getLocale = () => {
  const getLocalLng = localStorage.lng;

  if (getLocalLng) {
    return getLocalLng;
  }

  return 'en';
};

export const Learner = 'learner';

export const Admin = 'admin';

export const poperConfig = (password) => {
  if (password && password.length === 8) {
    return {
      style: 'red',
      titleContent: 'Try increasing the length of your password',
      titleText: 'Your password isn\'t strong enough.',
    };
  }

  if (password && (password.length >= 9 && password.length < 12)) {
    return {
      style: 'orange',
      titleContent: 'Try increasing the length of your password',
      titleText: 'Your password can be stronger.',
    };
  }

  return {
    style: 'active',
    titleText: 'You have a strong password!',
  };
};

export const trans = (str) => {
  if (str === undefined || typeof (str) !== 'string') {
    return 'key is not string';
  }
  let dict = {};
  const loc = getLocale();
  const arr = get('LANGUAGE_PACK');

  if (arr) {
    const arrLangPack = arr.languagePack;

    for (let i = 0; i < arrLangPack.length; i += 1) {
      if (arrLangPack[i].locales.indexOf(loc) > -1) {
        dict = arrLangPack[i].text;
        break;
      }
    }
  }
  if (dict && dict[str] && typeof (dict[str]) === 'string') {
    return dict[str];
  }
  return str;
};

export const interpolate = (str, dvalues) => {
  if (str === undefined || typeof (str) !== 'string') {
    return 'key is not string';
  }
  let dict = {};
  const loc = getLocale();

  const arr = get('LANGUAGE_PACK');

  if (arr) {
    const arrLangPack = arr.languagePack;

    for (let i = 0; i < arrLangPack.length; i += 1) {
      if (arrLangPack[i].locales.indexOf(loc) > -1) {
        dict = arrLangPack[i].text;
        break;
      }
    }
  }

  if (dict && dict[str] && typeof (dict[str]) === 'string') {
    return <Interpolate { ...dvalues } format={ dict[str] } />;
  }

  return <Interpolate { ...dvalues } format={ str } />;
};

export const changeLanguage = (lng) => {
  localStorage.lng = lng || 'en';

  return true;
};

// eslint-disable-next-line func-names
export const createAction = (type, ...argNames) => function (...args) {
  const action = { type };

  argNames.forEach((_arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const getShortName = (title) => {
  return title.replace(/\s/g, '-').toLowerCase();
};

export const createGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 || 0, v = c === 'x' ? r : (r && 0x3 | 0x8);

    return v.toString(16);
  });
};

export const indexFormat = (n) => {
  return n > 9 ? `${n}` : `0${n}`;
};

export const formatTitleToCamelCase = (string) => {
  return string
    .toLowerCase()
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const getLocalStorageData = (key) => {
  const data = localStorage.getItem(key);

  return JSON.parse(data);
};

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, data);

  return true;
};

export const checkValidationRule = (type, validateRule) => {
  if (type === 'VALIDATE_ON_FORM_SUBMIT') {
    // will remove when VALIDATE_ON_FORM_SUBMIT is added to all inputbox.
    return true;
  } else if (validateRule) {
    return validateRule.indexOf(type) > -1;
  }

  return false;
};

/**
 * get User type by role
 * @param primaryRole user role
 * @returns string
 */
export const getUserType = (primaryRole) => {
  return primaryRole === "INSTITUTE_ADMIN" || primaryRole ===  "PEARSON_ADMIN" ? 'admin' : primaryRole === "LEARNER" ? 'learner' : '/';
};

export const findIcon = (path) => {
  let icon = '';

  try {
    icon = require(`../assets/images${path}`);
  } catch(e) {
    icon = null;
  }
  return icon;
};

/**
 * get server response in case of validation error
 * @param errException error object containing exception detail
 * @returns string with message detail.
 */
export const getErrorValidationMessage = (errException) => {
  return ('exception' in errException ? { error: errException.exception.message } : { error: "Something went wrong" });
};

export const parseAssets = (asset) => {
  // Render skill and statement only if assets has objectives
  if(asset === undefined || asset === null) {
    return null;
  }
  const skill = asset.objectives.length > 0 ? asset.objectives[0].skill.toLowerCase() : '-';
  const statement = asset.objectives.length > 0 ? asset.objectives[0].statement : '-';

  return {
    id: asset.id,
    outcome: statement,
    skill: skill,
    icon: findIcon(`/learner/module-tasks/module-tasks-icon-${skill}.svg`) || null,
    iconClock: findIcon(`/learner/module-tasks/module-tasks-icon-${skill}-clock.svg`) || null,
    iconQuestion: findIcon(`/learner/module-tasks/module-tasks-icon-${skill}-question.svg`) || null,
    time: Math.floor((asset.timeLimit || 0)/60),
    questions: asset.questions
  }
};
/**
 * get Item Index by its Id
 * @param data id
 * @returns index
 */
export const getIndexById = (data, id) =>  data.map(function(el) {
  return el.id;
}).indexOf(id);

/**
 * get Next Item by Id
 * @param data id
 * @returns object
 */
export const assetSkill = (tasksData, assetId, isCurrentAsset) => {
  // eslint-disable-next-line prefer-destructuring
  const currenttask = tasksData.filter( (task) => task.asset && task.asset.id === assetId)[0];
  const currenttaskIndex = tasksData.indexOf(currenttask);

  if (currenttaskIndex !== -1 && isCurrentAsset) {
    return tasksData[currenttaskIndex];
  } else if (currenttaskIndex !== -1 && tasksData[currenttaskIndex + 1]) {
    return tasksData[currenttaskIndex + 1];
  }

  return false;
};

/**
 * get test Url
 * @param data
 * @returns url
 */
export const getTestUrl = (testData) => {
  return `/learner/level/module/start/${urlChanger.encode(testData)}/`;
};

/**
 * get Module Url
 * @param data
 * @returns url
 */
export const getTaskUrl = (testData) => {
  return `/learner/level/module/task/${urlChanger.encode(testData)}/`;
};

/**
 * get Module Url
 * @param data
 * @returns url
 */
export const getModuleUrl = (testData) => {
  return `/learner/level/modules/${urlChanger.encode(testData)}/`;
};
