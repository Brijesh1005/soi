import React, { Component } from 'react'
import {
   StyleSheet,
   Text,
   Navigator,
   View,
   TouchableOpacity
} from 'react-native'

import AboutContainer from '../components/AboutContainer'
import HomeContainer from '../containers/HomeContainer'
import FeedbackContainer from '../containers/FeedbackContainer'
import ShowFeedbackContainer from '../containers/ShowFeedbackContainer'
import AddGroupContainer from '../containers/AddGroupContainer'
import LoginContainer from '../containers/LoginContainer'

export default class Router extends Component {
  constructor() {
    super();
  }

  renderScene(route, navigator) {
   switch (route.name) {
      case 'LoginPage':
        return (
          <LoginContainer
           navigator = { navigator }
           {...route.passProps}/>
        );
      case 'Groups':
       return (
          <HomeContainer
            navigator = {navigator}
            {...route.passProps} />
        );
      break;
      case 'About':
        return (
         <AboutContainer
            navigator = {navigator}
            {...route.passProps} />
        );
      break;
      case 'Feedback':
        return (
         <FeedbackContainer
            navigator = {navigator}
            {...route.passProps} />
        );
      break;
      case 'Show Feedback':
         return (
          <ShowFeedbackContainer
             navigator = {navigator}
             {...route.passProps} />
          );
      break;
      case 'AddGroup':
         return (
          <AddGroupContainer
             navigator = {navigator}
             {...route.passProps} />
          );
      break;
   }
  }
  render() {
    return (
      <Navigator style = { styles.navigatorS }
        initialRoute = {{ name: 'LoginPage', title: 'Login'}}
        renderScene = { this.renderScene }
        sceneStyle = { styles.sceneStyle }
        configureScene= {(route) => {
          if (route.name === 'AddGroup')
            return Navigator.SceneConfigs.FadeAndroid;
          else
           return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar = {
          <Navigator.NavigationBar
            style = { styles.navigationBar }
            routeMapper = { NavigationBarRouteMapper } />
        }
      />
    );
  }
}

var NavigationBarRouteMapper = {
   LeftButton(route, navigator, index, navState) {
      if (index > 0) {
        return (
          <TouchableOpacity
            onPress = {() => { if (index > 0) { navigator.pop() } }}>
            <View style = { styles.titleContainerLeftButton }>
              <Text style={ styles.leftButton }>
                &lt;
               </Text>
            </View>
          </TouchableOpacity>
        )
      }
      else { return null }
   },
   RightButton(route, navigator, index, navState) {
      if (route.openMenu) {
        return (
          <TouchableOpacity
            onPress = { () => route.openMenu() }>
            <View style = { styles.titleContainerRightButton }>
              <Text style = { styles.rightButton }>
                { route.rightText || 'Menu' }
              </Text>
            </View>
          </TouchableOpacity>
        )
      }
   },
   Title(route, navigator, index, navState) {
      return (
        <View style = { styles.titleContainer }>
          <Text style = { styles.title }>
            {route.title}
          </Text>
        </View>
      );
   }
};

const styles = StyleSheet.create({
   navigationBar: {
     backgroundColor: 'white',
     height: 40
   },
   leftButton: {
      color: '#2a2a2a',
      fontSize: 17,
      fontWeight: 'bold'
   },
   title: {
      color: '#2a2a2a',
      fontSize: 16,
      fontFamily: 'notoserif'
   },
   titleContainer: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
     paddingTop: 8
   },
   titleContainerLeftButton: {
     marginTop: 5
   },
   rightButton: {
      color: 'white',
      fontSize: 16
   },
   navigatorS: {
     position: 'relative'
   },
   sceneStyle: {
     marginTop: 40,
     borderTopWidth: 0.5,
     borderColor: 'gainsboro'
   }
})
