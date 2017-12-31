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
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10
    },
    photoStyle: {
        height: 75,
        width: 75,
        borderRadius: 10
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#7D7D7D',
        marginLeft: 4,
        marginRight: 4,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    }
};

export default ButtonWithImage;
