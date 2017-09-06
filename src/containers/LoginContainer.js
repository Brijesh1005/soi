import React from 'react';
import { View }
from 'react-native';
import { connect }
from 'react-redux'
import LoginPage from '../components/LoginPage'
import { validateLogin } from '../actions/loginActions';
import { loadProfileById } from '../actions/profileActions';

class LoginContainer extends React.Component {
  render() {
    return (<LoginPage {...this.props} navigator = {this.props.navigator}/>);
  }
}

function mapStateToProps(state) {
  const { authDetails: { authenticated, result } } = state;
  return { authenticated, result };
}

function mapDispatchToProps (dispatch) {
  return {
    _actions: {
      validateLogin: (username, password) => {
        dispatch(validateLogin(username,password));
      }
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
