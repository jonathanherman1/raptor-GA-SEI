import {getRandomIntNotIncl} from "../helpers.js";
import {gameCardsContent} from "./gameText.js";

function createBoard(){
    let board = [];
    let numLargeTiles = 6;
    let numLShapedTiles = 4;
    let numSpacesOnLargeTiles = 9;
    let numSpacesOnLShapedTiles = 4;
    let numMountains = calcNumMountains(numLargeTiles, numSpacesOnLargeTiles, numLShapedTiles, numSpacesOnLShapedTiles); // 9 mountains in a normal game
    let types = ["Mountain", "Normal", "Exit"];
    let environments = ["Jungle", "Desert"];

    // in a 3 x 3 tile.
    let leftEdge = [1,4,7];
    let rightEdge = [3,6,9];

    // one environment for the selected game (so not inside the loop)
    let randEnvIdx = getRandomIntNotIncl(0, environments.length);
    let environment = environments[randEnvIdx];
    
    // big tiles
    for(let i = 1; i <= numLargeTiles; i++){
        for(let j = 1; j <= numSpacesOnLargeTiles; j++){
            let space = {
                spaceInTile: j,
                name: `${i}.${j}`, // tile.space
                tile: i,
                lShaped: false,
                type: types[1],
                environment: environment,
                occupied: false,
                occupiedBy: null,
                hasFire: false
            }
            if(leftEdge.includes(j) || rightEdge.includes(j)){
                space.edgeForReinforcement = true;
            } else {
                space.edgeForReinforcement = false;
            }
            board.push(space);
        }
    }

    // place random mountains on normal tiles
    for(let i = 1; i <= numMountains; i++){
        let randSpaceIdx = getRandomIntNotIncl(0, board.length);
        board[randSpaceIdx].type = types[0];
    }

    // L-shaped tiles
    for(let i = 1; i <= numLShapedTiles; i++){
        for(let j = 1; j <= numSpacesOnLShapedTiles; j++){
            let space = {
                spaceInTile: j,
                name: `${i + numLargeTiles}.${j}`,
                tile: i + numLargeTiles,
                lShaped: true,
                environment: environment,
                edgeForReinforcement: false,
                occupied: false,
                occupiedBy: null,
                hasFire: false
            }
            // sets the exits
            j === 4 ? space.type = types[2] : space.type = types[1]
            board.push(space);
        }   
    }

    // give each space a global id
    board.forEach((space, idx) => space.id = `sp${idx + 1}`);

    return board;
}

function calcNumMountains(tiles, spaces, lTiles, lSpaces){
    let normNumSpaces = tiles * spaces;
    let lShapedNumSpaces = lTiles * lSpaces;
    let totalSpaces = normNumSpaces + lShapedNumSpaces;
    let numMountains = Math.floor(totalSpaces * .13);
    return numMountains;
}

function createCards(){
    let cards = [];
    let scientistVal = 0;
    for(let i = 0; i < gameCardsContent.length; i++){
        let card = {
            name: gameCardsContent[i].name,
            actions: gameCardsContent[i].actions,
            notes: gameCardsContent[i].notes,
            usedThisRound: false,
            usedAsSpecial: false
        }
        if(i < 9){
            card.value = i+1;
            card.team = "Raptors";
            card.id = `raptor-card-${i}`;
        } else {
            scientistVal++;
            card.value = scientistVal;
            card.team = "Scientists";
            card.id = `scientist-card-${i}`;
        }
        cards.push(card);
    }
    return cards;
}

function pickCards(cards, numCardsNeeded){
    let hand = [];
    // get unique random indices
    let randIdxArr = [];
    while(randIdxArr.length < numCardsNeeded) {
        let randIdx = getRandomIntNotIncl(0, cards.length);
        if(randIdxArr.indexOf(randIdx) === -1) randIdxArr.push(randIdx);
    }
    for(let idx of randIdxArr){
        let randCard = cards[idx];
        hand.push(randCard);
    }    
    return hand;
}

