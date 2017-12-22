import React, { Component } from 'React';
import {Text, View, CameraRoll } from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GallaryScene from './GallaryScene';
import changeAlbum from '../actions'
import Header from './Header';
import Button from './Button';


class AlbumsScene extends Component {
    

    getFromCameraRoll(numberpics){
        CameraRoll.getPhotos( {
            first: numberpics,
            groupName: "o"
        })
        .then(r => {
            this.setState({pictures: r.edges});
            console.log(r.edges);
        }).catch((err) => {
            //Error Getting Pics
        });
    };

    //onClicked = {() => this.props.changeAlbum("Hello")}
    render() {
        return (
            <View>
                <View>
                    <Header headerText={"Albums"} />
                </View>
                <View style={styles.containerStyle}>
                    <Button buttonText={this.props.Album.AlbumName} 
                            onClicked = {() => this.props.changeAlbum("Hello")}/>
                </View>
            </View>
        );
    }
}

/*
const AlbumsScene = () => {

    //this.props.Albums
    albums = [];    
    console.log(this.props.Album);
    //Change All passed into changeAlbum when you know what album user selets
    return (
        <View>
            <View>
                <Header headerText={"Albums"} />
            </View>
            <View style={styles.containerStyle}>
                <Button buttonText={this.props.Album[0].AlbumName} 
                        onPress = {() => this.props.changeAlbum("Hello")}/>
            </View>
        </View>
    );
};*/

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}


function mapStateToProps(state) {
    return {
        Album: state.Album
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeAlbum: changeAlbum},dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(AlbumsScene);