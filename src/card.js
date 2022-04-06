//import la funcion generateId de ids.js

import {generateId} from "./ids.js";

export default class Card{
    id;
    title;

    constructor(title){
        this.title = title;
        // uso la funcion para asignarle un valor id irrepetible con la funcion
        this.id = generateId();
    }
    // va a devolver la estructura del html
    getHTML(board, boardIndex, index){
        const id = `card--${this.id}`;
        const dataid = `data-id="${id}"`;
    }
}