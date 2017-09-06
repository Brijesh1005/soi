import React from 'react';
import {
  View, StyleSheet
} from 'react-native';
import {
  Grid, Col, Row, FormInput, Button
}
from 'react-native-elements';
import Toast from 'react-native-simple-toast';

import ShowCompetenciesContainer from '../containers/ShowCompetenciesContainer'
import UserListContainer from '../containers/UserListContainer'
import CompetenciesScrollViewContainer from '../containers/CompetenciesScrollViewContainer'
import * as types from '../constants/ActionTypes';

export default class Feedback extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.onChange = this.onChange.bind(this);
    this.competenciesRatingDetails = this.competenciesRatingDetails.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
    this.showFeedbackHistory = this.showFeedbackHistory.bind(this);
  }
  componentWillReceiveProps() {
    this.setState({
      value: ''
    });
  }
  submitFeedback() {
    this.connection && this.props._actions.saveFeedback(this.connection);
    Toast.show('Feedback Saved!');
    this.setState({
      value: ''
    });
  }

  onChange(value) {
    this.setState({value});
  }

  competenciesRatingDetails(connection) {
    this.connection = {...connection, connectionType: this.state.value};
  }

  showFeedbackHistory() {
    if (this.props.showFeedbackStatus === types.VIEW_ONE) {
      this.props._actions.setShowFeedbackStatus(types.VIEW_ALL);
      this.props._actions.getFeedback(this.props.loggedInUserId, this.props.selectedUserIdInGroup, this.props.selectedGroupId);
    } else {
      this.props._actions.setShowFeedbackStatus(types.VIEW_ONE);
    }

  }

  render() {
    let ratingsTitle, eventInputElement, submitButton;
    if (this.props.showFeedbackStatus === types.VIEW_ONE) {
      ratingsTitle = 'View all';
      eventInputElement = (
        <Row size={2}>
          <FormInput ref='incident' textInputRef='abc'
            placeholder='Enter the event details'
            containerStyle={styles.eventInput}
            underlineColorAndroid='#397af8'
            value={this.state.value}
            onChangeText={this.onChange}/>
        </Row>);
      submitButton = (
        <Button title='SUBMIT RATING'
          buttonStyle={styles.submitFeedbackStyles}
          backgroundColor='#397af8' borderRadius={2}
          underlayColor='gray' raised
          onPress={this.submitFeedback}/>);

    } else {
      ratingsTitle = 'New Rating';
    }

    return (
      <Grid>
        { eventInputElement }
        <Row size={15}>
	         <CompetenciesScrollViewContainer {...this.props} eventValue={this.state.value} competenciesRatingDetails={this.competenciesRatingDetails} />
        </Row>
        <Row size={2}>
          <Col size={7}></Col>
          <Col size={4}>
            <Button title={ratingsTitle} color='#397af8'
              buttonStyle={styles.ViewAllStyles}
              backgroundColor='transparent' fontSize={13}
              underlayColor='#fff'
              onPress={this.showFeedbackHistory}/>
          </Col>
        </Row>
        { submitButton }
        <Row size={4}>
          <UserListContainer navigator = {this.props.navigator} getFeedback={this.props._actions.getFeedback} {...this.props}/>
        </Row>
      </Grid>
    )
  }
}

const styles = StyleSheet.create({
  eventInput:{
    flex: 1
  },
  ViewAllStyles: {
    marginBottom: 8,
    flex: 1,
    justifyContent: 'flex-end'
  },
  submitFeedbackStyles: {
    height: 40,
    marginBottom: 10
  }
})
