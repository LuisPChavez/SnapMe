import React, { Component } from 'React';
import {Text, View, CameraRoll, ScrollView } from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GallaryScene from './GallaryScene';
import changeAlbum from '../actions'
import Header from './Header';
import ButtonWithImage from './ButtonWithImage';


class AlbumsScene extends Component {
    constructor(){
        console.log("Construct call")
        super();

        albumnames = [];
        imageURI = [];

        //this.props.albumnames = null;
        //this.state = {Allimages: null, images: []};
        this.getAllImages();
    }


    getAllImages(numberpics = 1500) {
        //console.log("getAll")
        CameraRoll.getPhotos({
            first: numberpics,
        })
        .then(r => {
            this.setState({Allimages: r.edges},() => {this.mapAlbumName()});
        }).catch((err) => {
            console.log(err.message,err.code);
        });
    };

    mapAlbumName(){
        console.log("mapAlbum")
        //this.setState({albumnames: this.state.Allimages.map(aname => {return aname.group_name})})
        albumnames = this.state.Allimages.map(AN => {return AN.node.group_name});
        albumnames = albumnames.filter((elem,index,self) => {return index == self.indexOf(elem)});
        this.getSingleImages();
    }

    getSingleImages(){
        console.log("getSingle")
        var albumnnameslength =  albumnames.length;
        for(var i = 0; i<albumnnameslength; i++){
            this.getFromCameraRoll(1,albumnames[i]);
        }
    }

    updateURI(){
        //console.log(this.state.images);
        imageURI.push(this.state.images[0].node.image.uri);
        //console.log(imageURI);
    }


    
    getFromCameraRoll(numberpics,AN){
        CameraRoll.getPhotos( {
            first: numberpics,
            groupName: AN
        })
        .then(r => {
            this.setState({images: r.edges}, ()=> {this.updateURI()})
        }).catch((err) => {
            //Error Getting Pics
        });
    };
    
    renderAlbumNames() {
        //console.log(albumnames)
        return albumnames.map( (album) =>
            <ButtonWithImage onPress={() => (this.props.changeAlbum(album))} buttonText={album} imageUri={imageURI[0]}/>
        );
    }

    //onClicked = {() => this.props.changeAlbum("Hello")}
    render() {
        console.log("rendered");
        if (imageURI.length != 0 && imageURI.length == albumnames.length) {
            return(<View></View>);
        }
        return (
            
            <View>
                <View>
                    <Header headerText={"Albums"} />
                </View>
                <ScrollView>
                    {/*this.renderAlbumNames()*/}
                </ScrollView>
            </View>
        );
    }
}




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