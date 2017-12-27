import React, { Component } from 'React';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    CameraRoll,
    TouchableOpacity,
    Image
} from 'react-native';
import Camera from 'react-native-camera';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toalbumsscene} from '../actions';
import {NavigationActions} from 'react-navigation';
import AlbumScene from './AlbumsScene';


class CameraScene extends Component {
    static navigationOptions = {
        title: "CameraScene",
        header: null
    };

    navigateToGallary = () => {
        const navigateToAlbumScene = NavigationActions.navigate({
            routeName: "albumScene"
        });
        this.props.navigation.dispatch(navigateToAlbumScene);
    }

    navigateToOptions = () => {
        const navigateToOptionsScene = NavigationActions.navigate({
            routeName: "optionsScene"
        });
        this.props.navigation.dispatch(navigateToOptionsScene);
    }


    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) => console.log(data))
          .catch(err => console.error(err));
    }
    
    render(){
        return (
            <View style={styles.viewContainer}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fit}
                    >
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity onPress={this.navigateToOptions} >
                            <Image 
                                style={styles.imageStyle} 
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Photo-camera-in-circular-outlined-interface-button.svg/1000px-Photo-camera-in-circular-outlined-interface-button.svg.png'}} 
                            />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{ alignSelf: 'flex-end' }}
                            onPress={this.takePicture.bind(this)} >
                            <Image
                                style={styles.imageStyle} 
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Photo-camera-in-circular-outlined-interface-button.svg/1000px-Photo-camera-in-circular-outlined-interface-button.svg.png'}} 
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.navigateToGallary} >
                            <Image
                                style={styles.imageStyle} 
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Photo-camera-in-circular-outlined-interface-button.svg/1000px-Photo-camera-in-circular-outlined-interface-button.svg.png'}} 
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    viewContainer: {
        flex: 1,
        backgroundColor:  "#000",
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
    },
    imageStyle: {
        height: 100,
        width: 100,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
})

function mapStateToProps(state) {
    return {
        Album: state.Album
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toalbumsscene}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(CameraScene);