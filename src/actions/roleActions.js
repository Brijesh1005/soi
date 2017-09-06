import Toast from 'react-native-simple-toast';

import * as types from '../constants/ActionTypes';
import * as url from '../utils/getURL';
import * as apiLayer from '../utils/apiLayer';
import { parseMakeKeySameAsId } from '../utils/utils';

function getAllRoles (roles) {
  return { type: types.GET_ALL_ROLES, roles}
}

export function saveNewRole(roleData) {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getAllRolesURL(),
      method: 'POST',
      data: roleData,
      successCallback: (response) => {
        Toast.show('Role added successfully.');
        dispatch(loadAllRoles());
      }
    });
  };
}

export function loadAllRoles() {
  return function(dispatch, getState) {
    apiLayer.thunkCallback({
      url: url.getAllRolesURL(),
      method: 'GET',
      successCallback: (response) => {
        dispatch(getAllRoles(parseMakeKeySameAsId(response)));
      }
    });
  };
}
