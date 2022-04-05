//import la funcion generateId de ids.js

import { generateId } from "./ids";

export default class Card{
    id;
    title;

    constructor(title){
        this.title = title;
        // uso la funcion para asignarle un valor id irrepetible con la funcion
        this.id = generateId();
    }
}