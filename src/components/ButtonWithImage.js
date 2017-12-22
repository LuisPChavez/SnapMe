import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const ButtonWithImage = (props) => {
    const { buttonStyle, textStyle, photoStyle } = styles;
    //console.log(props.imageUri);
    //console.log(props.buttonText);
    /*
    return (
        <TouchableOpacity onPress={() => console.log('pressed')} style={buttonStyle}>
            <Text style={textStyle}>
                {props.buttonText}
            </Text>
        </TouchableOpacity>
    );*/
    return (
        <TouchableOpacity style={buttonStyle}
                            onPress={props.onClicked}>
            <Text style={textStyle}>
                {props.buttonText}
            </Text>  
            <Image  
                style={photoStyle}
                uri={props.imageUri}
            />
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#5a5a5a',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    photoStyle: {
        height: 10,
        width: 10
    },
    buttonStyle: {
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5
    }
};

export default ButtonWithImage;
