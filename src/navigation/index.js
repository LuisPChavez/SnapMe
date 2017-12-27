import React, {Component} from "React";
import {BackHandler} from "react-native";
import {connect} from "react-redux";
import {addNavigationHelpers, NavigationActions} from "react-navigation"
import NavigationStack from "./navigationStack"


class AppNavigation extends Component {
    
    componentDidMount(){
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
