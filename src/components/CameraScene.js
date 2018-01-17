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
    Image,
    Slider
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toalbumsscene} from '../actions';
import {NavigationActions} from 'react-navigation';
import AlbumScene from './AlbumsScene';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FeatherAwesomeIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const landmarkSize = 2;

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

class CameraScene extends React.Component {
    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        ratios: [],
        photoId: 1,
        showGallery: false,
        photos: [],
        faces: [],
    };

    getRatios = async function() {
        const ratios = await this.camera.getSupportedRations();
        return rations;
    }

    toggleView() {
        console.log("sdf")
        this.setState({
            showGallery: !this.state.showGallery,
        });
    }

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    setRatio(ratio) {
        this.setState({
            ratio,
        });
    }

    toggleWB() {
        this.setState({
            whiteBalance: wbOrder[this.state.whiteBalance],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    takePicture = async function() {
        if (this.camera) {
            console.log("Pic Taken")
            this.camera.takePictureAsync().then(data => {
                console.log('data: ', data );
                const base64 = 'data:image/png;base64, ' + data
                console.log(base64);
                return <Image style={{ height: 200, width: 200 }} source={{uri: base64}} />
            });
        }
    };


    onFacesDetected = ({faces}) => {
        this.setState({faces})
        
    };
    onFaceDetectionError = state => console.warn('Faces detection error:', state);

    renderFace({bounds, faceID, rollAngle, yawAngle}) {
        return (
            <View 
                key={faceID}
                transform = {[
                    {perspective: 600},
                    //{rotateZ: '${rollAngle.toFixed(0)}deg'},
                    //{rotateY: '${yawAngle.toFixed(0)deg'},
                ]}
                style={[
                    styles.face,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
                >
                <Text style={styles.faceText}> ID: {faceID}</Text>
                {/*<Text style={styles.faceText}> rollAngle: {rollAngle.toFixed(0)}</Text>*/}
                {/*<Text style={styles.faceText}> yawAngle: {yawAngle.toFixed(0)}</Text>*/}
            </View>
        );
    }

    renderLandmarksOfFace(face) {
        const renderLandmark = position =>
        position && (
            <View
                style={[
                    styles.landmark,
                    {
                        left: position.x - landmarkSize / 2,
                        top: position.y - landmarksize / 2,
                    },
                ]}
            />
        );

        return (
            <View key={'landmarks-${face.faceID}'}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPoisition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
            </View>
        );
    }

    renderFaces() {
        return (
            <View style={styles.facesContainer} pointerEvents="none">
                {this.state.faces.map(this.renderFace)}
            </View>
        );
    }

    renderLandmarks() {
        return (
          <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderLandmarksOfFace)}
          </View>
        );
    }

    renderCamera() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                faceDetectionLandmarks={RNCamera.Constants.FaceDetection.all}
                onFacesDetected={this.onFacesDetected}
                onFaceDetectionError={this.onFaceDetectionError}
                focusDepth={this.state.depth}
            >
                <View
                    style={{
                        flex:0.5,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                    <Text style={styles.flipText}> FLIP </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                    <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                    <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
                </TouchableOpacity>
                </View>

                <View 
                    style={{
                        flex: 0.4,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                    }}
                    >
                    <Slider
                    style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
                    onValueChange={this.setFocusDepth.bind(this)}
                    step={0.1}
                    disabled={this.state.autoFocus === 'on'}/>
                </View>

                <View
                    style={{
                        flex: 0.1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                    }}
                >
                    <TouchableOpacity
                        style={[styles.flipButton, {flex: 0.1, alignSelf: 'flex-end'}]}
                        onPress = {this.zoomIn.bind(this)}
                        >
                        <Text style={styles.flipText} > + </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton,{flex: 0.1, alignSelf: 'flex-end' }]}
                        onPress={this.zoomOut.bind(this)}
                        >
                        <Text style={styles.flipText}> - </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton, styles.galleryButton, {flex: 0.25,alignSelf: 'flex-end'}]}
                        onPress = {this.takePicture.bind(this)/*this.toggleView.bind(this)*/}
                        >
                        <Text style={styles.flipText}> Gallery </Text>
                    </TouchableOpacity>
                </View>
                {this.renderFaces()}
                {this.renderLandmarks()}
            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
        //return (<View></View>)
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    navigation: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    item: {
        margin: 4,
        backgroundColor: 'indianred',
        height: 35,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    galleryButton: {
        backgroundColor: 'indianred',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    faces: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    landmar: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
    },
});


/*
class CameraScene extends Component {
    constructor() {
        super();
        this.state = {type: "back"}
    }

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

    changeCameraType() {
        if( this.state.type == "back") {
            this.setState({type: "front"});
        }
        else if( this.state.type == "front") {
            this.setState({type: "back"});
        }
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
                    type={this.state.type}
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
                    <View style={styles.buttonContainer}>
                        <View style={styles.bottomButtonsContainer}>

                            <View style={{}}>
                                <TouchableOpacity 
                                    onPress={this.changeCameraType.bind(this)} >
                                    <MaterialIcons name="switch-camera" color="#ffffff" size={100} />
                                </TouchableOpacity>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <TouchableOpacity 
                                    onPress={this.takePicture.bind(this)} >
                                    <FontAwesomeIcons name="circle-o" color="#ffffff" size={100} />
                                </TouchableOpacity>
                            </View>
                        </View>
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
    bottomButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
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
*/


function mapStateToProps(state) {
    return {
        Album: state.Album
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toalbumsscene}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(CameraScene);