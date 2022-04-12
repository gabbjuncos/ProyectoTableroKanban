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

    // cada vez que se envie a renderizar hay que volver a llamar a los eventos
    enableNewCard();
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
// para crear una tarjeta cuando sea el evento de submit, prevenir que se submitee y mpoder manipular al informacion
// cuando le demos enter cuando se cree una tarjeta se va a ejecutar esta funcion
function enableNewCard(){
    document.querySelectorAll('.form-new').forEach(form => {
        // el eventos submit se activa cuando 
        form.addEventListener('submit', e => {
            e.preventDefault();

            const text = form.querySelector('.text').value;
            const card = new Card(text);
            // 
            const indexBoard = form.querySelector('.index-board').value;
            kanban.addCard(card, indexBoard);
            // cuando se tenga eso, se va a renderizar la intefaz 
        })
    });
}// en minuto 09 34