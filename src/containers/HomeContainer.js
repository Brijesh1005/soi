import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import Home from '../components/Home'
import { getAllFeedbackForLoggedInUser, setAverageRating, newGroupData } from '../actions/groupActions';
import { loadAllProfiles, loadProfileById } from '../actions/profileActions';

class HomeContainer extends React.Component {

  render() {
    return (<Home {...this.props} />);
  }
}

function mapStateToProps(state) {
  const { profile, connections, averageRating } = state;
  return { profile, connections, averageRating };
}

function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      loadUserInfo: (userName) => {
        dispatch(loadProfileByUserName(userName));
      },
      getAllFeedback: (giverProfileId) => {
        dispatch(getAllFeedbackForLoggedInUser(giverProfileId));
      },
      setAverageRating: (status) => {
        dispatch(setAverageRating(status));
      },
      createNewGroup: () => {
        dispatch(newGroupData({}));
      },
      loadAllProfiles: () => {
        dispatch(loadAllProfiles({}));
      },
      loadProfileById: (id) => {
        dispatch(loadProfileById(id));
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
