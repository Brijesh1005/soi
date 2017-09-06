import { combineReducers } from 'redux'
import profile from './profileReducer'
import groups from './groupReducer'
import roles from './roleReducer'
import selectedGroupId from './selectedGroupReducer'
import selectedUserIdInGroup from './selectedUserIdInGroupReducer'
import showFeedbackStatus from './showFeedbackStatusReducer'
import selectedUserNameInGroup from './selectedUserNameInGroupReducer'
import connections from './connections'
import averageRating from './averageRatingReducer'
import createGroup from './createGroupReducer'
import authDetails from '../reducers/loginReducer'

const rootReducer = combineReducers({
  profile,
  groups,
  selectedGroupId,
  selectedUserIdInGroup,
  connections,
  selectedUserNameInGroup,
  showFeedbackStatus,
  averageRating,
  createGroup,
  roles,
  authDetails
})

export default rootReducer
