/*--------- Imports ---------*/
import * as Renderer from './render.js';

/*--------- Variables ---------*/

let gameActive, board, activePlayer, numActionPoints, actionsTaken
let players = [];

/*--------- Cached HTML References ---------*/
const mainContent = document.querySelector('#main-content');
const newGameForm = document.querySelector('#new-game-form');

/*--------- Event Listeners ---------*/
newGameForm.addEventListener('click', handleNewGame);

/*--------- Functions ---------*/

function init(name1, name2){
    console.log("hello world")
    // 1.  Copy `players` to `players`
    // 2.  Copy `board`   to `board`
    // 3.  Copy `teams`   to `teams`
    // 4.  Copy `cards`   to `cards`
    // 5.  Copy `rounds` to `rounds`
    // 6.  Update player names
    players = [
        {name: name1, team: null},
        {name: name2, team: null}
    ]
}

function handleNewGame(e){
    e.preventDefault();
    if(e.target.id === 'new-game-btn'){
        let name1 = e.target.parentNode[0].value;
        let name2 = e.target.parentNode[1].value;
        init(name1, name2);
        Renderer.renderRemove(mainContent, newGameForm);
    }
    // renderRemove() elements from screen
    // render next screen
}

/*--------- Main ---------*/