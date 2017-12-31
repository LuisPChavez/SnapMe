// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return ( 
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#151515',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 5,
        shadowColor: '#0000FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        color: "#ffffff"
    }
};

// Make the component available to other parts of the app
export default Header;
