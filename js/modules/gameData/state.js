import {getRandomIntNotIncl} from './helpers.js';

function createBoard(){
    let board = [];
    let numLargeTiles = 6;
    let numLShapedTiles = 4;
    let numSpacesOnLargeTiles = 9;
    let numSpacesOnLShapedTiles = 4;
    let types = ["Mountain", "Normal", "Exit"];
    let environments = ["Jungle", "Desert"];

    // one environment for the selected game (so not inside the loop)
    let environment = getRandomIntNotIncl(0, environments.length);

    for(let i = 1; i <= numLargeTiles; i++){
        for(let j = 1; j <= numSpacesOnLargeTiles; j++){
            let space = {
                id: `${i}.${j}`, // tile.space
                tile: i,
                lShaped: false,
                type: getRandomIntNotIncl(0, types.length),
                environment: environment,
                occupied: false,
                occupiedBy: null,
                hasFire: false
            }
            board.push(space);
        }
    }
    for(let i = 1; i <= numLShapedTiles; i++){
        for(let j = 1; j <= numSpacesOnLShapedTiles; j++){
            let space = {
                id: `${i}.${j}`,
                tile: i,
                lShaped: true,
                environment: environment,
                occupied: false,
                occupiedBy: null,
                hasFire: false
            }
            // sets the exits
            j === 4 ? space.type = types[2] : space.type = types[1]
            board.push(space);
        }   
    }
    return board;
}

export {createBoard};