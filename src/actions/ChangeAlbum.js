import {albumChanged} from './actionTypes'
console.log("Changing Album")
const ChangeAlbum = (AName) => {
    return {
        type: albumChanged,
        payload: AName,
    }    
};

export {ChangeAlbum};