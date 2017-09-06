import React from 'react';
import {connect} from 'react-redux';
import Feedback from '../components/Feedback'
import { saveFeedback, getFeedback, setShowFeedbackStatus } from '../actions/groupActions';

class FeedbackContainer extends React.Component {
  render() {
    return (
      <Feedback {...this.props}/>
    )
  }
}

function mapStateToProps (state) {
  const { selectedGroupId, connections, profile, selectedUserIdInGroup, showFeedbackStatus } = state;
  return {
    selectedGroupId,
    loggedInUserId: profile._id,
    selectedUserIdInGroup,
    showFeedbackStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      saveFeedback: (connection) => {
        dispatch(saveFeedback(connection));
      },
      getFeedback: (giverProfileId, seekerProfileId, seekerGroupId) => {
        dispatch(getFeedback(giverProfileId, seekerProfileId, seekerGroupId));
      },
      setShowFeedbackStatus: (status) => {
        dispatch(setShowFeedbackStatus(status));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer)
