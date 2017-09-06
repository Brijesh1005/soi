import React from 'react';
import {connect} from 'react-redux'
import UserListInGroup from '../components/UserListInGroup'
import { setSelectedUserInGroup,setSelectedUserNameInGroup } from '../actions/SelectedUserActionsInGroup';
import { setShowFeedbackStatus } from '../actions/groupActions';

class UserListContainer extends React.Component {
  render() {
    return (
      <UserListInGroup {...this.props} navigator = {this.props.navigator}/>
    )
  }
}

function mapStateToProps(state) {
  const { selectedGroupId, groups, profile,selectedUserNameInGroup, selectedUserIdInGroup } = state;
  return {
    profile,
    groupMembers: groups[selectedGroupId].groupMembers,
    selectedUserNameInGroup,
    selectedUserIdInGroup
  }
}
function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      setSelectedUserInGroup: (uid) => {
        dispatch(setSelectedUserInGroup(uid))
      },
      setSelectedUserNameInGroup:(uname) =>{
        dispatch(setSelectedUserNameInGroup(uname))
      },
      setShowFeedbackStatus: (status) => {
        dispatch(setShowFeedbackStatus(status));
      }
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserListContainer)
