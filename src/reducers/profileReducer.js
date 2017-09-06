import * as types from '../constants/ActionTypes';

export default function profile(state = {}, action) {
  switch(action.type) {
    case types.GET_PROFILE:
      return Object.assign({}, state, action.profileInfo);

    case types.LOAD_PROFILES:
      return Object.assign ([], state, action.allProfiles);

    case types.GET_USER_PROFILE:
      return Object.assign ([], state, action.userInfo);

    default:
      return state;
  }
}
