import React from 'react';
import {
  View,TextInput,TouchableOpacity,Image,StyleSheet,Button,Text
} from 'react-native';

import LoginContainer from '../containers/LoginContainer'
import backgroundImage from '../images/Background.jpeg'
import HomeContainer from '../containers/HomeContainer'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password:''
   };
   this.props._actions.validateLogin('brijesh', 'brijesh');
  }

  componentWillReceiveProps (nextProps) {
    // if user is authenticated and his records found nextProps.result will give the user details,
    // otherwise it will show a string error message
    if (nextProps.authenticated && typeof nextProps.result === 'object') {
      // Replacing login route is a better option if login is successful.
      nextProps.navigator.replaceAtIndex({
        name: 'Groups',
        title: 'Groups',
        passProps: { profileId: nextProps.result._id }
      }, 0);
    } else {
      // TODO: show the error message in login page
    }
  }

  _login() {
    this.props._actions.validateLogin(this.state.userName, this.state.password);
  }

  render() {
    return (
      <Image source={backgroundImage} resizeMode="cover" style={[styles.container,styles.background]}>
        <View style={styles.container}/>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                underlineColorAndroid="transparent"
                onChangeText={(textUN) => this.setState({ userName: textUN })}
                value={this.state.userName} />
            </View>
            <View style={styles.inputWrap}>
              <TextInput style={styles.input}
                placeholder="Password"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={(textPW) => this.setState({password:textPW})}
                value={this.state.password} />
            </View>
            <TouchableOpacity activeOpacity={.5} onPress={this._login.bind(this)}>
              <View style={styles.button} >
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5}>
              <Text style={styles.forgotPassword}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5}>
              <Text style={styles.forgotPassword}>Donot have an account ? create one</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.container}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container :{flex:1},
  background:{
    width:null,
    height:null
  },
  inputWrap:{
    flexDirection:'row',
    marginVertical:10,
    height:40,
    backgroundColor:"transparent"
  },
  input:{
    flex:1,
    marginHorizontal:10,
    backgroundColor:'#FFF'
  },
  button: {
    paddingVertical: 5,
    marginVertical: 15,
    backgroundColor : '#d73352',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent : 'center'
  },
  buttonText : {
    color :'#fff',
    fontSize : 15
  },
  wrapper :{
    paddingHorizontal :15,
    marginHorizontal :20,
    paddingVertical :20,
    backgroundColor :'#000000'
  },
  forgotPassword: {
    color : '#FFF',
    backgroundColor : "transparent",
    textAlign : "center",
    marginVertical : 10,
    fontSize: 10
  }
});
