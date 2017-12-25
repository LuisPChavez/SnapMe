/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native';
import store from './src/store';
import {Provider, connect} from 'react-redux';
import Test from './src/components';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigation from './src/navigation';



export default class App extends Component<{}> {
  render() {
    console.log("Entered")
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
