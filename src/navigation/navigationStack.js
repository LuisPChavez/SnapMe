import {StackNavigator} from "react-navigation"

import {AlbumsScene,GalleryScene,CameraScene} from '../components'

const Navigator = StackNavigator({
    albumScene: {
        screen: AlbumsScene
    },
    galleryScene: {
        screen: GalleryScene
    },
    cameraScene: {
        screen: CameraScene
    }
});


export default Navigator;