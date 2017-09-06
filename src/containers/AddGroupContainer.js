import React from 'react';
import { connect } from 'react-redux'
import AddGroup from '../components/group/AddGroup'
import { saveNewGroup } from '../actions/groupActions';
import { loadAllRoles } from '../actions/roleActions';
import { loadAllGroups } from '../actions/groupActions';

class AddGroupContainer extends React.Component {
  render() {
    return (
      <AddGroup {...this.props} navigator = {this.props.navigator}/>
    )
  }
}

function convertToArray(object) {
  return Object.keys(object).map((obj) => object[obj]);
}

function convertToPickerData(data, keys) {
  const convertedArray = [];
  data.length && data.forEach((item) => {
    let obj = {};
    keys.forEach((key) => {
      obj[key] = item[key];
    });
    convertedArray.push(obj);
  });
  return convertedArray;
}

function mapStateToProps (state) {
  const { createGroup, profile, roles } = state;
  const allProfileList = convertToPickerData(profile, ['userName', '_id', 'userImage']);
  const roleList = convertToPickerData(convertToArray(roles), ['roleName', '_id', 'roleCompetencies']);
  return {
    createGroup,
    allProfileList,
    roleList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      createNewGroup: (groupData) => {
        dispatch(saveNewGroup(groupData));
      },
      loadAllRoles: () => {
        dispatch(loadAllRoles());
      },
      loadAllGroups: () => {
        dispatch(loadAllGroups())
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupContainer)
