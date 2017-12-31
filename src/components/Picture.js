import React from 'react';
import { Image, TouchableOpacity, Dimensions } from 'react-native';

const Picture = (props) => {
    return (
        <TouchableOpacity 
            onPress={ () => {
                console.log("sdf")
            }}>
            <Image
                style={styles.picThumbnailStyle}
                source={{uri : props.uri }}
            />
        </TouchableOpacity>
    );
};

let {height, width } = Dimensions.get("window");
width = (width / 2) - 5;
sizeOfPic = width;


const styles = {
    picThumbnailStyle: {
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        height: this.sizeOfPic,
        width: this.sizeOfPic
    },
};

export default Picture;
