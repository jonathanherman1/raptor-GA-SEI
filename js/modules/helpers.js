// from MDN
function getRandomIntNotIncl(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

// from MDN
function getRandomIntIncl(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function isOdd(num){
    if(num % 2 === 0){
        return false;
    } else if (num % 2 === 1){
        return true;
    }
}

function contains(str, pattern){
    let reg = new RegExp(pattern, "gi");
    return reg.test(str);
}

export {getRandomIntNotIncl, getRandomIntIncl, isOdd, contains};