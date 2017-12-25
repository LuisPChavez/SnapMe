import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, Switch } from 'react-native';

class ButtonWithSwitch extends Component {
    constructor(props) {
        super(props)
        const { buttonStyle, textStyle, switchStyle } = styles;
        this.state = { switchValue: false }
    }

    onValueChange() {
        this.setState({switchValue: !this.state.switchValue})
    };


    render() {
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onClicked}>
                <Text style={styles.textStyle}>
                    {this.props.buttonText}
                </Text>
                <Switch  
                    style={styles.switchStyle}
                    value={this.state.switchValue}
                    onValueChange={this.onValueChange.bind(this)}
                />
            </TouchableOpacity>
        );
    };
};

const styles = {
    textStyle: {
        marginLeft: 15,
        alignSelf: 'center',
        color: '#5a5a5a',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    switchStyle: {
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#D3D3D3',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5
    }
};

export default ButtonWithSwitch;
