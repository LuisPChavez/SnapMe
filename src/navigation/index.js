import React, {Component} from "React";
import {BackHandler, StatusBar} from "react-native";
import {connect} from "react-redux";
import {addNavigationHelpers, NavigationActions} from "react-navigation"
import NavigationStack from "./navigationStack"


class AppNavigation extends Component {
    
    componentDidMount(){
        StatusBar.setHidden(true);
        BackHandler.addEventListener("hardwareBackPress",this.onBackPress);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress",this.onBackPress);
    }


    onBackPress = () => {
        const { dispatch, navigationState } = this.props;
        if (navigationState.index === 0) {
          return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }

    static navigationOptions = {
        header: {
            visible: false,
        }
    };
    
    
    render() {
        const {navigationState, dispatch} = this.props;
        //console.log(navigationState)
        return(
            <NavigationStack
                navigation={addNavigationHelpers({dispatch,state: navigationState})}
            />
        );
    }
}



const mapStateToProps = state => {
    return {
        navigationState: state.NavigationReducer
    };
};



export default connect(mapStateToProps)(AppNavigation);
