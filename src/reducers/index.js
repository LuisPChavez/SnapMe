import {combineReducers} from 'redux';
import ActiveAlbum from './ActiveAlbumReducer';
import Pictures from './PicturesReducer';



export default combineReducers({
    Album: ActiveAlbum, 
});


