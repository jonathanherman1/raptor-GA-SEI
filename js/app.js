/*--------- Imports ---------*/
import * as State from "./modules/gameData/state.js"
import * as Renderer from "./modules/render.js";
import * as GameText from "./modules/gameData/gameText.js";

/*--------- Variables ---------*/

let gameActive, players, teams, board, cards, rounds, numActionPoints, actionsTaken;


/*--------- Cached HTML References ---------*/
const mainContent = document.querySelector("#main-content");
const newGameFormEl = document.querySelector("#new-game-form");

/*--------- Event Listeners ---------*/
mainContent.addEventListener("click", handleNewGame);
mainContent.addEventListener("click", handleNext);
mainContent.addEventListener("click", handleReadytoPlay);
mainContent.addEventListener("click", handlePickTeam);

/*--------- Functions ---------*/

function init(name1, name2){    
    // Copy `cards`   to `cards`
    // Copy `rounds` to `rounds`
    gameActive = true;
    players = [
        {name: name1, team: null, teamId: null, activePlayer: null},
        {name: name2, team: null, teamId: null, activePlayer: null}
    ]
    teams = [
        {
            name: "Raptors",
            id: 0,
            pieces: [
                {id: 1, health: 5, awake: true, mother: true, location: null},
                {id: 2, health: 1, awake: true, mother: false, location: null},
                {id: 3, health: 1, awake: true, mother: false, location: null},
                {id: 4, health: 1, awake: true, mother: false, location: null},
                {id: 5, health: 1, awake: true, mother: false, location: null},
                {id: 6, health: 1, awake: true, mother: false, location: null},
            ]
        },
        {
            name: "Scientists",
            id: 1,
            pieces: [
                {id: 1, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 2, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 3, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 4, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 5, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 6, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 7, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 8, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 9, health: 1, awake: true, aggressiveActionTaken: false, location: null},
                {id: 10, health: 1, awake: true, aggressiveActionTaken: false, location: null}
            ]
        }
    ]
    board = State.createBoard();
    cards = State.createCards();
    console.log(cards);
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

function handlePickTeam(e){
    e.preventDefault();
    if(e.target.id === "play-raptors-btn" || e.target.id === "play-scientists-btn"){
        const player1 = players[0];
        const player2 = players[1];
        const raptors = teams[0];
        const scientists = teams[1];
        const pickTeamsEl = document.querySelector("#pick-teams");
        if(player1.team === null){
            player1.team = e.target.value;
            player1.team === raptors.name ? player1.teamId = raptors.id : player1.teamId = scientists.id;
        }
        if(player1.team === raptors.name) {
            player2.team = scientists.name
            player2.teamId = scientists.id
        } else {
            player2.team = raptors.name;
            player2.teamId = raptors.id;
        }       
        Renderer.renderRemove(mainContent, pickTeamsEl);
        mainContent.removeEventListener("click", handlePickTeam);
        Renderer.renderTeamChoices(mainContent, players);
        
    }
}

/*--------- Main ---------*/