import { generateId} from "./ids";

export default class Board{
    id;
    title;
    items;

    constructor(title, items){
        this.id = generateId();
        this.title = title;
        // hacemos una copia de item con el operador de exparcimiento
        this.items = [...items];
    }

    getIndex(id){
        return this.items.findIndex(item => item.id == id);
    }

    // funcion que va a regresar el elemento de acuerdo al indice 
    get(indice){
        return this.items[index];
    }
    // para agregar elemento al final de un arreglo
    add(card){
        this.items.push(card);
    }

    // geter
    get lenght(){
        return
    }
}