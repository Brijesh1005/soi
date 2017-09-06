import * as types from '../constants/ActionTypes';

export default function connections(state = [], action) {
  switch(action.type) {
    case types.GET_FEEDBACK:
    case types.GET_ALL_FEEDBACK:
      return Object.assign({}, state, action.connections );

    default:
      return state;
  }
}
