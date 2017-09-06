import * as types from '../constants/ActionTypes';

export default function createGroup(state = {}, action) {
  switch(action.type) {
    case types.CREATE_GROUP:
        return Object.assign({}, state, action.newGroupData);
    default:
      return state;
  }
}
