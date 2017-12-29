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
import EntypoIcons from 'react-native-vector-icons/Entypo'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FeatherAwesomeIcons from 'react-native-vector-icons/Feather';


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
                        <View style={styles.topButtonsContainer}>
                            <View>
                                <TouchableOpacity 
                                    onPress={this.navigateToOptions} 
                                    style={styles.settingsButton}
                                    >
                                    <FeatherAwesomeIcons name="settings" color="#ffffff" size={30} />
                                </TouchableOpacity>
                            </View>
                            
                            <View>
                                <TouchableOpacity onPress={this.navigateToGallary} style={styles.gallaryButton}> 
                                    <EntypoIcons name='folder-images' color="#ffffff" size={30} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end' ,alignSelf: 'center'}}>
                            <TouchableOpacity 
                                onPress={this.takePicture.bind(this)} >
                                <FontAwesomeIcons name="circle-o" color="#ffffff" size={100} />
                            </TouchableOpacity>
                    </View>

                </Camera>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    topButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    gallaryButton: {
        marginTop: 10,
        marginRight: 20
    },
    settingsButton: {
        marginTop: 10,
        marginLeft: 20
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