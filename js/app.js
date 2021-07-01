/*--------- Imports ---------*/
import * as State from "./modules/gameData/state.js"
import * as Renderer from "./modules/render.js";
import * as GameText from "./modules/gameData/gameText.js";
import * as Valid from "./modules/validity.js";
import { contains, getRandomIntNotIncl} from "./modules/helpers.js";

/*--------- Variables ---------*/

let gameActive, setupComplete, players, teams, pieces, board, cards, raptorCards, raptorDiscardPile, scientistCards, scientistDiscardPile, rounds, currentRound, temporaryCardChoice, victoryStatus, killBtn, captureBtn, healBtn, shootBtn, boardEl;

let selected = null;
let selectedId = null;

let darkMode = false;

// touch variables
let initialX, initialY, currentX, currentY, xEnter, yEnter, active, dragItem, dropZone, boardStartId, boardEndId;
let xOffset = 0;
let yOffset = 0;
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

/*--------- Cached HTML References ---------*/
const mainContent = document.querySelector("#main-content");
const newGameFormEl = document.querySelector("#new-game-form");
const darkModeToggle = document.querySelector("#toggle-dark-mode");

/*--------- Event Listeners ---------*/
// Game walkthrough
// Make new game
mainContent.addEventListener("click", handleNewGame);
// render how to play
mainContent.addEventListener("click", handleNext);
// render teams
mainContent.addEventListener("click", handleReadytoPlay);
// pick teams and render choices
mainContent.addEventListener("click", handlePickTeam);
// render play button to load board and setup
mainContent.addEventListener("click", handlePlay);
// load scientist placement
mainContent.addEventListener("click", handleConfirmRaptorPlacement);
// remove scientist instructions and launch first round
mainContent.addEventListener("click", handleConfirmScientistPlacement);
// render raptor playing cards and confirm choice
mainContent.addEventListener("click", handleRaptorPickCard);
// render scientist playing cards and confirm choice
mainContent.addEventListener("click", handleScientistPickCard);
// Touch Events
mainContent.addEventListener("touchstart", handleTouchStart);
mainContent.addEventListener("touchmove", handleTouchMove);
mainContent.addEventListener("touchend", handleTouchEnd);
// Mouse Events
// mainContent.addEventListener("dragstart", handleDragStart);
// mainContent.addEventListener("dragenter", handleDragEnter);
// mainContent.addEventListener("dragleave", handleDragLeave);
// mainContent.addEventListener("drop", handleDrop);
// mainContent.addEventListener("dragend", handleDragEnd);

// Dark Mode
darkModeToggle.addEventListener("click", handleDarkModeToggle);


/*--------- Functions ---------*/

function init(name1, name2){
    gameActive = true;
    players = [
        {name: name1, team: null, teamId: null, activePlayer: null},
        {name: name2, team: null, teamId: null, activePlayer: null}
    ]
    teams = [
        {name: "Raptors", id: 0},
        {name: "Scientists", id: 1}
    ]
    pieces = [
        {id: "mother-raptor-1", health: 5, unobstructedOrthogonalRangeX: 6, unobstructedOrthogonalRangeY: 11, awake: true, mother: true, location: null, team: "Raptors", teamId: 0},
        {id: "baby-raptor-1", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, awake: true, mother: false, location: null, team: "Raptors", teamId: 0},
        {id: "baby-raptor-2", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, awake: true, mother: false, location: null, team: "Raptors", teamId: 0},
        {id: "baby-raptor-3", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, awake: true, mother: false, location: null, team: "Raptors", teamId: 0},
        {id: "baby-raptor-4", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, awake: true, mother: false, location: null, team: "Raptors", teamId: 0},
        {id: "baby-raptor-5", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, awake: true, mother: false, location: null, team: "Raptors", teamId: 0},
        {id: "scientist-1", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-2", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-3", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-4", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-5", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-6", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-7", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-8", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-9", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1},
        {id: "scientist-10", health: 1, unobstructedOrthogonalRangeX: 1, unobstructedOrthogonalRangeY: 1, shootingRange: null, jeepRangeX: null, jeepRangeY: null, awake: true, aggressiveActionTaken: false, location: null, team: "Scientists", teamId: 1}
    ]
    board = State.createBoard();
    cards = State.createCards();
    raptorCards = cards.filter(card => card.team === "Raptors");
    scientistCards = cards.filter(card => card.team === "Scientists");
    raptorDiscardPile = [];
    scientistDiscardPile = [];
    temporaryCardChoice = null;
    rounds = [];
    let round = State.createRound(1);
    currentRound = 1;
    rounds.push(round);
    State.addCardsToHand("raptors", raptorCards, 3, rounds, 1);
    State.addCardsToHand("scientists", scientistCards, 3, rounds, 1);
    victoryStatus = [
        {
            team: "Raptors",
            victory: false,
            numRaptorsEscaped: 0,
            numScientistsOnBoard: 4
        },
        {
            team: "Scientists",
            victory: false,
            numRaptorsCaptured: 0,
            numHitsOnMother: 0,
            motherPutToSleep: false
        }
    ];
    
}

