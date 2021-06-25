function render(){

}

function renderRemove(parent, child){
    parent.removeChild(child);
} // for removing elements


function renderBootstrapCard(cardId, content){
    return `
    <div id="#${cardId}" class="card" style="width: 18rem;">
        <img src="${content.imgURL}" class="card-img-top" alt="${content.altText}">
        <div class="card-body">
            <p class="card-text">${content.pText}</p>
        </div>
        ${renderBootstrapButton(content)}
    </div>`;
}

function renderBootstrapButton(content){
    let {btnType, btnId, btnText, addCustomClassBool, customBtnClass} = content;
    if(addCustomClassBool === true){
        switch(btnType){
            case "primary":
                return `<button type="button" id="${btnId}" class="btn btn-primary ${customBtnClass}">${btnText}</button>`           
            case "secondary":
                return `<button type="button" id="${btnId}" class="btn btn-secondary ${customBtnClass}">${btnText}</button>`           
            case "success":
                return `<button type="button" id="${btnId}" class="btn btn-success ${customBtnClass}">${btnText}</button>`           
            case "danger":
                return `<button type="button" id="${btnId}" class="btn btn-danger ${customBtnClass}">${btnText}</button>`           
            case "warning":
                return `<button type="button" id="${btnId}" class="btn btn-warning ${customBtnClass}">${btnText}</button>`           
            case "info":
                return `<button type="button" id="${btnId}" class="btn btn-info ${customBtnClass}">${btnText}</button>`           
            case "light":
                return `<button type="button" id="${btnId}" class="btn btn-light ${customBtnClass}">${btnText}</button>`           
            case "dark":
                return `<button type="button" id="${btnId}" class="btn btn-dark ${customBtnClass}">${btnText}</button>`           
            case "link":
                return `<button type="button" id="${btnId}" class="btn btn-link ${customBtnClass}">${btnText}</button>`           
            default:
                return `<button type="button" id="${btnId}" class="btn btn-primary">${btnText}</button>`
        }
    } else {
        switch(btnType){
            case "primary":
                return `<button type="button" id="${btnId}" class="btn btn-primary">${btnText}</button>`           
            case "secondary":
                return `<button type="button" id="${btnId}" class="btn btn-secondary">${btnText}</button>`           
            case "success":
                return `<button type="button" id="${btnId}" class="btn btn-success">${btnText}</button>`           
            case "danger":
                return `<button type="button" id="${btnId}" class="btn btn-danger">${btnText}</button>`           
            case "warning":
                return `<button type="button" id="${btnId}" class="btn btn-warning">${btnText}</button>`           
            case "info":
                return `<button type="button" id="${btnId}" class="btn btn-info">${btnText}</button>`           
            case "light":
                return `<button type="button" id="${btnId}" class="btn btn-light">${btnText}</button>`           
            case "dark":
                return `<button type="button" id="${btnId}" class="btn btn-dark">${btnText}</button>`           
            case "link":
                return `<button type="button" id="${btnId}" class="btn btn-link">${btnText}</button>`           
            default:
                return `<button type="button" id="${btnId}" class="btn btn-primary">${btnText}</button>`
        }
    }
}


function renderHeaders(content, headerLevel){
    for(let i = 1; i <= headerLevel; i++){
        return `<h${headerLevel}>${content}</h${headerLevel}>`
    }
}

function renderLists(contentArr, orderedBool){
    let listContentStr = "";
    contentArr.forEach(el => listContentStr += `<li>${el}</li>`);
    return orderedBool === true ? `<ol>${listContentStr}</ol>` : `<ul>${listContentStr}</ul>`;
}

function renderParagraphs(contentArr){
    let paraContentStr = "";
    contentArr.forEach(el => paraContentStr += `<p>${el}</p>`);
    return paraContentStr;
}


function renderWelcome(){

}

function renderIntro(target, introContent){
    target.innerHTML = 
    `
    <section id="intro">
       ${renderHeaders(introContent.h1Text, 1)}
       ${renderBootstrapCard("intro-card", introContent)}
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
       ${renderBootstrapButton(howToPlayContent)}
    </section>
    `
}

function renderPickTeams(target, pickTeamsContent){
    let raptors = pickTeamsContent.raptors;
    let scientists = pickTeamsContent.scientists;
    target.innerHTML = 
    `
    <section id="pick-teams">
        ${renderHeaders(pickTeamsContent.h1Text, 1)}
        ${renderHeaders(raptors.h2Text, 2)}
        ${renderBootstrapCard("pick-raptors-card", raptors)}
        ${renderHeaders(scientists.h2Text, 2)}
        ${renderBootstrapCard("pick-scientists-card", scientists)}
    </section>
    `
}


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

export {render, renderRemove, renderIntro, renderHowToPlay, renderPickTeams};
