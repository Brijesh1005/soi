import React from 'react';
import {
  StyleSheet, ListView, View, Text, TouchableOpacity
} from 'react-native';
import GroupListItem from './GroupListItem';

export default class GroupList extends React.Component {
  constructor (props) {
    super(props);
    this.props._actions.loadAllGroups();
  }
  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
  }
  render() {
    let dataSource = this.dataSource.cloneWithRows({});
    if (this.props.profile) {
      dataSource = this.dataSource.cloneWithRows(this.props.profile.groups);
    }
    return (
      <View>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData, index) =>
            <GroupListItem
              key={ index }
              item={ rowData }
              navigator={ this.props.navigator }
              { ...this.props }
            />}
          enableEmptySections={true}
        />
      </View>
    );
  }
}
