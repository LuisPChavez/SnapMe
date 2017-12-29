import React, { Component } from 'react';
import {View, Image,  CameraRoll, FlatList, Text, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from './Header';
import {togalleryscene} from "../actions/scenesAction";
import {NavigationActions} from "react-navigation";

class GalleryScene extends Component {

    static navigationOptions = {
        title: "galleryScene",
        header: null
    };

    state = { pictures: [] };


    componentWillMount() {
        this.getPics();
    }

    openSharing() {
        console.log(":sdfd")
    }

    getPics() {
        CameraRoll.getPhotos( {
            first: 7,
            groupName: this.props.ActiveAlbum.AlbumName
        })
        .then(r => {
            this.setState({pictures: r.edges})
        }).catch((err) => {
            console.log(err);
        });
    };

    renderItem(item){

        return(
            <View>
                <TouchableOpacity 
                    onPress={() => {console.log("asdf")}} 
                    >
                    <Image 
                        style={styles.picThumbnailStyle}
                        source={{ uri: item.item.node.image.uri}}
                    />
                </TouchableOpacity>
            </View>
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
                <View>
                    <Header headerText={"Pictures"} />
                    <FlatList
                        keyExtractor={item => item.node.image.uri} 
                        data={this.state.pictures}
                        renderItem={this.renderItem}    
                        numColumns = {1}            
                    />
                </View>
            );
        }
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

