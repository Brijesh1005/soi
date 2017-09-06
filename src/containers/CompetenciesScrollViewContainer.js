import React from 'react';
import {connect} from 'react-redux';
import CompetenciesScrollView from '../components/CompetenciesScrollView'
import { saveFeedback, getFeedback } from '../actions/groupActions';
import * as types from '../constants/ActionTypes';

class CompetenciesScrollViewContainer extends React.Component {
  render() {
    return (
      <CompetenciesScrollView {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  const { selectedGroupId, groups, profile, selectedUserIdInGroup, connections, showFeedbackStatus } = state;
  const groupMembers=groups[selectedGroupId].groupMembers;
  let connectionSelectedUser = {};
  Object.keys(connections).forEach((cid)=>{
    const connection = connections[cid];
    if(connection.seekerProfile === selectedUserIdInGroup) {
        connectionSelectedUser[cid] = connection;
    }
  });

  for (let i=0; i<groupMembers.length; i++) {
    if (groupMembers[i].profile._id==selectedUserIdInGroup) {
      let cardTitle;
      if (showFeedbackStatus === types.VIEW_ONE) {
        cardTitle = ` Rate ${groupMembers[i].profile.userName} on`;
      } else {
        cardTitle = `${groupMembers[i].profile.userName} rating for`;
      }
      return {
        selectedUserIdInGroup,
        selectedUserInGroup: cardTitle,
        userCompetencies:groupMembers[i].role.roleCompetencies,
        loggedInUserId: profile._id,
        groupId: groups[selectedGroupId]._id,
        connections: connectionSelectedUser,
        showFeedbackStatus
      }
    }
  }
  return {
    userCompetencies:[],
    selectedUserIdInGroup:'',
    loggedInUserId: profile._id,
    groupId: ''
  }
}
export default connect(mapStateToProps)(CompetenciesScrollViewContainer)
