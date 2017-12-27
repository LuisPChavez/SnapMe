import React, {Component} from 'react'
import {CameraRoll, Image, Platform, PropTypes,ListView,View, ScrollView, Text} from 'react-native'


let PHOTOS_COUNT_BY_FETCH = 25;

class Testing extends Component{
    constructor() {
        super();

        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.lastPhotoFetched = undefined;
        //this.images;
        this.state = {photos: []};
        this.fetchPhotos();
        console.log(this.ds);
    }

    
    /*
    getDataSourceState(){
        return {
            dataSource: this.ds.cloneWithRows(this.images),
        };
    }*/
    

    fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
        CameraRoll.getPhotos({
            first: count,
            after,
        })
        .then(r => {
            this.setState( {photos: r.edges});
        }).catch((err) => {

        });
    };

    
    onEndReached() {
        this.fetchPhotos(PHOTOS_COUNT_BY_FETCH,this.lastPhotoFetched);
    }

    render() {
        return(
            <View style={styles.container}>
                {/*<ListView
                    contentContainerStyle={styles.imageGrid}
                    dataSource={this.state.dataSource}
                    //onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndication={false}
                    enableEmptySections={true}
                    renderRow={ (image) => {return (
                        <View>
                            <Image
                                style = {styles.image}
                                source={{uri:image.uri}}
                                />
                        </View>
                    )}}
                />*/}
                <ScrollView>
                    {this.state.photos.map((p,i) => {
                        return (
                            <Image
                                key={i}
                                style={{
                                    width: 300,
                                    height: 100,
                                }}
                                source={{uri: p.node.image.uri}}
                                />
                            );
                        })}
                </ScrollView>
            </View>
        );
    }
}



const styles={
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
    },
}

export default Testing