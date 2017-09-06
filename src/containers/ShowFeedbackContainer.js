import React from 'react';
import {connect} from 'react-redux';
import CompetenciesScrollView from '../components/CompetenciesScrollView'
import { saveFeedback, getFeedback } from '../actions/groupActions';
import * as types from '../constants/ActionTypes';

class ShowFeedbackContainer extends React.Component {
  render() {
    return (
      <CompetenciesScrollView {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  const { selectedGroupId, groups, profile, selectedUserIdInGroup, connections, averageRating } = state;
    var newConnectionObj = { };
    var groupsTest = { };
    Object.keys(connections).map((connectionId, i) => {
      var list = groupsTest[connections[connectionId].connectionType];
       if(list){
           list.push(connections[connectionId]);
       } else{
          groupsTest[connections[connectionId].connectionType] = [connections[connectionId]];
       }
    });

    Object.keys(groupsTest).forEach(function(key, l) {
        var groupList = groupsTest[key];
        var totalFeedback = groupList.length;
        var newGroupsTest = { };
        var connectionName = '';
        groupList.forEach((ratings, i) => {
          connectionName = ratings.connectionType;
          ratings.feedback.forEach((ratingRow) => {
            var avgList = newGroupsTest[ratingRow.competancies];
             if(avgList){
                 newGroupsTest[ratingRow.competancies] = (newGroupsTest[ratingRow.competancies] + ratingRow.rating)/totalFeedback;
             } else{
                newGroupsTest[ratingRow.competancies] = ratingRow.rating;
             }
          });
        });

        newConnectionObj[l] = {
            connectionType: connectionName,
            feedback: []
        };
       Object.keys(newGroupsTest).map((BI) => {
          var obj = {
            'competancies': BI,
            'rating': newGroupsTest[BI]
          }
          newConnectionObj[l].feedback.push(obj);
       });
    });

  return {
    loggedInUserId: profile._id,
    connections: newConnectionObj
  }
}
export default connect(mapStateToProps)(ShowFeedbackContainer)
