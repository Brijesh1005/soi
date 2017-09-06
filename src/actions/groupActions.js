import Toast from 'react-native-simple-toast';

import * as types from '../constants/ActionTypes';
import * as url from '../utils/getURL';
import * as apiLayer from '../utils/apiLayer';
import { parseMakeKeySameAsId } from '../utils/utils';

function getAllGroups (groups) {
  return { type: types.GET_ALL_GROUPS, groups}
}

function saveFeedbackForConnection (connection) {
  return { type: types.SAVE_FEEDBACK, connection}
}

function getFeedbackConnection(connections) {
  return { type: types.GET_FEEDBACK, connections}
}

function getAllFeedback(connections) {
  return { type: types.GET_ALL_FEEDBACK, connections}
}

  export function setShowFeedbackStatus (status) {
  return { type: status }
}

export function setAverageRating (status) {
  return { type: status }
}

export function newGroupData(groupData) {
  return { type: types.CREATE_GROUP, newGroupData: groupData}
}


export function saveNewGroup(groupData) {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getAllGroupsURL(),
      method: 'POST',
      data: groupData,
      successCallback: (response) => {
        Toast.show('Group created successfully.');
        dispatch(loadAllGroups());
      }
    });
  };
}

export function getFeedback(giverProfileId, seekerProfileId, seekerGroupId) {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getFeedbackURL(giverProfileId, seekerProfileId, seekerGroupId),
      method: 'GET',
      successCallback: (response) => {
        dispatch(getFeedbackConnection(parseMakeKeySameAsId(response)));
      }
    });
  };
}

export function getAllFeedbackForLoggedInUser(giverProfileId) {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getAllFeedbackURLForLoggedInUser(giverProfileId),
      method: 'GET',
      successCallback: (response) => {
        dispatch(getAllFeedback(parseMakeKeySameAsId(response)));
      }
    });
  };
}

export function saveFeedback(connection) {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.saveFeedbackURL(),
      method: 'POST',
      data: connection,
      successCallback: (response) => {
        dispatch(saveFeedbackForConnection(response));
      }
    });
  };
}

export function loadAllGroups() {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getAllGroupsURL(),
      method: 'GET',
      successCallback: (response) => {
        dispatch(getAllGroups(parseMakeKeySameAsId(response)));
      }
    });
  };
}
