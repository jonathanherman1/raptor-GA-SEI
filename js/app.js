/*--------- Imports ---------*/
import * as Renderer from './modules/render.js';
import * as GameText from './modules/gameData/gameText.js';

/*--------- Variables ---------*/

let gameActive, board, activePlayer, numActionPoints, actionsTaken
let players = [];

/*--------- Cached HTML References ---------*/
const mainContent = document.querySelector("#main-content");
const newGameFormEl = document.querySelector("#new-game-form");

/*--------- Event Listeners ---------*/
mainContent.addEventListener("click", handleNewGame);
mainContent.addEventListener("click", handleNext);
mainContent.addEventListener("click", handleReadytoPlay);

/*--------- Functions ---------*/

function init(name1, name2){
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
    if(e.target.id === "new-game-btn"){
        let name1 = e.target.parentNode[0].value;
        let name2 = e.target.parentNode[1].value;
        init(name1, name2);
        Renderer.renderRemove(mainContent, newGameFormEl);
        Renderer.renderIntro(mainContent, GameText.introContent);
        mainContent.removeEventListener("click", handleNewGame);
    }
}

function handleNext(e){
    e.preventDefault();
    if(e.target.id === "next-btn"){
        const introEl = document.querySelector('#intro');
        Renderer.renderRemove(mainContent, introEl);
        Renderer.renderHowToPlay(mainContent, GameText.howToPlayContent);
        mainContent.removeEventListener("click", handleNext);
    }
}

function handleReadytoPlay(e){
    e.preventDefault();
    if(e.target.id === "ready-btn"){
        const howToPlayEl = document.querySelector('#how-to-play');
        Renderer.renderRemove(mainContent, howToPlayEl);
        Renderer.renderPickTeams(mainContent, GameText.pickTeamsContent);
        mainContent.removeEventListener("click", handleReadytoPlay);
    }
}

/*--------- Main ---------*/