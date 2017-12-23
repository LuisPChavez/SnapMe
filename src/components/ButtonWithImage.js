import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const ButtonWithImage = (props) => {
    const { buttonStyle, textStyle, photoStyle } = styles;

    return (
        <TouchableOpacity style={buttonStyle}
                            onPress={props.onClicked}>
            <Text style={textStyle}>
                {props.buttonText}
            </Text>
            <Image  
                style={photoStyle}
                source={{uri: props.imageUri}}
            />
        </TouchableOpacity>
    );
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
    photoStyle: {
        height: 75,
        width: 75
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

export default ButtonWithImage;
