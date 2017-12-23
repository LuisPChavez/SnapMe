import React, { Component } from 'react';
import {View, Image,  CameraRoll, FlatList, Text } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from './Header';


class GallaryScene extends Component {
    state = { pictures: [] };

    componentWillMount() {
        this.getPics();
    }

    getPics() {
        CameraRoll.getPhotos( {
            first: 7,
            /*groupName: this.props.ActiveAlbum.Album,*/
        })
        .then(r => {
            console.log("Pics put in state");
            this.setState({pictures: r.edges})
        }).catch((err) => {
            console.log(err);
        });
    };

    renderItem(pictures){
        console.log(pictures);
        return(
            <Image 
                style={styles.picThumbnailStyle}
                source={{ uri: pictures.item.node.image.uri}}
            />
        );
    }

    render() {    

        if( this.state.pictures.length < 4) {
            return (
                <Text>
                    List is empty!!
                </Text>
            )
        }
        else {
            return (
                <View>
                    <Header headerText={"Pictures"} />
                    <FlatList 
                        style={styles.picThumbnailContainerStyle}
                        data={this.state.pictures}
                        renderItem={this.renderItem}    
                        numColumns = {3}            
                    />
                </View>
            );
        }
    }
}

const styles = {
    picThumbnailStyle: {
            margin: 7,
            height: 105,
            width: 105
        },

    picThumbnailContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    testForPics: {
        flex: 1
    }
};


function mapStateToProps(state)
{
    return {
        ActiveAlbum: state.Album
    };
}


export default connect(mapStateToProps)(GallaryScene);

