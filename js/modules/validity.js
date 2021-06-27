function isPassable(board, id){
    // board is the board in state
    // id is a space a player attempts to drop a piece on
    // currently the rules say you cannot pass through mountains
    // check if mountain
    for(let space of board){
        if(space.id === id){
            if(space.type === "Mountain"){
                return false;    
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
}

function isLShapedTile(board, id){
    for(let space of board){
        if(space.id === id){
            if(space.lShaped === true){
                return true;    
            }
        }
    }
}

function isNormalSpace(board, id){
    for(let space of board){
        if(space.id === id){
            if(space.type === "Normal"){
                return true;    
            }
        }
    }
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
}

function canPlaceMotherSetup(board, id){
    for(let space of board){
        if(space.id === id){
            if(space.lShaped === false && (space.tile === 3 || space.tile === 4)){
                return true;
            }
        }
    }
}

function canPlaceBabySetup(board, id){
    let motherOnTile = isMotherOnTile(board, id);
    if(motherOnTile === true) return false;
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

function isMotherOnTile(board, id){
    let tileOfOccupant;
    // set tile of intended new occupant
    for(let space of board){
        if(space.id === id){
            tileOfOccupant = space.tile;
            break;
        }
    }
    // check the tile for the mother
    for(let space of board){
        if(space.tile === tileOfOccupant){
            if(space.occupiedBy === "mother-raptor-1"){
                return true;
            } else {
                continue;
            }
        }
    }
    return false;
}





function isNotOccupied(){}
function isNotObstructed(){}


function isOrthogonal(){}

function isAllowedToExit(teams, pieceId){
    
}


function isAwake(){}
function canBeAwakened(){}
function hasActionPoints(){}
function hasAggressiveActions(){}