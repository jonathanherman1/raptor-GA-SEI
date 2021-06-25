// from MDN
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let timeoutId;

function delayFunc(func, delayMs){
    if(typeof timeoutId === "number"){
        clearDelay(timeoutId);
    }
    timeoutId = window.setTimeout(func, delayMs)
}

function clearDelay(){
    window.clearTimeout(timeoutId);
}

export {getRandomIntInclusive, timeoutId, delayFunc, clearDelay};