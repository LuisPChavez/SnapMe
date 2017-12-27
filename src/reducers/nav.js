import {NavigationActions} from 'react-navigation'
import Navigator from "../navigation/navigationStack";
import { ToAlbumsScene, ToGalleryScene } from '../actions/actionTypes';



//const initialState  = Navigator.router.getStateForAction(NavigationActions.init())

//initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('albumScene'));

initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams("cameraScene"));

const NavigationReducer = (state=initialState, action) => {
    const nextState = Navigator.router.getStateForAction(action,state);
    return nextState || state;
}


export default NavigationReducer;






