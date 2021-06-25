function render(){

}

function renderRemove(parent, child){
    parent.removeChild(child);
} // for removing elements


function renderBootstrapCard(content, h1Bool, btnInsideCardBool){
    if(h1Bool === true){
       return `
        <h1>${content.h1Text}</h1>
        <div class="card" style="width: 18rem;">
            <img src="${content.imgURL}" class="card-img-top" alt="${content.altText}">
            <div class="card-body">
                <p class="card-text">${content.pText}</p>
            </div>
        </div>
        <button id="${content.btnId}" class="btn btn-primary" type="button">${content.btnText}</button>
        `
    } else if (btnInsideCardBool === true) {
        return `
        <div class="card" style="width: 18rem;">
            <img src="${content.imgURL}" class="card-img-top" alt="${content.altText}">
            <div class="card-body">
                <p class="card-text">${content.pText}</p>
            </div>
            <button id="${content.btnId}" class="btn btn-primary" type="button">${content.btnText}</button>
        </div>   
        `
    } else {
       return `
        <div class="card" style="width: 18rem;">
            <img src="${content.imgURL}" class="card-img-top" alt="${content.altText}">
            <div class="card-body">
                <p class="card-text">${content.pText}</p>
            </div>
        </div>
        <button id="${content.btnId}", class="btn btn-primary" type="button">${content.btnText}</button>
        `
    }
}

function renderHeaders(content, headerLevel){
    for(let i = 1; i <= headerLevel; i++){
        return `<h${headerLevel}>${content}</h${headerLevel}>`
    }
}

function renderLists(contentArr, orderedBool){
    let listContentStr;
    contentArr.forEach(el => listContentStr += `<li>${el}</li>`);
    return orderedBool === true ? `<ol>${listContent}</ol>` : `<ul>${listContent}</ul>`;
}

function renderParagraphs(contentArr){
    let paraContentStr;
    contentArr.forEach(el => paraContentStr += `<p>${el}</p>`);
    return paraContentStr;
}



function renderWelcome(){

}

function renderIntro(target, introContent){
    target.innerHTML = 
    `
    <section id="intro">
       ${renderBootstrapCard(introContent, true, false)}
    </section>
    `
}

function renderHowToPlay(target, howToPlayContent){
    target.innerHTML =
    `
    <section id="how-to-play">
       ${renderHeaders(howToPlayContent.h1Text, 1)}
       ${renderLists(howToPlayContent.instructions, true)}
       ${renderParagraphs(howToPlayContent.victoryConditions)}
    </section>
    `
}

function renderPickTeams(){}
function renderTeamChoices(){}
function renderButtons(){} // confirm, back, etc.
function renderCards(){}
function renderPieces(){}
function renderBoard(){}
function renderReinforcements(){} // may incorporate this into renderPieces
function renderFire(){}
function renderJeepMovement(){}
function renderMotherRaptorDisappears(){}
function renderMotherRaptorReappears(){}

export {render, renderRemove, renderIntro, renderHowToPlay};