function addCardsToHand(team, cards, numCardsNeeded, rounds, roundNum){
    let hand;
    let roundIdx = roundNum - 1;
    switch(team){
        case "raptors":
            hand = pickCards(cards, numCardsNeeded);
            rounds[roundIdx].raptorHand = hand;
            break;
        case "scientists":
            hand = pickCards(cards, numCardsNeeded);
            rounds[roundIdx].scientistHand = hand;
            break;
    }
}

function shuffleDeck(){
    // empty discard pile back into main pile and shuffle
}

function discardCard(rounds, currentRound, discardPile, team, cards){
    let card;
    let hand;
    if(team === "Raptors"){
        hand = rounds[currentRound-1].raptorHand;
        card = rounds[currentRound - 1].raptorCardChoice;
        removeCardFromArray(cards, hand, card);
        rounds[currentRound-1].raptorCardChoice = null;
    } else {
        hand = rounds[currentRound-1].scientistHand;
        card = rounds[currentRound - 1].scientistCardChoice;
        removeCardFromArray(cards, hand, card);
        rounds[currentRound-1].scientistCardChoice = null;
    }
    discardPile.push(card);
}

function removeCardFromArray(teamCards, teamHand, card){
    // find the index of the current card in the raptorCards array or scientistCards array.
    let idx = teamCards.findIndex(el => el.id === card.id);
    let idxH = teamHand.findIndex(el => el.id === card.id);
    // splice the card at that index
    teamCards.splice(idx, 1);
    teamHand.splice(idxH, 1);
}

function createRound(roundNum){
    let round = {
        id: roundNum,
        name: `Round ${roundNum}`,
        raptorHand: null,
        raptorCardChoice: null,
        scientistHand: null,
        scientistCardChoice: null,
        activePlayer: null,
        activeTeam: null,
        activeCard: null,
        numActionPointsRaptors: null,
        numActionPointsScientists: null,
        actionsTaken: [
            {
                action: {},
                team: null,
                type: null
            }
        ]
    }
    return round;
}

function updateRound(rounds, currentRound, event, team){
   let i = currentRound - 1;
   let round = rounds[i];
   round.actionsTaken.push(event);
   switch(team){
       case "Raptors":
           round.numActionPointsRaptors--;
           if(numActionPointsRaptors === 0) switchActiveTeam(rounds, currentRound, "Raptors");
           break;
       case "Scientists":
           round.numActionPointsScientists--;
           if(numActionPointsScientists === 0) switchActiveTeam(rounds, currentRound, "Scientists");
           break;
   }
   console.log("round updated");
}

function switchActiveTeam(rounds, currentRound, currentActiveTeam){
    let i = currentRound - 1;
    let activeTeam = rounds[i].activeTeam;
    switch(currentActiveTeam){
        case "Raptors":
            activeTeam = "Scientists";
            break;
        case "Scientists":
            activeTeam = "Raptors";
            break;
    }
}

function occupySpace(board, spaceId, pieceId){
    for(let space of board){
        if(space.id === spaceId){
            space.occupied = true;
            space.occupiedBy = pieceId;
            // console.log(space);
        }
    }
}

function leaveSpace(board, spaceId){
    for(let space of board){
        if(space.id === spaceId){
            space.occupied = false;
            space.occupiedBy = null;
            // console.log(space);
        }
    }
}

function updatePiece(pieces, pieceId, prop, val){
    for(let p of pieces){
        if(p.id === pieceId){
            p[prop] = val;
        }
    }
}

