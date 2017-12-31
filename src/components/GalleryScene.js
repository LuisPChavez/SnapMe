import React, { Component } from 'react';
import {View, Image,  CameraRoll, FlatList, Text, TouchableOpacity, Share, Linking, Dimensions } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from './Header';
import {togalleryscene} from "../actions/scenesAction";
import {NavigationActions} from "react-navigation";
import Picture from './Picture';


class GalleryScene extends Component {

    static navigationOptions = {
        title: "galleryScene",
        header: null
    };

    componentWillMount() {
        this.getPics();
        
    }

    openSharing() {
        console.log(":sdfd")
    }

    getPics() {
        CameraRoll.getPhotos( {
            first: 1500,
            groupName: this.props.ActiveAlbum.AlbumName
        })
        .then(r => {
            this.setState({pictures: r.edges})
        }).catch((err) => {
            console.log(err);
        });
    };

    renderItem(item){
        console.log(item.item.node.image.uri)
        return(
            <Picture uri={item.item.node.image.uri} />
        );
    }

    render() {    

        if( this.state.pictures.length <= 0) {
            return (
                <Text>
                    List is empty!!
                </Text>
            )
        }
        else {
            return (
                <View style={{flex: 1}} >
                    <Header headerText={"Pictures"} style={{marginBottom: 10}}/>
                    <FlatList
                        keyExtractor={item => item.node.image.uri} 
                        data={this.state.pictures}
                        renderItem={this.renderItem}    
                        numColumns = {2}   
                        removeClippedSubviews={true}         
                    />
                </View>
            );
        }
    }
}


const styles = {
    picThumbnailStyle: {
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        height: this.sizeOfPic,
        width: this.sizeOfPic
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

