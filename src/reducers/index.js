import {combineReducers} from 'redux';
import ActiveAlbum from './ActiveAlbumReducer';
import Pictures from './PicturesReducer';
import NavigationReducer from './nav';


export default combineReducers({
    Album: ActiveAlbum,
    NavigationReducer, 
});


