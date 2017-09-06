import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import ShowCompetenciesContainer from '../containers/ShowCompetenciesContainer'
import ShowCompetencies from '../components/ShowCompetencies';
import * as types from '../constants/ActionTypes';

export default class CompetenciesScrollView extends React.Component {

  renderCompetencies() {
    if (this.props.showFeedbackStatus === types.VIEW_ONE) {
      return <ShowCompetencies data={this.props.userCompetencies} {...this.props} />;
    } else if(this.props.showFeedbackStatus === types.VIEW_ALL || this.props.averageRating === types.SET_AVERAGE_RATING) {
      return this.props.connections && Object.keys(this.props.connections).map((connectionId, i) => {
        var selectedUserInGroup = '';
        if(this.props.averageRating === types.SET_AVERAGE_RATING)
            selectedUserInGroup = `${this.props.connections[connectionId].connectionType}`;
        else
            selectedUserInGroup = `${this.props.selectedUserInGroup} ${this.props.connections[connectionId].connectionType}`;
      return <ShowCompetencies
        {...this.props}
        selectedUserInGroup={selectedUserInGroup}
        data={this.props.connections[connectionId].feedback}
        key={i} />;
      });
    }
  }

  render() {
    return (
     <View style={styles.cardStyle}>
       <ScrollView>
         {this.renderCompetencies()}
       </ScrollView>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  cardStyle:{
    flex: 1
  }
});
