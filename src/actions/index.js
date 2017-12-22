const changeAlbum = (AName) => {
    console.log("User Changed Album to: ",AName);
    return {
        type: "ALBUM_CHANGED",
        payload: AName,
    }    
};

export default changeAlbum;