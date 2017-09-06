import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';
import  UserIconInUserList  from './UserIconInUserList';
export default class UserListInGroup extends React.Component {

  render() {
    let showFirstUser = 1;
    const createItem = (users, index) => {
      if (this.props.profile._id !== users.profile._id) {
        return (<UserIconInUserList key={index} item={users.profile} showFirstUser={showFirstUser--} { ...this.props }/>)
      }
    };
   return (
     <View style={styles.UserListView}>
       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.userListScrollView}>
         {this.props.groupMembers.map(createItem)}
       </ScrollView>
     </View>
   );
  }
}
const styles=StyleSheet.create({
  userListScrollView:{
  },
  UserListView:{
    borderTopColor: 'gainsboro',
    borderTopWidth: 1,
    flex: 1
  }
})
