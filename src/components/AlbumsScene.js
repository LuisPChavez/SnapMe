import React, { Component } from 'React';
import {Text, View, CameraRoll, ScrollView } from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GalleryScene from './GalleryScene';
import {ChangeAlbum} from '../actions'
import Header from './Header';
import ButtonWithImage from './ButtonWithImage';
import {togalleryscene} from "../actions";
import {NavigationActions} from 'react-navigation'

class AlbumsScene extends Component {
    constructor(){
        super();

        albumnames = [];
        imageURI = [];

        //this.props.albumnames = null;
        //this.state = {Allimages: null, images: []};
    }

    static navigationOptions = {
        title: "AlbumScene",
        header: null
    };

    navigate = (album) => {
        this.props.ChangeAlbum(album);
        const navigateToGalleryScene = NavigationActions.navigate({
            routeName: "galleryScene"
        });
        this.props.navigation.dispatch(navigateToGalleryScene);
    };

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
    

    //<ButtonWithImage key{album} onClicked={()=> {this.props.changeAlbum(album)}} buttonText={album} imageUri = {imageURI[index]}/>
    renderAlbumNames() {
        //console.log(this.props.ChangeAlbum)
        return albumnames.map( (album,index) =>
            <ButtonWithImage key={album} onClicked={() => {this.navigate(album)}} buttonText={album} imageUri={imageURI[index]}/>
            //<ButtonWithImage key={album} onClicked={()=> {this.props.ChangeAlbum(album)}} buttonText={album} imageUri = {imageURI[index]}/>
        );
    }

    //onClicked = {() => this.props.changeAlbum("Hello")}
    render() {

        if (!(imageURI.length == albumnames.length) || imageURI.length == 0) {
            return(<View></View>);
        }
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Header headerText={"Albums"} />
                </View>
                
                <ScrollView style={styles.containerStyle}>
                    {this.renderAlbumNames()}
                </ScrollView>
            </View>
        );
    }
}




const styles = {
    viewContainer: {
        flex : 1,
        backgroundColor: "#151515"
    },
    containerStyle: {
        flex: 1,
        backgroundColor: "#5A5A5A",
        borderRadius: 20
    }
}


function mapStateToProps(state) {
    return {
        Album: state.Album
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ChangeAlbum: ChangeAlbum,togalleryscene}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(AlbumsScene);