import React, { Component } from 'react';
import {View, Image,  CameraRoll, FlatList, Text, TouchableOpacity, Share } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from './Header';
import PictureButton from './PictureButton';
import {togalleryscene} from "../actions/scenesAction";
import {NavigationActions} from "react-navigation";

class GalleryScene extends Component {

    state = { pictures: [] };


    componentWillMount() {
        this.getPics();
    }

    getPics() {
        CameraRoll.getPhotos( {
            first: 1500,
            groupName: this.props.ActiveAlbum.AlbumName
        })
        .then(r => {
            //console.log("Pics put in state");
            this.setState({pictures: r.edges})
        }).catch((err) => {
            console.log(err);
        });
    };

    onDeezNuts() {
        console.log("asdfsadfdsaf")
    }

    renderItem(pictures){
        console.log("render pic");
        return(
            <TouchableOpacity >
                <Image 
                    style={styles.pictureStyle}
                    source={{ uri : pictures.item.node.image.uri }}
                />
            </TouchableOpacity>
        );
    }

    /*
    { () => 
                Share.share({
                    message: 'BAM: we\'re helping your business with awesome React Native apps',
                    url: 'http://bam.tech',
                    title: 'Wow, did you see that?'
                }, {
                      // Android only:
                      dialogTitle: 'Share BAM goodness',
                      // iOS only:
                })
                */
    
    // Item refers
    _keyExtractor = (item, index) => { 
        item.node.image.uri
        console.log(item.node.image.uri)
    };

    render() {    
        if( this.state.pictures.length <= 0) {
            return (
                <Text>
                    List is empty!!
                </Text>
            )
        }
        
        console.log("else")
        return (
            <View>
                <Header headerText={"Pictures"} />
                <FlatList 
                    data={this.state.pictures}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}    
                    numColumns = {10}            
                />
            </View>
        )  
    }
}

const styles = {
    pictureStyle: {
        height: 200,
        width: 200
    },

    picThumbnailContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
};


function mapStateToProps(state)
{
    return {
        ActiveAlbum: state.Album
    };
}


const mapDispatchToProps = {
    togalleryscene
};


export default connect(mapStateToProps,mapDispatchToProps)(GalleryScene);

