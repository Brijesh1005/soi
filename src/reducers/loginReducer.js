import * as types from '../constants/ActionTypes';

export default function authDetails(state = {}, action) {
  switch(action.type) {
    case types.AUTHENTICATION:
      return action.authDetails;
    default:
      return state;
  }
}
