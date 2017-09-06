import React from 'react';
import { connect } from 'react-redux'
import AddRole from '../components/AddRole'
import { saveNewRole } from '../actions/roleActions';

class AddRoleContainer extends React.Component {
  render() {
    return (
      <AddRole {...this.props} navigator = {this.props.navigator}/>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      createNewRole: (groupData) => {
        dispatch(saveNewRole(groupData));
      }
    }
  }
}

export default connect(null, mapDispatchToProps)(AddRoleContainer)
