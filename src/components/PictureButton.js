import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const PictureButton = (props) => {
    const { pictureStyle } = styles;

    return (
        <TouchableOpacity onPress={props.onClicked}>
            <Image 
                style={pictureStyle}
                source={{ uri : props.imageURI }}
            />
        </TouchableOpacity>
    );
};

const styles = {
    pictureStyle: {
        height: 210,
        width: 210
    }
};

export default PictureButton;
