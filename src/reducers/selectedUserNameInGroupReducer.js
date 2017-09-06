import * as types from '../constants/ActionTypes';

export default function selectedUserNameInGroup(state = {}, action) {
  switch(action.type) {
    case types.SET_SELECTED_USER_NAME_GROUP:
      return action.uname;

    default:
      return state;
  }
}
