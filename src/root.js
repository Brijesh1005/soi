import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'
import Router from './components/Router'
import { loadProfileById } from './actions/profileActions'

const store = configureStore({});

class Root extends React.Component {
  render() {
    return ( <Provider store = {store} >
      < Router / >
      < /Provider>
    )
  }
}

export default Root
