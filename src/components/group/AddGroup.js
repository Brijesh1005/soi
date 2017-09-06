import React from 'react';
import {
  StyleSheet, ListView, View, Text, TouchableOpacity
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';

import DropDown from '../customComponents/dropdown'
import AddRoleContainer from '../../containers/AddRoleContainer';

const profileType = 'profile';
const roleType = 'role';
export default class AddGroup extends React.Component {
  constructor (props) {
    super(props);
    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      return r1.allProfileList.length !== r2.allProfileList.length ||
        r1.roleList.length !== r2.roleList.length;
    }});
    this.count = 1;
    this.records = [{
      rowId: 0,
      allProfileList: props.allProfileList,
      [profileType]: '', // Holds the selected profile id from profile dropdown
      roleList: props.roleList,
      [roleType]: '' // Holds the selected role id from role dropdown
    }];
    this.state = {
      groupName: '',
      groupImage: '',
      dataSource: this._ds.cloneWithRows(this.records),
      addRoleModalVisible: false,
      mandateField: false
    };
    this.props._actions.loadAllRoles();

    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.addMembers = this.addMembers.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addRoles = this.addRoles.bind(this);
    this.toggleRoleModal = this.toggleRoleModal.bind(this);
    this.renderAddMemberRow = this.renderAddMemberRow.bind(this);
    this.renderHiddenRow = this.renderHiddenRow.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roleList.length < nextProps.roleList.length) {
      const newArray =  this.records.map((record) => {
          record.roleList = nextProps.roleList;
          record.allProfileList = nextProps.allProfileList;
          return record;
        });
      this.records = newArray;
      this.setState({dataSource: this._ds.cloneWithRows(this.records)});
    }
  }

  onChangeName(groupName) {
    this.setState({
      groupName,
      mandateField: false
    });
  }

  onChangeImage(groupImage) {
    this.setState({groupImage});
  }

  onSelectionChange = (value, id, type) => {
    const updatedRecord = this.records.find(row => row.rowId === id);
    updatedRecord[type] = value || '';
    this.setState({dataSource: this._ds.cloneWithRows(this.records)});
  }

  addMembers = () => {
    const newRow = {
      rowId: this.count++,
      allProfileList: this.props.allProfileList,
      [profileType]: '',
      roleList: this.props.roleList,
      [roleType]: ''
    };

    this.records.push(newRow);
    this.setState({dataSource: this._ds.cloneWithRows(this.records)});
  }

  addRoles = () => {
    this.toggleRoleModal();
  }

  toggleRoleModal = () => {
    this.setState({ addRoleModalVisible: !this.state.addRoleModalVisible });
  }

  renderModalChildren() {
    return (
      <AddRoleContainer
        closeModal={ this.toggleRoleModal }  />
    )
  }

  validate = () => {
    if(!this.state.groupName)
      return false;
    else
      return true;
  }

  addGroup = () => {
    var isValidate = this.validate();
    if(!isValidate) {
      this.setState({
        mandateField: true
      })
      return;
    }
    let members = [];
    this.records.forEach((data, id) => {
      if(!data[profileType] && !data[roleType]) {
        return;
      }
      const member = {
        [profileType]: data[profileType],
        [roleType]: data[roleType]
      };
      if(member[profileType] && member[roleType])
        members.push(member);
    });
    const groupData = {
      groupName: this.state.groupName,
      groupImage: this.state.groupImage,
      groupMembers: members
    };
    this.props._actions.createNewGroup(groupData);
    this.setState({
      mandateField: false
    });
    this.props.navigator.pop();
  }

  deleteRow(secId, rowId, rowMap) {
    this.records.splice(rowId, 1);
    rowMap[`${secId}${rowId}`].closeRow();
    delete rowMap[`${secId}${rowId}`];
    this.setState({dataSource: this._ds.cloneWithRows(this.records)});
  }

  renderAddMemberRow(rowData, secId, rowId) {
    return (
      <View style={styles.inputListMemberElements}
        key={rowData.rowId}>
        <View style={styles.inputListElements}>
          <Text style={styles.formListLabel}>Member: </Text>
          <DropDown
            id={rowData.rowId}
            data={rowData.allProfileList}
            type={profileType}
            selectedValue={rowData[profileType]}
            onSelectionChange={this.onSelectionChange}
            labelKey='userName'
            valueKey='_id' />
        </View>
        <View style={styles.inputListElements}>
          <Text style={styles.formListLabel}>Role: </Text>
          <DropDown
            id={rowData.rowId}
            data={rowData.roleList}
            type={roleType}
            selectedValue={rowData[roleType]}
            onSelectionChange={this.onSelectionChange}
            labelKey='roleName'
            valueKey='_id' />
        </View>
      </View>
    );
  }

  renderHiddenRow(data, secId, rowId, rowMap) {
    return (
      <TouchableOpacity onPress={() => this.deleteRow(secId, rowId, rowMap)} style={styles.rowBack}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const groupNameLabelColor = this.state.mandateField ? 'red' : '#2A2A2A';
    const groupNameLabelStyle = StyleSheet.flatten([styles.formLabel, { color: groupNameLabelColor }]);
    return (
      <View style={styles.container}>
        <View style={styles.inputElements}>
            <Text style={groupNameLabelStyle}>Group Name: </Text>
            <FormInput ref='groupName'
              placeholder='Enter group name'
              underlineColorAndroid='#397af8'
              value={this.state.groupName}
              onChangeText={this.onChangeName}
              inputStyle={styles.formInputStyles}/>
        </View>
        <View style={styles.inputElements}>
            <Text style={styles.formLabel}>Group Image: </Text>
            <FormInput ref='groupImage'
              placeholder='Enter group image URL'
              underlineColorAndroid='#397af8'
              value={this.state.groupImage}
              onChangeText={this.onChangeImage}
              inputStyle={styles.formInputStyles}/>
        </View>
        <View style={styles.inputElements}>
          <Button
            onPress={ this.addMembers }
            backgroundColor='transparent'
            color='#397af8'
            icon= {{name: 'add', color:'#397af8'}}
            underlayColor='#fff'
            title='Add Members'
          />
          <Button
            onPress={ this.addRoles }
            backgroundColor='transparent'
            color='#397af8'
            icon= {{name: 'add', color:'#397af8'}}
            underlayColor='#fff'
            title='Add Roles'
          />
        </View>
        <View style={styles.memberContainer}>
          <SwipeListView
            dataSource={this.state.dataSource}
            renderRow={this.renderAddMemberRow}
            renderHiddenRow={this.renderHiddenRow}
      			leftOpenValue={70}
            swipeToOpenPercent={40}
            disableLeftSwipe={true}
            disableRightSwipe={this.records.length === 1}
            recalculateHiddenLayout={false}
            previewFirstRow={true}
            tension={0}
            previewOpenValue={20}/>
        </View>
        <Button
          onPress={ this.addGroup }
          backgroundColor='#397af8'
          underlayColor='#fff'
          raised={true}
          title='Create group'
          buttonStyle={ styles.createButton }
        />
        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          isVisible={ this.state.addRoleModalVisible }
          style={styles.modalContainer}>
          { this.renderModalChildren() }
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 10
  },
  inputElements: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row'
  },
  formLabel: {
    color: '#2A2A2A',
    marginTop: 14,
    margin: 0,
    padding: 0
  },
  formInputStyles: {
    color: "#2a2a2a"
  },
  memberContainer: {
    flex:1,
    alignItems: 'center'
  },
  inputListElements: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row'
  },
  inputListMemberElements:  {
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#d0d0d0',
    width: 300,
    backgroundColor: "#fafafa"
  },
  formListLabel: {
    color: "#2a2a2a",
    width:80,
    textAlign: 'right',
    marginTop: 0,
    margin: 0,
    padding: 0
  },
  createButton: {
    margin: 10,
    height: 30
  },
  rowBack: {
    backgroundColor: "#dd4116",
    justifyContent: 'center',
    height: 60,
    padding: 10
  },
  remove: {
    fontWeight: 'bold',
    color: "#efefef"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4
  }
});
