import * as types from '../constants/ActionTypes';

export function setSelectedGroup (gid) {
  return { type: types.SET_SELECTED_GROUP, gid}
}
