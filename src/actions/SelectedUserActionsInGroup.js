import * as types from '../constants/ActionTypes';

export function setSelectedUserInGroup (uid) {
  return { type: types.SET_SELECTED_USER_IN_GROUP, uid}
}

export function setSelectedUserNameInGroup (uname) {
  return { type: types.SET_SELECTED_USER_NAME_GROUP, uname}
}
