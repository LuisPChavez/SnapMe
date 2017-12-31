import React from 'react';
import { Image, TouchableOpacity, Dimensions, Share } from 'react-native';

const Picture = (props) => {
    return (
        <TouchableOpacity 
            onPress={ () => {
                Share.share({
                    message: 'BAM: we\'re helping your business with awesome React Native apps',
                    url: 'http://bam.tech',
                    title: 'Wow, did you see that?'
                  }, {
                    // Android only:
                    dialogTitle: 'Share BAM goodness',
                    // iOS only:
                })
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
