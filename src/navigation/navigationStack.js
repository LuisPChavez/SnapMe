import {StackNavigator} from "react-navigation"

import {AlbumsScene,GalleryScene,CameraScene,OptionsScene} from '../components'

const Navigator = StackNavigator({
    albumScene: {
        screen: AlbumsScene
    },
    galleryScene: {
        screen: GalleryScene
    },
    cameraScene: {
        screen: CameraScene
    },
    optionsScene: {
        screen: OptionsScene
    }
});


export default Navigator;