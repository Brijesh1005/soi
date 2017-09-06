import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Icon
} from 'react-native';
import IconComponent from '../customComponents/IconComponent'

export default class GroupListItem extends React.Component {
  goToGroup = () => {
    this.props._actions.setSelectedGroup(this.props.item._id);
    this.props.navigator.push({
       name: 'Feedback',
       title: 'Feedback'
    });
  }
  render() {
    var item = this.props.item;
    return (
      <View>
        <TouchableHighlight onPress = {this.goToGroup}>
          <View style={styles.container}>
            <IconComponent letter={item.groupName[0]} iconContainerStyles={styles.circle}/>
            <Text
              style={[styles.txt]}>
              {item.groupName}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.hr}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#ffffff',
    flexDirection:'row'
  },
 hr: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 1,
    marginLeft: 0,
    marginRight: 0
  },
  txt: {
    fontSize: 18,
    marginLeft: 5,
    marginTop: 2,
    color: '#222222'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50
  }
});
