ActiveAlbum = (state=null,action) => {

    if (action.type != "Navigation/NAVIGATE") {
        switch(action.type){
            case "ALBUM_CHANGED": {
                Val = action.payload;
                break;
            }
            default : {
                Val = "ALL";
                break;
            }
        }
    }

    return {AlbumName: Val}
}

//picture
//active album


export default ActiveAlbum;