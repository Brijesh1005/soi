import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ListView
} from 'react-native';
import {
  Tabs, Tab, Icon, Grid, Col, Row, FormInput, Button
}
from 'react-native-elements';

import { loadProfileById } from '../actions/profileActions'
import * as types from '../constants/ActionTypes';
import GiveFeedback from './GiveFeedback';
import ShowFeedback from './ShowFeedback';
import ShowFeedbackContainer from '../containers/ShowFeedbackContainer'

const {height, width} = Dimensions.get('window');
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'GiveFeedback',
    }
    // Load profile for logged in user.
    props._actions.loadProfileById(props.profileId);
    this.showAllFeedbackClick = this.showAllFeedbackClick.bind(this);
    this.showFeedbackGivingPage = this.showFeedbackGivingPage.bind(this);
    this.showSettings = this.showSettings.bind(this);
  }

  showAllFeedbackClick() {
    this.changeTab('ShowFeedback');
    this.props._actions.setAverageRating(types.SET_AVERAGE_RATING);
    this.props._actions.getAllFeedback(this.props.profile._id);
  }

  showFeedbackGivingPage() {
    this.changeTab('GiveFeedback');
    this.props._actions.setAverageRating(types.UNSET_AVERAGE_RATING);
  }

  showSettings() {
    this.changeTab('ShowSettings');
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <Grid>
        <Row>
          <Tabs
            sceneStyle={ styles.sceneTabSeekFeedbackStyle } tabBarStyle={ styles.tabBar }>
            <Tab
              titleStyle={{fontWeight: 'bold', fontSize: 10}}
              selected={selectedTab === 'GiveFeedback'}
              title={'Give Feedback'}
              renderIcon={() => <Icon containerStyle={styles.iconContainerStyles} color={'#5e6977'} name='edit' size={25} />}
              renderSelectedIcon={() => <Icon color={'#6296f9'} name='edit' size={25} />}
              onPress={ this.showFeedbackGivingPage }>
                <GiveFeedback {...this.props} ></GiveFeedback>
            </Tab>
            <Tab
              titleStyle={ styles.seekFeedbackTabTitle }
              selected={selectedTab === 'ShowFeedback'}
              title={'Show Feedback'}
              renderIcon={() => <Icon containerStyle={styles.iconContainerStyles} color={'#5e6977'} name='feedback' size={25} />}
              renderSelectedIcon={() => <Icon color={'#6296f9'} name='feedback' size={25} />}
              onPress={ this.showAllFeedbackClick }>
                <ShowFeedbackContainer {...this.props}></ShowFeedbackContainer>
            </Tab>
            <Tab
              titleStyle={ styles.seekFeedbackTabTitle }
              selected={selectedTab === 'ShowSettings'}
              title={'Settings'}
              renderIcon={() => <Icon containerStyle={styles.iconContainerStyles} color={'#5e6977'} name='settings' size={25} />}
              renderSelectedIcon={() => <Icon color={'#6296f9'} name='settings' size={25} />}
              onPress={ this.showSettings }>
                <Text> Coming Soon!!!</Text>
            </Tab>
          </Tabs>
        </Row>
      </Grid>
    )
  }
}

const styles = StyleSheet.create({
  profileStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  seekFeedbackTabTitle: {
    fontWeight: 'bold',
    fontSize: 10
  },
  sceneTabSeekFeedbackStyle: {
    paddingTop: 0,
    backgroundColor: 'white',
    margin: 0
  },
  Tab1Content: {
    height: 100,
    color: 'black'
  },
  tabBar: {
    marginTop: 5,
    paddingTop: 5
  },
  iconContainerStyles: {
    margin: 0
  }
});
