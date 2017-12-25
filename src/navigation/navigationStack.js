import {StackNavigator} from "react-navigation"

import {AlbumsScene,GalleryScene} from '../components'

const Navigator = StackNavigator({
    albumScene: {
        screen: AlbumsScene
    },
    galleryScene: {
        screen: GalleryScene
    }
});


export default Navigator;