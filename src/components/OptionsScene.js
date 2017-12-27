import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from './Header'
import ButtonWithSwitch from './ButtonWithSwitch'


class OptionsScene extends Component {

    static navigationOptions = {
        title: "optionsScene"
    };

    render() {
        return(
            <View>
                <Header headerText={"Options"} />
                <ButtonWithSwitch buttonText={"Test"} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        //All Options here
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({/* Options here,togalleryscene*/}, dispatch);
    //const act = bindActionCreators({ChangeAlbum: ChangeAlbum}, dispatch)
    //console.log(bindActionCreators({ChangeAlbum: ChangeAlbum}, dispatch))
    
    /*console.log(act)
    return {
        togalleryscene,
        act
    };*/

}
export default connect(mapStateToProps,matchDispatchToProps)(OptionsScene);
