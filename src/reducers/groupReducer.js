import * as types from '../constants/ActionTypes';

export default function groups(state = [], action) {
  switch(action.type) {
    case types.GET_ALL_GROUPS:
      return Object.assign({}, state, action.groups );

    default:
      return state;
  }
}
