import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux'
import GroupList from '../components/group/GroupList'
import { loadAllGroups } from '../actions/groupActions';
import { setSelectedGroup } from '../actions/selectedGroupActions';
import { createProfileInformation } from '../selector'

class GroupListContainer extends React.Component {
  render() {
    return (
      <GroupList {...this.props} navigator = {this.props.navigator}/>
    )
  }
}

function mapStateToProps(state) {
  const { groups } = state;
  return {
    groups,
    profile: createProfileInformation(state)
   };
}

function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      setSelectedGroup: (gid) => {
        dispatch(setSelectedGroup(gid))
      },
      loadAllGroups: () => {
        dispatch(loadAllGroups())
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer)
