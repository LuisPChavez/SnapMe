import {NavigationActions} from 'react-navigation'
import Navigator from "../navigation/navigationStack";
import { ToAlbumsScene, ToGalleryScene } from '../actions/actionTypes';



//const initialState  = Navigator.router.getStateForAction(NavigationActions.init())

//initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('albumScene'));

initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams("cameraScene"));


/*
const ActionForAlbumsScene = Navigator.router.getActionForPathAndParams(
    "albumsScene"
);

const ActionForGalleryScene = Navigator.router.getActionForPathAndParams(
    "galleryScene"
);



//const initialState = {stateForAlbumsScene}
//initialState = Navigator.router.getStateForAction(ActionForAlbumsScene,initialState)

const stateForAlbumsScene = Navigator.router.getStateForAction(NavigationActions.init());

const stateForGalleryScene = Navigator.router.getStateForAction(NavigationActions.init());
stateForGalleryScene = Navigator.router.getStateForAction(ActionForGalleryScene);

*/
const NavigationReducer = (state=initialState, action) => {
    const nextState = Navigator.router.getStateForAction(action,state);
    return nextState || state;
}


export default NavigationReducer;






