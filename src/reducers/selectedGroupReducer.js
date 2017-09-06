import * as types from '../constants/ActionTypes';

export default function selectedGroupId(state = {}, action) {
  switch(action.type) {
    case types.SET_SELECTED_GROUP:
      return action.gid;

    default:
      return state;
  }
}
