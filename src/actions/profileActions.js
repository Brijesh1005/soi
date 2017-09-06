import * as types from '../constants/ActionTypes';
import * as url from '../utils/getURL';
import * as apiLayer from '../utils/apiLayer';

export function loadProfiles(allProfilesInformation) {
  return {type: types.LOAD_PROFILES, allProfiles: allProfilesInformation};
}

export function getProfileById(profileInfo) {
  return {type: types.GET_PROFILE, profileInfo: profileInfo};
}

export function getProfileByUserName(userInfo) {
  return {type: types.GET_USER_PROFILE, userInfo: userInfo};
}

export function loadProfileById(userId) {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getProfileById(userId),
      method: 'GET',
      successCallback: (response) => {
        dispatch(getProfileById(response));
      }
    });
  };
}

export function loadAllProfiles() {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getAllProfileURL(),
      method: 'GET',
      successCallback: (response) => {
        dispatch(loadProfiles(response));
      }
    });
  };
}
