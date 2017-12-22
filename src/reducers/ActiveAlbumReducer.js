ActiveAlbum = (state=null,action) => {
    Val = 'All'
    
    switch(action.type) {
        case "ALBUM_CHANGED":
            Val = action.payload;
            break;
        default :
            Val = 'All'
        
    }
    
    return {AlbumName: Val}
}

//picture
//active album


export default ActiveAlbum;