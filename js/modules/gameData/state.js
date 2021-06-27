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
                name: `${i}.${j}`,
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
    board.forEach((space, idx) => space.id = idx + 1);

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
            id: i,
            name: gameCardsContent[i].name,
            actions: gameCardsContent[i].actions,
            notes: gameCardsContent[i].notes,
            usedThisRound: false,
            usedAsSpecial: false
        }
        if(i < 9){
            card.value = i+1;
            card.team = "Raptors";
        } else {
            scientistVal++;
            card.value = scientistVal;
            card.team = "Scientists";
        }
        cards.push(card);
    }
    return cards;
}

function createRound(roundNum){
    let round = {
        id: roundNum,
        name: `Round ${roundNum}`,
        raptorCardChoice: null,
        scientistCardChoice: null,
        activePlayer: null,
        activeTeam: null,
        activeCard: null,
        numActionPoints: null,
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

function updateRound(){

}


export {createBoard, createCards, createRound};