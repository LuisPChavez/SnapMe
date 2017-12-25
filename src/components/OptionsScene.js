import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './Header'
import ButtonWithSwitch from './ButtonWithSwitch'


class OptionsScene extends Component {

    render() {
        return(
            <View>
                <Header headerText={"Options"} />
                <ButtonWithSwitch buttonText={"Test"} />
            </View>
        );
    }
}

export default OptionsScene;
