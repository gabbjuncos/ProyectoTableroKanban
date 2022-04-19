import {generateId} from "./ids.js";

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
        return this.items[indice];
    }
    // para agregar elemento al final de un arreglo
    add(card){
        this.items.push(card);
    }

    // geter
    get lenght(){
        return this.items.length;
    }

    getHTML(boardIndex, cards){
        return `<div class="board" id="board--${this.id}">
        <div class="header">
            <div class="title">
            ${this.title}
            </div>
    
            <div class="options">
                <button class="more-options"> ... </button>
                <div class="submenu">
                    <ul>
                        <li><a href="#" class="board-submenu-edit" data-id="${this.id}" data-index="${boardIndex}">Edit</a></li>
                        <li><a href="#" class="board-submenu-delete" data-id="${this.id}" data-index="${boardIndex}">Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    
        <div class="items">
        ${cards.join('')}
        </div>
    
        <div class="new-item">
            <form action="#" class="form-new">
                <input type="text" class = "new-input text" placeholder="+ Add another card" name="" id=""></input>
                <input type="hidden" class = "index-board" name="" value= "${boardIndex}"></input>
    
            </form>
        </div>
    
    </div>`

    }
}