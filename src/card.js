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
        return `<div class="card" id="${id}" data-boardid = "board--${board.id}" draggable="true">
        <div class="card-wrapper" ${dataid}>
            <div class="title" ${dataid}>
                ${this.title}
            </div>
            <div class="option" ${dataid}>
                <button class="more-options" ${dataid}>...</button>
                <div class="submenu">
                    <ul>
                        <li><a href="#" class="card-submenu-edit" ${dataid} data-index="${index}" data-board-index = "${boardIndex}">Editar</a></li>
                        <li><a href="#" class="card-submenu-delete" ${dataid} data-index="${index}" data-board-index = "${boardIndex}" >Eliminar</a></li>
                    </ul>
                </div>
            </div>
        </div>
    <!-- para marcar el area donde se va a colocar la tarjeta cuando el usuario la esta moviendo-->
        <div class="placeholders" data-id="${id}" id = "${generateId()}"></div>
    </div>`;
    }
}