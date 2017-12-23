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
    }

    componentWillMount(){
        this.getAllImages();
    }

    getAllImages(numberpics = 1000) {
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
        albumnames = this.state.Allimages.map(AN => {return AN.node.group_name});
        albumnames = albumnames.filter((elem,index,self) => {return index == self.indexOf(elem)});
        this.getSingleImages();
    }

    getSingleImages(){
        //console.log("getSingle")
        var albumnnameslength =  albumnames.length;
        
        for(var i = 0; i<albumnnameslength; i++){
            this.getFromCameraRoll(1,albumnames[i]);
        }
    }

    updateURI(){
        imageURI.push(this.state.images[0].node.image.uri);
        this.forceUpdate();
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
        return albumnames.map( (album,index) =>
            <ButtonWithImage key={album} onClicked={() => {this.props.changeAlbum(album)}} buttonText={album} imageUri={imageURI[index]}/>
        );
    }

    //onClicked = {() => this.props.changeAlbum("Hello")}
    render() {

        if (!(imageURI.length == albumnames.length) || imageURI.length == 0) {
            console.log("Before Render");
            return(<View></View>);
        }

        console.log("After Render");
        return (
            <View>
                <View>
                    <Header headerText={"Albums"} />
                </View>
                <ScrollView>
                    {this.renderAlbumNames()}
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