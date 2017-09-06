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
import ShowFeedbackContainer from '../containers/ShowFeedbackContainer'

const {height, width} = Dimensions.get('window');
export default class Home extends React.Component {
  render() {
  const profileInfo = this.props.profile;
    return (
      <ShowFeedbackContainer {...this.props} />
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
  },
  txt: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 2,
    color: '#222222'
  },
  profileStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
