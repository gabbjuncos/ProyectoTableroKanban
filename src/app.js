import Board from "./board.js";
import Card from "./card.js";
import Kanban from "./kanban.js";

const kanban = new Kanban();

const card01 = new Card('Tarea 1');
const card02 = new Card('Tarea 2');
const card03 = new Card('Tarea 3');
const card04 = new Card('Tarea 4');
const card05 = new Card('Tarea 5');
const card06 = new Card('Tarea 6');

const board01 = new Board('TODAS', [card01, card02]);
const board02 = new Board('EN PROGRESO', [card03, card04]);
const board03 = new Board('TERMINADA', [card05, card06]);

kanban.add(board01);
kanban.add(board02);
kanban.add(board03);

console.log(kanban);

const container =  document.querySelector('#container');
const newBoardButton = document.querySelector('#new-board-button');

newBoardButton.addEventListener('click', addBoard);

renderUI();

function renderUI(){

    const boardsHTML = kanban.boards.map((board, boardIndex) => {
        const cardsHTML = board.items.map((card,index) => {
            return card.getHTML(board, boardIndex, index);
        })
        return board.getHTML(boardIndex, cardsHTML);
    });

    container.innerHTML = boardsHTML.join('');
}

function addBoard(e){
    const name = prompt('Name of board')
    // si name existe
    if(name){
        const board = new Board(name, [])
        kanban.add(board);
        // se refresca la interfaz grafica
        renderUI();
    }
}