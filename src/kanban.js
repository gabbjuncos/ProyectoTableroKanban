import Board from "./board.js";
import Card from "./card.js";

export default class Kanban{
    boards;

    constructor(){
        this.boards = [];
    }

    add(board){
        this.boards.push(board);
    }

    // para agregar tarjeta al tablero
    addCard(card, indexBoard){
        this.getBoard(indexBoard).add(card);
    }

    getBoard(index){
        return this.boards[index];
    }

    getIndex(id){
        return this.boards.findIndex(board => board.id == id);
    }

    removeCard(indexBoard, indexCard){
        //splice para eliminar elemento de un arreglo en una determinada posicion, 
        //devuelve un arreglo de elementos eliminados y con el [0] ledigo que devuelva el unico elemento que va a tener

        const card = this.getBoard(indexBoard).items.splice(indexCard, 1);
    }

    //con el metodo splice tambien se inserta, digo en el segundo parametro cuantos elementos
    //borrar, y en el tercero  donde agregar, index+1 digo para agregar al ultimo 
    insertCard(card, indexBoard, indexCard){
        this.getBoard(indexBoard).items.splice(indexCard + 1, 0, card);
    }
    // metodo para mover una tarjeta de un tablero, la elimina del tablero origen y la agrega al tablero destino
    moveCard(indexBoardSrc, indexCardSrc, indexBoardTarget, indexCardTarget){
        const srcCard = this.removeCard(indexBoardTarget, indexCardSrc);
        this.insertCard(srcCard, indexBoardTarget, indexCardTarget);
    }

    // para actualizar tablero
    updateBoard(id, index, title){
        this.getBoard(index).title = title;
    }
    // eliminar tablero
    removeBoard(index){
        const id = this.boards[index].id;
        this.boards.splice(index,1);
    }

    updateCard(indexBoard, indexCard, title){
        const card = this.boards[indexBoard].items[indexCard];
        card.title = title;
    }
}

