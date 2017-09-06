import * as types from '../constants/ActionTypes';

export default function showFeedbackStatus(state = types.VIEW_ONE, action) {
  switch(action.type) {
    case types.VIEW_ALL:
      return action.type;

    case types.VIEW_ONE:
        return action.type;

    default:
      return state;
  }
}
