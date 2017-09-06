import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,TouchableHighlight,TouchableOpacity,
  Icon,
  Modal
} from 'react-native';
import IconComponent from './customComponents/IconComponent'
import ShowCompetenciesContainer from '../containers/ShowCompetenciesContainer'
import * as types from '../constants/ActionTypes';

export default class UserIconInUserList extends React.Component {
    state = {
      modalVisible: false,
    }
    componentWillMount() {
        if (this.props.showFirstUser > 0) {
            this.props._actions.setSelectedUserInGroup(this.props.item._id);
        }
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    setSelectedUser = () => {
      this.props._actions.setSelectedUserInGroup(this.props.item._id);
      this.props.getFeedback(this.props.profile._id, this.props.item._id , this.props.selectedGroupId)
    }
    render() {
        var item = this.props.item;
        return (
          <TouchableHighlight onPress={this.setSelectedUser} style={styles.touchStyle} underlayColor = {'white'} >
            <View  style={styles.icon} >
             <IconComponent
               showImage={true}
               letter={this.props.item.userName[0]}
               uri={this.props.item.userImage}
               iconContainerStyles={styles.circle}/>
            </View>
          </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    icon:{
      padding: 5
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 50
    }
});
