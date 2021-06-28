import {contains} from "./helpers.js";

function isPassable(board, id){
    // board is the board in state
    // id is a space a player attempts to drop a piece on
    // currently the rules say you cannot pass through mountains
    // check if mountain
    for(let space of board){
        if(space.id === id){
            if(space.type === "Mountain"){
                return false;    
            } else {
                return true;
            }
        }
    }
}

function isExit(board, id){
    for(let space of board){
        if(space.id === id){
            if(space.type === "Exit"){
                return true;    
            }
        }
    }
    return false;
}

function isLShapedTile(board, id){
    for(let space of board){
        if(space.id === id){
            if(space.lShaped === true){
                return true;    
            }
        }
    }
    return false;
}

function isNormalSpace(board, id){
    for(let space of board){
        if(space.id === id){
            if(space.type === "Normal"){
                return true;    
            }
        }
    }
    return false;
}

function canReinforce(board, id){
    // in current rules, scientists can only reinforce on a large tile edge
    for(let space of board){
        if(space.id === id){
            if(space.edgeForReinforcement === true){
                return true;    
            }
        }
    }
    return false;
}

function canPlaceMotherSetup(board, id){
    let canPassBool = isPassable(board, id);
    if(canPassBool === false) return false;
    let babyOnTile = isPieceOnTile(board, id, null, "#baby", false);
    if(babyOnTile === true) return false;
    for(let space of board){
        if(space.id === id){
            if(space.lShaped === false && (space.tile === 3 || space.tile === 4)){
                return true;
            }
        }
    }
    return false;
}

function canPlaceBabySetup(board, id){
    let canPassBool = isPassable(board, id);
    if(canPassBool === false) return false;
    let motherOnTile = isPieceOnTile(board, id, "#mother-raptor-1", null, true);
    let babyOnTile = isPieceOnTile(board, id, null, "baby", false);
    if(motherOnTile === true || babyOnTile === true) return false;
    for(let space of board){
        if(space.id === id){
            if(space.lShaped === false){
              return true;
            } else {
                return false;
            }
        }
    }
}

function isPieceOnTile(board, id, pieceId, pieceIdPartial, strictBool){
    let tileOfOccupant;
    // set tile of intended new occupant
    for(let space of board){
        if(space.id === id){
            tileOfOccupant = space.tile;
            console.log("tileOfOccupant: ", tileOfOccupant);
            console.log("space.tile: ", space.tile);
            break;
        }
    }
    // check the tile for a piece
    for(let space of board){
        if(strictBool === true){
            if(space.occupiedBy === pieceId){
                if(space.tile === tileOfOccupant){
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            if(contains(space.occupiedBy, pieceIdPartial)){
                if(space.tile === tileOfOccupant){
                    return true;
                } else {
                    return false;
                }
            }
        }
    } 
}


function isOrthogonal(board, startId, endId){
    let tileRows = [
        [1,2],
        [3,4],
        [5,6],
        [7,8],
        [9,10]
    ]
    let tileCols = [
        [1,3,5,7,9], 
        [2,4,6,8,10]
    ]
    let spaceRows = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];

    let spaceCols = [
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ]

    let startTile = getTile(board, startId);
    let startSpaceInTile = getSpaceInTile(board, startId);
    let endTile = getTile(board, endId);
    let endSpaceInTile = getSpaceInTile(board, endId);

    let rowMov;
    let colMov;

    // Check if move is orthogonal into a row or col from one tile to another
    for(let row of tileRows){
        if(row.includes(startTile) && row.includes(endTile)){
            rowMov = true;
        }
    }

    for(let col of tileCols){
        if(col.includes(startTile) && col.includes(endTile)){
            colMov = true;
        }
    }

    // Check if move to tile is also valid moving from one space to another
    if(rowMov){
        for(let row of spaceRows){
            if(row.includes(startSpaceInTile) && row.includes(endSpaceInTile)){
                return true;
            }
        }
    } else if(colMov){
        for(let col of spaceCols){
            if(col.includes(startSpaceInTile) && col.includes(endSpaceInTile)){
                return true;
            }
        }
    } else {
        return false;
    }
}

function getTile(board, id){
    for(let space of board){
        if(space.id === id){
            return space.tile;
        }
    }
}

function getSpaceInTile(board, id){
    for(let space of board){
        if(space.id === id){
            return space.getSpaceInTile;
        }
    }
}

// in the current rules, only baby raptors are allowed to leave the game board through exits
function isAllowedToExit(pieces, pieceId){
    pieces.forEach(piece => {
        if(piece.id === pieceId){
            return piece.team === 0 && piece.mother === false ? true : false;
        }
    })
}


function isAwake(){}
function canBeAwakened(){}
function hasActionPoints(){}
function hasAggressiveActions(){}

function isNotOccupied(){

}
function isNotObstructed(){}


export {isPassable, isExit,  isLShapedTile, isNormalSpace,  canReinforce, canPlaceMotherSetup, canPlaceBabySetup, isOrthogonal, isAllowedToExit}