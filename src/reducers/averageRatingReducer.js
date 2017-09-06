import * as types from '../constants/ActionTypes';

export default function averageRating(state = types.UNSET_AVERAGE_RATING, action) {
  switch(action.type) {
    case types.SET_AVERAGE_RATING:
      return action.type;

    case types.UNSET_AVERAGE_RATING:
        return action.type;

    default:
      return state;
  }
}