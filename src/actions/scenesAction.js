import {ToAlbumsScene,ToGalleryScene} from './actionTypes'


const toalbumsscene = () => ({
    type: ToAlbumsScene
});

const togalleryscene = () => ({
    type: ToGalleryScene
})

const tooptionsscene = () => ({
    type: ToOptionsScene
})

export {toalbumsscene,togalleryscene,tooptionsscene};