function handleNewGame(e){
    e.preventDefault();
    if(e.target.id === "new-game-btn"){
        let name1 = e.target.parentNode.parentNode[0].value;
        let name2 = e.target.parentNode.parentNode[1].value;
        init(name1, name2);
        Renderer.renderRemove(mainContent, newGameFormEl);
        if(darkMode === true){
            Renderer.renderAddClass("body", "dark-intro");
        } else {
            Renderer.renderAddClass("body", "bg-img-intro");
        }
        
        Renderer.renderIntro(mainContent, GameText.introContent);
        mainContent.removeEventListener("click", handleNewGame);
    }
}

function handleNext(e){
    e.preventDefault();
    if(e.target.id === "next-btn"){
        const introEl = document.querySelector('#intro');
        Renderer.renderRemove(mainContent, introEl);
        if(darkMode === true){
            Renderer.renderRemoveClass("body", "dark-intro");
            Renderer.renderAddClass("body", "dark-how-to-play");
        } else {
            Renderer.renderRemoveClass("body", "bg-img-intro");
            Renderer.renderAddClass("body", "bg-img-how-to-play");
        }
        
        Renderer.renderHowToPlay(mainContent, GameText.howToPlayContent);
        mainContent.removeEventListener("click", handleNext);
    }
}

function handleReadytoPlay(e){
    e.preventDefault();
    if(e.target.id === "ready-btn"){
        const howToPlayEl = document.querySelector('#how-to-play');
        Renderer.renderRemove(mainContent, howToPlayEl);
        if(darkMode === true){
            Renderer.renderRemoveClass("body", "dark-how-to-play");
            Renderer.renderAddClass("body", "dark-pick-teams");
        } else {
            Renderer.renderRemoveClass("body", "bg-img-how-to-play");
            Renderer.renderAddClass("body", "bg-img-pick-teams");
        }
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

function handlePlay(e){
    e.preventDefault();
    if(e.target.id === "play-btn"){
        const teamChoicesEl = document.querySelector("#team-choices");
        Renderer.renderRemove(mainContent, teamChoicesEl);


        Renderer.renderRemoveClass("body", "bg-img-pick-teams");
        Renderer.renderAddClass("body", "bg-img-play");

        Renderer.renderBoard(mainContent, board);

        boardEl = document.querySelector(".board");
        boardEl.addEventListener("click", handleBoardSelections);

        if(darkMode === true){
            boardEl.children[1].classList.remove("middle");
            boardEl.children[1].classList.add("dark-middle");
        } else {
            boardEl.children[1].classList.remove("dark-middle");
            boardEl.children[1].classList.add("middle");
        }
    

        const gameTray = document.createElement("section");
        gameTray.setAttribute("id", "game-tray");
        const instructions = document.createElement("div");
        instructions.setAttribute("id", "instructions");
        const piecesTray = document.createElement("div");
        piecesTray.setAttribute("id", "pieces-tray");
        
        gameTray.appendChild(instructions);
        gameTray.appendChild(piecesTray);

        mainContent.insertBefore(gameTray, boardEl);
        // set up raptors
        let setup = Renderer.renderSetupInfo(GameText.setupInfoContent, 0);
        setup.forEach(el => {
            if(el.length === undefined){
                instructions.appendChild(el);
            } else {
                el.forEach(arrEl => {
                    piecesTray.appendChild(arrEl);
                })
            }
        })
        
        Renderer.renderButton(gameTray, GameText.setupInfoContent[0]);
        
    }
}

function handleConfirmRaptorPlacement(e){
    e.preventDefault();
    if(e.target.id === "confirm-raptor-placement-btn"){
        // remove raptor instructions
        const gameTray = document.querySelector("#game-tray");
        const instructions = document.querySelector("#instructions");
        const raptorHeader = document.querySelector("#h4-raptor-turn");
        const raptorText = document.querySelector("#p-raptor-text");
        const raptorButtonDiv = document.querySelector("#button-div");
        instructions.removeChild(raptorHeader);
        instructions.removeChild(raptorText);
        gameTray.removeChild(raptorButtonDiv);
        const piecesTray = document.querySelector("#pieces-tray");
        // add scientist setup
        let setup = Renderer.renderSetupInfo(GameText.setupInfoContent, 1);
        setup.forEach(el => {
            if(el.length === undefined){
                instructions.appendChild(el);
            } else {
                el.forEach(arrEl => {
                    // console.log(arrEl);
                    piecesTray.appendChild(arrEl);
                })
            }
        })
        Renderer.renderButton(gameTray, GameText.setupInfoContent[1]);
    }
}

function handleConfirmScientistPlacement(e){
    e.preventDefault();
    if(e.target.id === "confirm-scientist-placement-btn"){
        // remove scientist instructions
        const gameTray = document.querySelector("#game-tray");
        const instructions = document.querySelector("#instructions");
        const scientistHeader = document.querySelector("#h4-scientist-turn");
        const scientistText = document.querySelector("#p-scientist-text");
        const scientistButtonDiv = document.querySelector("#button-div");
        instructions.removeChild(scientistHeader);
        instructions.removeChild(scientistText);
        gameTray.removeChild(scientistButtonDiv);

        setupComplete = true;
        Renderer.renderOffcanvasEl(mainContent);
        let cardDisplayOffcanvas = document.querySelector("#card-display");
        let cardDisplayInstructions = document.querySelector("#card-display-instructions");
        Renderer.renderCards(cardDisplayOffcanvas, rounds[currentRound-1].raptorHand);
        Renderer.renderCardChoiceInstructions(cardDisplayInstructions, GameText.cardChoiceContent, 0);
    }
}

function handleRaptorPickCard(e){
    e.preventDefault();
    let t;
    if(contains(e.target.id, "raptor-card") && e.target.tagName !== "BUTTON"){
        t = e.target;
    } else if(contains(e.target.parentElement.id, "raptor-card") && e.target.tagName !== "BUTTON"){
        t = e.target.parentElement;
    } else {
        t = null;
    }

    if(t){
        Renderer.renderCardSelectionOnOff(t.id);
        let raptorHand = rounds[currentRound-1].raptorHand;
        if(temporaryCardChoice === null){
            for(let card of raptorHand){
                if(card.id === t.id) {
                    temporaryCardChoice = card;
                    console.log(temporaryCardChoice);
                    break;
                }
            }
        } else {
            temporaryCardChoice = null;
        }
    }
    // swap raptor info with scientist info once card choice confirmed
    let raptorHeader = document.querySelector("#h4-raptor-turn");
    let raptorText = document.querySelector("#p-raptor-text");
    let buttonDiv = document.querySelector("#button-div");
    let cardDisplay = document.querySelector("#card-display");
    let confirmButton = document.querySelector("#confirm-raptor-card-btn");
    if(e.target === confirmButton){
        console.log("temp card choice: ", temporaryCardChoice);
        // save raptor choice in state
        rounds[currentRound-1].raptorCardChoice = temporaryCardChoice;
        let hand = rounds[currentRound-1].raptorHand;
        State.removeCardFromArray(raptorCards, hand, temporaryCardChoice);
        console.log("currentRound", currentRound);
        console.log("temp card choice: ", temporaryCardChoice);
        temporaryCardChoice = null;

        // clear raptor info
        
        let cardDisplayOffcanvas = document.querySelector("#card-display");
        let cardDisplayInstructions = document.querySelector("#card-display-instructions");

        Renderer.renderRemove(cardDisplayInstructions, buttonDiv);
        Renderer.renderRemove(cardDisplayInstructions, raptorHeader);
        Renderer.renderRemove(cardDisplayInstructions, raptorText);
        cardDisplay.innerHTML = "";

        Renderer.renderCards(cardDisplayOffcanvas, rounds[currentRound-1].scientistHand);
        Renderer.renderCardChoiceInstructions(cardDisplayInstructions, GameText.cardChoiceContent, 1);
    }
}

function handleScientistPickCard(e){
    e.preventDefault();
    let t;
    if(contains(e.target.id, "scientist-card") && e.target.tagName !== "BUTTON"){
        t = e.target;
    } else if(contains(e.target.parentElement.id, "scientist-card") && e.target.tagName !== "BUTTON"){
        t = e.target.parentElement;
    }

    if(t){
        Renderer.renderCardSelectionOnOff(t.id);
        let scientistHand = rounds[currentRound-1].scientistHand;
        if(temporaryCardChoice === undefined || temporaryCardChoice === null){
            for(let card of scientistHand){
                if(card.id === t.id) {
                    console.log("card: ", card);
                    temporaryCardChoice = card;
                    break;
                }
            }
        } else {
            temporaryCardChoice = null;
        }
    }
    // get ready to clear scientist info
    let scientistHeader = document.querySelector("#h4-scientist-turn");
    let scientistText = document.querySelector("#p-scientist-text");
    let buttonDiv = document.querySelector("#button-div");
    let cardDisplay = document.querySelector("#card-display");
    let confirmButton = document.querySelector("#confirm-scientist-card-btn");
    if(e.target === confirmButton){
        // save scientist choice in state
        rounds[currentRound-1].scientistCardChoice = temporaryCardChoice;
        let hand = rounds[currentRound-1].scientistHand;
        State.removeCardFromArray(scientistCards, hand, temporaryCardChoice);
        temporaryCardChoice = null;
        // clear scientist info
        let cardDisplayOffcanvas = document.querySelector("#card-display");
        let cardDisplayInstructions = document.querySelector("#card-display-instructions");
        Renderer.renderRemove(cardDisplayInstructions, buttonDiv);
        Renderer.renderRemove(cardDisplayInstructions, scientistHeader);
        Renderer.renderRemove(cardDisplayInstructions, scientistText);
        cardDisplay.innerHTML = "";
        let initiative = State.setInitiative(players, rounds, currentRound, raptorDiscardPile, scientistDiscardPile, raptorCards, scientistCards);
        if(initiative === "tie"){

            // repeat card drawing

        }
        console.log("initiative: ", initiative);
        console.log("raptor cards: ", raptorCards);
        console.log("scientist cards: ", scientistCards);
        console.log("raptor discard pile: ", raptorDiscardPile);
        console.log("scientist discard pile: ", scientistDiscardPile);
        console.log("rounds: ", rounds);
        Renderer.renderBulkButtons(mainContent, GameText.raptorActionButtonsContent, "raptor-action-panel");
        Renderer.renderBulkButtons(mainContent, GameText.scientistActionButtonsContent, "scientist-action-panel");

        killBtn = document.querySelector("#raptor-kill-btn");
        captureBtn = document.querySelector("#scientist-capture-baby-btn");
        shootBtn = document.querySelector("#scientist-shoot-btn");
        
        killBtn.addEventListener("click", handleKill);
        captureBtn.addEventListener("click", handleCapture);
        shootBtn.addEventListener("click", handleShoot);
    }
}


function handleBoardSelections(e){
    selected = e.target;
    if(selectedId === null){
        selectedId = e.target.id;
        selected.classList.add("selected");
    } else {
        selected.classList.remove("selected");
        selectedId = null;
    }
    
}

function handleKill(){
    let kill = State.kill(pieces, selectedId);
    Renderer.renderKill(selected);
    Renderer.renderRemoveAfterAnimation(selected, "animationend");
    State.updateRound(rounds, currentRound, kill, "Raptors");
    State.updateVictoryStatus(victoryStatus, kill.action.name);
    State.victoryCheck(victoryStatus, true);
    console.log(rounds);
    console.log(victoryStatus);
    console.log(pieces);
}

function handleCapture(){
    let capture = State.capture(pieces, selectedId);
    Renderer.renderCapture(selected);
    Renderer.renderRemoveAfterAnimation(selected, "animationend");
    State.updateRound(rounds, currentRound, capture, "Scientists");
    State.updateVictoryStatus(victoryStatus, capture.action.name);
    State.victoryCheck(victoryStatus, true);
    console.log(rounds);
    console.log(victoryStatus);
    console.log(pieces);
}

function handleShoot(){

}

// Touch Events
  function handleTouchStart(e){
      if(e.targetTouches[0].target.className === "pieces"){
        dragItem = e.targetTouches[0].target;
        dragItem.classList.add("selected");
        if(e.target === dragItem){
          active = true;
        }
        initialX = e.touches[0].clientX // - xOffset;
        initialY = e.touches[0].clientY // - yOffset;
        let idVacated;
        // handle Chrome vs other browsers
        if(isChrome === true) {
        idVacated = e.path[1].id;
        boardStartId = idVacated;
        } else if (isChrome === false) {
        let path = getPath(dragItem);
        idVacated = path[1].id;
        boardStartId = idVacated;
        }
        if(idVacated === "pieces-tray"){
        } else if(dropZone === null){
        } else {
            // can set state here for space that is now unoccupied
            State.leaveSpace(board, idVacated);
        }
      }    
  } 
  function handleTouchMove(e){
    if(active){
        document.querySelector("body").classList.add("lock-screen");
        currentX = e.touches[0].clientX - initialX;  
        currentY = e.touches[0].clientY - initialY;
        setTranslate(currentX, currentY, dragItem);
    }
  } 
  function handleTouchEnd(e){
    if(dragItem !== undefined){
        document.querySelector("body").classList.remove("lock-screen");
        // let path = getPath(dragItem);
        let dropzoneX = e.changedTouches[0].clientX;
        let dropzoneY = e.changedTouches[0].clientY;
        let dropZoneList = document.elementsFromPoint(dropzoneX, dropzoneY);
        for(let el of dropZoneList){
            // sets the drop zone
            if(el.classList.contains("space")){
                boardEndId = el.id;
                let orthogonal = Valid.isOrthogonal(board, boardStartId, boardEndId);
                if(setupComplete === undefined){
                    if(dragItem.id === "mother-raptor-1"){   
                        if(Valid.canPlaceMotherSetup(board, el.id) === true){
                            dropZone = el;
                            State.occupySpace(board, el.id, dragItem.id);
                            State.updatePiece(pieces, dragItem.id, "location", dropZone.id);
                        } else {
                            dragItem.style.removeProperty("transform");
                            dragItem.classList.remove("selected");
                            alert("That's not a valid space for the mother raptor during setup.");
                        }    
                    } else if(contains(dragItem.id, "baby")){
                        if(Valid.canPlaceBabySetup(board, el.id) === true){
                            dropZone = el;
                            State.occupySpace(board, el.id, dragItem.id);
                            State.updatePiece(pieces, dragItem.id, "location", dropZone.id);
                        } else {
                            dragItem.style.removeProperty("transform");
                            dragItem.classList.remove("selected");
                            alert("That's not a valid space for a baby raptor during setup.");
                        }
                    } else if(contains(dragItem.id, "scientist")){
                        if(Valid.isExit(board, el.id) === false && Valid.isLShapedTile(board, el.id) === true){
                            dropZone = el;
                            State.occupySpace(board, el.id, dragItem.id);
                            State.updatePiece(pieces, dragItem.id, "location", dropZone.id);
                        } else {
                            dragItem.style.removeProperty("transform");
                            dragItem.classList.remove("selected");
                            alert("That's not a valid space for a scientist during setup.");
                        }
                    }
                } else if(setupComplete === true && gameActive === true){
                    if(orthogonal === true){
                        if(Valid.isPassable(board, el.id)){
                            if(contains(dragItem.id, "scientist")){
                                if(Valid.isExit(board, el.id) === false){
                                    dropZone = el;
                                    State.occupySpace(board, el.id, dragItem.id);
                                    State.updatePiece(pieces, dragItem.id, "location", dropZone.id);
                                } else {
                                    dragItem.style.removeProperty("transform");
                                    dragItem.classList.remove("selected");
                                    alert("Scientists cannot move into exits.");
                                }
                            } else if(contains(dragItem.id, "mother")){
                                if(Valid.isExit(board, el.id) === false){
                                    dropZone = el;
                                    State.occupySpace(board, el.id, dragItem.id);
                                    State.updatePiece(pieces, dragItem.id, "location", dropZone.id);
                                } else {
                                    dragItem.style.removeProperty("transform");
                                    dragItem.classList.remove("selected");
                                    alert("The mother raptor cannot move into exits.");
                                }
                            } else {
                                dropZone = el;
                                State.occupySpace(board, el.id, dragItem.id);
                                State.updatePiece(pieces, dragItem.id, "location", dropZone.id);
                                let escape = Valid.isExit(board, dropZone.id);
                                if(escape === true) alert("A baby raptor has escaped and won the game!");
                                gameActive = false;
                                console.log(board);
                            }
                        } else {
                            alert("No piece can move onto a mountain!");
                        }
                    } else {
                        alert("That move is not orthogonal! Please move only in rows or columns.");
                    }
                }
            }
        }
        if(dropZone !== undefined){
            // add the piece to the space element in HTML
            dropZone.appendChild(dragItem);
        }
        // prevent handleMove
        active = false;
        // makes the piece appear properly like a normal child of div
        dragItem.style.removeProperty("transform");
        // remove selected class
        dragItem.classList.remove("selected");
        // force a reset of selecting the dragItem
        dragItem = undefined;
        dropZone = undefined;
    }
  } 
  
// helper func for handleTouchMove
  function setTranslate(xPos, yPos, el){
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
  }

// Mouse Events:
  function handleDrop(e){
    e.preventDefault();
  } 
  function handleDragStart(e){
    e.preventDefault();
  } 
  function handleDragEnd(e){
    e.preventDefault();

  }  
  function handleDragEnter(e){
    e.preventDefault();

  } 
  function handleDragLeave(e){
    e.preventDefault();
  } 

  // this is for Safari which doesn't support path like Chrome does.
function getPath(currentElem) {
    var path = [];
    while (currentElem) {
      path.push(currentElem);
      currentElem = currentElem.parentElement;
    }
    if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
      path.push(document);
    if (path.indexOf(window) === -1)
      path.push(window);
    return path;
}

// Handle Dark Mode
function handleDarkModeToggle(e){
    e.preventDefault();
    console.log(e);
    if(darkMode === false){
        darkMode = true;

        let body = document.querySelector("body");
        body.classList.add("dark-home");

        newGameFormEl.classList.remove("animate__slideInLeft");
        newGameFormEl.classList.add("animate__fadeIn");
        // Renderer.renderAddClass("body", ".dark-home");

        if(document.querySelector(".board") !== null){
            let board = document.querySelector(".board");
            let middle = board.children[1];
            middle.classList.remove(".middle");
            middle.classList.add("dark-middle");
        }

    } else {
        darkMode = false;
        let body = document.querySelector("body");
        body.classList.remove("dark-home");
        newGameFormEl.classList.remove("animate__fadeIn");
        newGameFormEl.classList.add("animate__slideInLeft");

        if(document.querySelector(".board") !== null){
            let board = document.querySelector(".board");
            let middle = board.children[1];
            middle.classList.add(".middle");
            middle.classList.remove("dark-middle");
        }
    }

    // body.classList.toggle("dark-background");
    // body.classList.toggle("light-text");

    // let form = document.querySelector("form");
    // if(form.classList !== null) form.classList.toggle("dark-background-2");

    // let sections = document.querySelectorAll("section");
    // sections.forEach(section => section.classList.toggle("dark-background-2"));
    
    // let h1s = document.querySelectorAll("h1");
    // h1s.forEach(el => el.classList.toggle("light-text"));
    // let h2s = document.querySelectorAll("h2");
    // h2s.forEach(el => el.classList.toggle("light-text"));

    // let buttons = document.querySelectorAll("button");
    // buttons.forEach(button => button.classList.toggle("medium-buttons"));

    // let intro = document.querySelector("#intro-card");
    // if(intro.classList !== null) intro.classList.toggle("dark-background-2");

}

/* ----- MAIN ----- */

newGameFormEl.classList.add("animate__animated");
newGameFormEl.classList.add("animate__slideInLeft");

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    console.log(newColorScheme);
    if(newColorScheme === "dark"){
        document.querySelector("nav").classList.remove("navbar-light")
        document.querySelector("nav").classList.remove("bg-light")
        document.querySelector("nav").classList.add("navbar-dark")
        document.querySelector("nav").classList.add("bg-dark")
    } else {
        document.querySelector("nav").classList.remove("navbar-dark")
        document.querySelector("nav").classList.remove("bg-dark")
        document.querySelector("nav").classList.add("navbar-light")
        document.querySelector("nav").classList.add("bg-light")
    }
});