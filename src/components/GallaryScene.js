import React, { Component } from 'react';
import {View, Image, ScrollView, CameraRoll } from 'react-native';
import Header from './Header';


class GallaryScene extends Component {
    state = { pictures: [] };

    getPic() {
        CameraRoll.getPhotos( {
            first: 5,

        })
        .then(r => {
            this.setState({pictures: r.edges})
            console.log(this.state);
        }).catch((err) => {

        });
    };


    renderPictures() {
        return this.state.pictures.map(pic =>
            <Image 
                style={styles.picThumbnailStyle}
                source={{ uri: pic.node.image.uri}}
            />
        );
    }

    render() {    
        this.getPic();    
        return (
            <View>
                <Header headerText={"Pictures"} />
                <ScrollView>
                    <View style={styles.picThumbnailContainerStyle}>
                        {this.renderPictures()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    picThumbnailStyle: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        height: 110,
        width: 110
    },

    picThumbnailContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
};

export default GallaryScene;

