import React, { Component } from 'React';
import {Text, View } from 'react-native';
import GallaryScene from './GallaryScene';
import Header from './Header';
import Button from './Button';

const AlbumsScene = () => {

    albums = [];

    return (
        <View>
            <View>
                <Header headerText={"Albums"} />
            </View>
            <View style={styles.containerStyle}>
                <Button buttonText={"Album Name"} />
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export default AlbumsScene;
