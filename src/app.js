import Board from "./board.js";
import Card from "./card.js";
import Kanban from "./kanban.js";

let dropOk = false;

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

    // eventos de drag and drop
    enableDragAndDropEvents();
}

function addBoard(e){
    //cuadro emergente de google chorme
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
            renderUI();
        })
    });
    configureSubmenus();
}

function configureSubmenus(){

    const moreButtons = document.querySelectorAll('.more-options');
    moreButtons.forEach(button => {
        // llama a la funcion showMoreOptions
        button.addEventListener('click', showMoreOptions);
    })

    // referencia a cada uno de estos botones
    const editBoardButton = document.querySelectorAll('.board-submenu-edit');
    const deleteBoardButton = document.querySelectorAll('.board-submenu-delete');
    const editCardButton = document.querySelectorAll('.card-submenu-edit');
    const deleteCardButton = document.querySelectorAll('.card-submenu-delete');

    // botones con los respectivos eventos

    editBoardButton.forEach(button =>{
        button.addEventListener('click', editBoard);
    })

    deleteBoardButton.forEach(button =>{
        button.addEventListener('click', deleteBoard);
    })

    editCardButton.forEach(button =>{
        button.addEventListener('click', editCard);
    })

    deleteCardButton.forEach(button =>{
        button.addEventListener('click', deleteCard);
    })

    // defino los callbacks
    function editBoard(e){
        const id =  e.target.getAttribute('data-id');
        const index =  e.target.getAttribute('data-index');
        const currentTitle =  kanban.getBoard(index).title;
        const title = prompt('New title', currentTitle);
        if(title){
            kanban.updateBoard(id,index, title);
            renderUI();
        }
    }

    function deleteBoard(e){
        const index =  e.target.getAttribute('data-index');
        kanban.removeBoard(index);
        renderUI()
    }

    function editCard(e){
        const indexCard =  e.target.getAttribute('data-index');
        const indexBoard =  e.target.getAttribute('data-board-index');
        const currentTitle =  kanban.getBoard(indexBoard).get(indexCard).title;

        const title = prompt('New title', currentTitle);
        if(title){
            kanban.updateCard(indexBoard, indexCard, title);
            renderUI();
        }
    }

    function deleteCard(e){
        const indexCard =  e.target.getAttribute('data-index');
        const indexBoard =  e.target.getAttribute('data-board-index');

        kanban.removeCard(indexBoard, indexCard);
        renderUI();

    }
}


function showMoreOptions(e){
    // toma la capa hermana
    const submenu = e.target.nextElementSibling;
    // lo que hace es tomar una clase y sino existe la deja
    submenu.classList.toggle('submenu-active');
}

// para ocultar el boton eliminar y editar de una tarjeta o tablero
// se lo agrega al objeto global window

window.addEventListener('click',e =>{
    if(!e.target.matches('.more-options')){
        const menus = Array.from(document.querySelectorAll('.submenu-active'));
        menus.forEach(menu => {
            if(menu.classList.contains('submenu-active')){
                //aca no usa toggle por si existe se quiere quitar, y si no exite no pasa nada
                menu.classList.remove('submenu-active');
            }
        })
    }
})

// DRAG AND DROP

// se define objeto literal para clases para centralizar el nombre de la clase
const classes = {
    //son clases que estan en el css
    //para ocultar
    hide:'hide',
    placeholder: 'placeholder',
    active: 'placeholder-active'
}

function enableDragAndDropEvents(){
    // 2 partes para los eventos una para los tablero y otro para las tarjetas

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart);
        card.addEventListener('dragend', dragend);
    });

    const boards = document.querySelectorAll('.board');
    boards.forEach(board =>{
        //cuando entre al tablero
        board.addEventListener('dragenter',dragenter);
        board.addEventListener('dragover',dragover);
        board.addEventListener('dragleave',dragleave);
        board.addEventListener('drop',drop);

    } )
}

function dragstart(e){
    const boardId = e.target.getAttribute('data-boardid');
    const cardId = e.target.id;
    //cuando sea haga el drag and drop se vaya esa info
    e.dataTransfer.setData('text/plain', JSON.stringify({boardId,cardId}));
    e.target.classList.add(classes.hide);
}

function dragend(e){
    e.target.classList.remove(classes.hide);
}

function dragenter(e){
    // para que permita hacer drag and drop
    e.preventDefault();
    const item = e.target;
    dropOk = true;

    if(item.classList.contains(classes.placeholder)){
        item.classList.add(classes.active);
    }
}

function dragover(e){
    e.preventDefault();
    const item = e.target;
    if(item.classList.contains(classes.placeholder) || item.classList.contains('board')){
        item.classList.add(classes.active);

    }else if(item.getAttribute('data-id') != undefined){
        const id = item.getAttribute('data-id');
        document.querySelector('#' + id).querySelector('.placeholder').classList.add(classes.active)
    }
}

function dragleave(e){
    //e.target.classList.remove(classes.active);
    // a cada estilo le voy a quitar clases .active
    document.querySelector('.' + classes.active).forEach(style => style.classList.remove(classes.active));
}   

function drop(e){

    let target, id;
    // se valida si existe el data id
    // si no existe quiere decir que estoy agregando el drop al tablro
    if(e.target.getAttribute('data-id') == undefined){
        target = e.target;
    }else{
        // si existe quiere decir que estoy agregando sobre la tarjeta
        id = e.target.getAttribute('data-id');
        target = document.querySelector('#' + id);
    }

    // si es falso la variable quiere decir que estoy en un area no valida
    // el dropOk la modificamos uando la funcion drop enter cuando estabamos en una zona
    if(!dropOk){
        return false;
    }

    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const draggable = document.querySelector('#' + data.cardId);

    let targetBoardId, targetCardId;

    if(target.classList.contains('card')){
        targetBoardId = target.parentElement.parentElement.id;
        console.log(targetBoardId);

        target.CardId = target.id;

        target.insertAdjacentElement('afterend', draggable);
    }
    // si soltamos la tarjeta no hay un id de la tarjeta
    else if(target.classList.contains('board')){
        targetBoardId = target.id;
        targetCardId = undefined;
        //para que se agregue al final de la tarjeta
        target.querySelector('.items').appendChild(draggable);
    }

    // para actualizar los datos
    // es decir que lo que ve en la interfaz se corresponda con los datos del objeto KANBAN
    // estoy seria para soltar el elemento en un lugar no valido
    if(!targetCardId && !targetBoardId){
        return false;
    }

    targetBoardId = targetBoardId.split('--')[1];
    targetCardId = targetCardId?.split('--')[1] ?? -1;
    data.cardId = data.cardId.split('--')[1];
    data.boardId = data.boardId.split('--')[1];

    const indexBoardSrc = kanban.getIndex(data.boardId);
    // para obtener el indice
    const indexBoardTarget = kanban.getIndex(targetBoardId);
    const indexCardSrc = kanban.getBoard(indexBoardSrc).getIndex(data.cardId);
    // verificar que devuelva -1
    // con esta se tienen los indeces tanto del inicio como del finlal de la targeta
    const indexCardTarget = (targetCardId === -1)? kanban.getBoard(indexBoardTarget).length : kanban.getBoard(indexBoardTarget).getIndex(targetCardId)

    kanban.moveCard(indexBoardSrc, indexCardSrc, indexBoardTarget, indexCardTarget);
    draggable.classList.remove(classes.hide);
    renderUI();
}

