import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {Grid, Col, Row, Button } from 'react-native-elements';
import GroupListContainer from '../containers/GroupListContainer';

const {height, width} = Dimensions.get('window');
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.addGroup = this.addGroup.bind(this);
  }

  addGroup() {
    this.props._actions.createNewGroup();
    this.props._actions.loadAllProfiles();
    this.props.navigator.push({
       name: 'AddGroup',
       title: 'Add Group'
    });
  }

  render() {
    const profileInfo = this.props.profile;
    return (
      <Grid>
        <Row size={1} containerStyle={styles.profileStyle}>
          <Col size={2}>
            <View style={styles.profileStyle}>
              <Image
                style={{width: 40, height: 40, borderRadius: 50 }}
                source={{uri: profileInfo.userImage}}/>
              <Text style={styles.txt}>{profileInfo.userName}</Text>
            </View>
          </Col>
          <Col size={1.5}>
            <Button
              onPress={ this.addGroup }
              backgroundColor='transparent'
              color='#397af8'
              icon= {{name: 'add', color:'#397af8'}}
              underlayColor='#fff'
              title='Add new group'
            />
          </Col>
        </Row>
        <Row size={10} containerStyle={styles.groupStyle}>
          <Col>
            <GroupListContainer userId={ profileInfo._id } navigator = {this.props.navigator}/>
          </Col>
        </Row>
      </Grid>
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
  profileStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  groupStyle: {
    alignItems: 'flex-start',
  }
});
