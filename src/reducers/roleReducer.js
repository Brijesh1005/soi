import * as types from '../constants/ActionTypes';

export default function roles(state = [], action) {
  switch(action.type) {
    case types.GET_ALL_ROLES:
      return Object.assign({}, state, action.roles );

    default:
      return state;
  }
}
