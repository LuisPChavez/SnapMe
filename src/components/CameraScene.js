import React, { Component } from 'React';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    CameraRoll
} from 'react-native';
import Camera from 'react-native-camera';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ChangeAlbum} from '../actions'


class CameraScene extends Component {
    static navigationOptions = {
        title: "CameraScene"
    };
    
    render(){
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    >
                    
                </Camera>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
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
    return bindActionCreators({ChangeAlbum: ChangeAlbum}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(CameraScene);