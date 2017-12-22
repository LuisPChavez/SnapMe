import React from 'react';
import { View, AppRegistry } from 'react-native';
import GallaryScene from './src/components'

const App = () => (
    <View style={{ flex: 1 }}>
        <GallaryScene />
    </View>
);

AppRegistry.registerComponent('SnapMe', () => App);
