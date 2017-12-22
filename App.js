/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import store from './src/store';
import {Provider} from 'react-redux';
import Test from './src/components'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <View>
        <Test />
      </View>
      </Provider>
    );
  }
}
