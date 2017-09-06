import * as types from '../constants/ActionTypes';

export default function selectedUserIdInGroup(state = {}, action) {
  switch(action.type) {
    case types.SET_SELECTED_USER_IN_GROUP:
      return action.uid;
    default:
      return state;
  }
}