function setInitiative(players, rounds, currentRound, raptorDiscardPile, scientistDiscardPile, raptorCards, scientistCards){
    let round = rounds[currentRound-1];
    let raptorCard = round.raptorCardChoice;
    let scientistCard = round.scientistCardChoice;
    let numActionPoints = Math.abs(raptorCard.value - scientistCard.value);
    // temporarily using action points for both teams during MVP
    round.numActionPointsRaptors = numActionPoints;
    round.numActionPointsScientists = numActionPoints;

    if(raptorCard.value < scientistCard.value){
        round.activeTeam = "Raptors";
        round.activeCard = raptorCard;
        round.activePlayer = setActivePlayerStatus(players, "Raptors");
        return "raptors";
    } else if(raptorCard.value > scientistCard.value){
        round.activeTeam = "Scientists";
        round.activeCard = scientistCard;
        round.activePlayer = setActivePlayerStatus(players, "Scientists");
        return "scientists";
    } else {
        discardCard(rounds, currentRound, raptorDiscardPile, "Raptors", raptorCards);
        discardCard(rounds, currentRound, scientistDiscardPile, "Scientists", scientistCards);
        State.addCardsToHand("raptors", raptorCards, 1, rounds, 1);
        State.addCardsToHand("scientists", scientistCards, 1, rounds, 1);
        currentRound++;
        return "tie";
    }
}

function setActivePlayerStatus(players, team){
    return players.filter(player => player.team === team.team);
}

// movement is touch-driven and only limited by validation so doesn't need a function here. I do want to add a render function that can make it easier to see the possible actions (such as movement)

// Raptor Actions

function putOutFire(){
    // for mother raptor
}

function wake(){
    // can use for scientists and raptors
}

function heal(){
    // for mother raptor
}

function kill(pieces, pieceId){
    // for mother raptor
    // identify piece
    console.log("pieceId ", pieceId);
    let piece = pieces.filter(piece => piece.id === pieceId);
    console.log("piece ", piece);
    piece[0].health = 0;
    piece[0].awake = false;
    let killResult = {
        action: {
            name: "Kill scientist",
            piece: piece
        },
        team: "Raptors",
        type: "Regular"
    }
    return killResult;
}

function callBabyRaptors(){
    // for mother raptor
}

function disappearAndObserve(){
    // for mother raptor
}

function frightenScientist(){
    // for mother raptor
}

// Scientist Actions

function shoot(){
    // for scientists
}

function driveJeep(){
    // for scientists
}

function lightFire(){
    // for scientists
}

function victoryCheck(victoryStatus, abbreviatedBool){
    let escaped = victoryStatus[0].numRaptorsEscaped;
    let numScientists = victoryStatus[0].numScientistsOnBoard;
    let captured = victoryStatus[1].numRaptorsCaptured;
    let hits = victoryStatus[1].numHitsOnMother;
    let motherPutToSleep = victoryStatus[1].motherPutToSleep;
    let raptorVictory = victoryStatus[0].victory;
    let scientistVictory = victoryStatus[1].victory;

    if(abbreviatedBool === true){
        if(escaped === 1){
            raptorVictory = true;
        } else if (captured === 1){
            scientistVictory = true;
        } else {
            console.log("The game goes on. Victory conditions not met.");
        }
        
        if(raptorVictory === true){
            return {winner: "Raptors", loser: "Scientists"};
        } else if (scientistVictory === true){
            return {winner: "Scientists", loser: "Raptors"};
        } else {
            return victoryStatus;
        }
    } else {
        if(escaped === 3 || numScientists === 0){
            raptorVictory = true;
        } else if (captured === 3 || motherPutToSleep === true){
            scientistVictory = true;
        } else {
            console.log("The game goes on. Victory conditions not met.");
        }
        
        if(raptorVictory === true){
            return {winner: "Raptors", loser: "Scientists"};
        } else if (scientistVictory === true){
            return {winner: "Scientists", loser: "Raptors"};
        } else {
            return victoryStatus;
        }
    }
}

function updateVictoryStatus(victoryStatus, event){
    switch(event){
        case "Kill scientist": 
            // if scientist dies decrement value
            victoryStatus[0].numScientistsOnBoard--;            
            break;
    }
    // if raptor escapes increment value
    // if scientist reinforcements arrive increment value
    // if raptor is captured increment value
    // if mother hit increment value
    // if mother put to sleep, switch value
    // if raptors win, switch value
    // if scientists win, switch value
}


export {createBoard, createCards, pickCards, addCardsToHand, createRound, occupySpace, leaveSpace, updatePiece, setInitiative, kill, victoryCheck, discardCard, removeCardFromArray, updateVictoryStatus, updateRound};