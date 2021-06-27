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
    let {btnType, btnId, btnText, btnValue, addCustomClassBool, customBtnClass} = content;
    if(addCustomClassBool === true){
        switch(btnType){
            case "primary":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-primary ${customBtnClass}">${btnText}</button>`           
            case "secondary":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-secondary ${customBtnClass}">${btnText}</button>`           
            case "success":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-success ${customBtnClass}">${btnText}</button>`           
            case "danger":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-danger ${customBtnClass}">${btnText}</button>`           
            case "warning":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-warning ${customBtnClass}">${btnText}</button>`           
            case "info":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-info ${customBtnClass}">${btnText}</button>`           
            case "light":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-light ${customBtnClass}">${btnText}</button>`           
            case "dark":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-dark ${customBtnClass}">${btnText}</button>`           
            case "link":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-link ${customBtnClass}">${btnText}</button>`           
            default:
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-primary">${btnText}</button>`
        }
    } else {
        switch(btnType){
            case "primary":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-primary">${btnText}</button>`           
            case "secondary":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-secondary">${btnText}</button>`           
            case "success":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-success">${btnText}</button>`           
            case "danger":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-danger">${btnText}</button>`           
            case "warning":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-warning">${btnText}</button>`           
            case "info":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-info">${btnText}</button>`           
            case "light":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-light">${btnText}</button>`           
            case "dark":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-dark">${btnText}</button>`           
            case "link":
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-link">${btnText}</button>`           
            default:
                return `<button type="button" id="${btnId}" value="${btnValue}" class="btn btn-primary">${btnText}</button>`
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

function renderBootstrapImage(content){
    const {imgURL, altText, imgId} = content
    return `<img src="${imgURL}" class="img-fluid" alt="${altText}">`
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

function renderTeamChoices(target, players){
    const player1 = players[0];
    const player2 = players[1];
    let play = {
        btnType: "success", btnId: "play-btn", btnText: "Play!", btnValue: "Play!", addCustomClassBool: false, customBtnClass: null
    }
    let player1ChoiceText = `${player1.name} is the ${player1.team}.`
    let player2ChoiceText = `${player2.name} is the ${player2.team}.`
    target.innerHTML = `
    <section id="team-choices">
        ${renderHeaders(player1ChoiceText, 1)}
        ${renderHeaders(player2ChoiceText, 1)}
        ${renderBootstrapButton(play)}
    </section>
    `
}

function renderBoard(target, boardContent){
    // SERIOUSLY NEED TO REFACTOR THIS CODE
    // The current advantage of using this render function though instead of hard coding the HTML and then using some sort of hide and show logic is that I at least can get randomly picked mountains to show up every time there's a new board. That's pretty cool! It means every game at least has a little bit of a different experience with the terrain which does have an effect on the strategy.
    
    let topBoard = "";
    let middleBoard = "";
    let bottomBoard = "";
    
    let lTile1ExitContent = "";
    let lTile2ExitContent = "";
    let lTile3ExitContent = "";
    let lTile4ExitContent = "";

    let lTile1NormalContent = "";
    let lTile2NormalContent = "";
    let lTile3NormalContent = "";
    let lTile4NormalContent = "";

    let normalSpacesContent1 = "";
    let normalSpacesContent2 = "";
    let normalSpacesContent3 = "";
    let normalSpacesContent4 = "";
    let normalSpacesContent5 = "";
    let normalSpacesContent6 = "";
    
    // boardContent is an array
    // array contains objects
    // lShaped: true
    // tile: 4
    // type: Exit or Normal (or Mountain in some tiles)
    
    boardContent.forEach(space => {
        if(space.lShaped === true && space.tile === 1 && space.type === "Exit"){
            lTile1ExitContent += `<div class="space exit1" id="sp${space.id}"></div>`
        } 
        else if (space.lShaped === true && space.tile === 2 && space.type === "Exit"){
            lTile2ExitContent += `<div class="space exit2" id="sp${space.id}"></div>`
        } else if(space.lShaped === true && space.tile === 1 && space.type === "Normal"){
            lTile1NormalContent += `<div class="space top-left" id="sp${space.id}"></div>`
        } else if(space.lShaped === true && space.tile === 2 && space.type === "Normal"){
            lTile2NormalContent += `<div class="space top-right" id="sp${space.id}"></div>`
        } else if(space.lShaped === false && space.tile === 1){
            if(space.type === "Mountain"){
                normalSpacesContent1 += `<div class="space mountain" id="sp${space.id}"></div>`
            } else {
                normalSpacesContent1 += `<div class="space" id="sp${space.id}"></div>`
            }
        } else if(space.lShaped === false && space.tile === 2){
            if(space.type === "Mountain"){
                normalSpacesContent2 += `<div class="space mountain" id="sp${space.id}"></div>`
            } else {
                normalSpacesContent2 += `<div class="space" id="sp${space.id}"></div>`
            }
        } else if(space.lShaped === false && space.tile === 3){
            if(space.type === "Mountain"){
                normalSpacesContent3 += `<div class="space mountain" id="sp${space.id}"></div>`
            } else {
                normalSpacesContent3 += `<div class="space" id="sp${space.id}"></div>`
            }
        } else if(space.lShaped === false && space.tile === 4){
            if(space.type === "Mountain"){
                normalSpacesContent4 += `<div class="space mountain" id="sp${space.id}"></div>`
            } else {
                normalSpacesContent4 += `<div class="space" id="sp${space.id}"></div>`
            }
        } else if(space.lShaped === false && space.tile === 5){
            if(space.type === "Mountain"){
                normalSpacesContent5 += `<div class="space mountain" id="sp${space.id}"></div>`
            } else {
                normalSpacesContent5 += `<div class="space" id="sp${space.id}"></div>`
            }
        } else if(space.lShaped === false && space.tile === 6){
            if(space.type === "Mountain"){
                normalSpacesContent6 += `<div class="space mountain" id="sp${space.id}"></div>`
            } else {
                normalSpacesContent6 += `<div class="space" id="sp${space.id}"></div>`
            }
        } else if(space.lShaped === true && space.tile === 3 && space.type === "Normal"){
            lTile3NormalContent += `<div class="space bottom-left" id="sp${space.id}"></div>`
        } else if(space.lShaped === true && space.tile === 4 && space.type === "Normal"){
            lTile4NormalContent += `<div class="space bottom-right" id="sp${space.id}"></div>`
        } else if(space.lShaped === true && space.tile === 3 && space.type === "Exit"){
            lTile3ExitContent += `<div class="space exit3" id="sp${space.id}"></div>`
        } else if (space.lShaped === true && space.tile === 4 && space.type === "Exit"){
            lTile4ExitContent += `<div class="space exit4" id="sp${space.id}"></div>`
        }
    })

    let lTile1Exit = `<section class="l-tile">${lTile1ExitContent}</section>`;
    let lTile2Exit = `<section class="l-tile">${lTile2ExitContent}</section>`;
    let lTile3Exit = `<section class="l-tile">${lTile3ExitContent}</section>`;
    let lTile4Exit = `<section class="l-tile">${lTile4ExitContent}</section>`;

    let lTile1Normal = `<section class="l-tile">${lTile1NormalContent}</section>`;
    let lTile2Normal = `<section class="l-tile">${lTile2NormalContent}</section>`;
    let lTile3Normal = `<section class="l-tile">${lTile3NormalContent}</section>`;
    let lTile4Normal = `<section class="l-tile">${lTile4NormalContent}</section>`;

    let normalSpaces1 = `<section class="tile">${normalSpacesContent1}</section>`;
    let normalSpaces2 = `<section class="tile">${normalSpacesContent2}</section>`;
    let normalSpaces3 = `<section class="tile">${normalSpacesContent3}</section>`;
    let normalSpaces4 = `<section class="tile">${normalSpacesContent4}</section>`;
    let normalSpaces5 = `<section class="tile">${normalSpacesContent5}</section>`;
    let normalSpaces6 = `<section class="tile">${normalSpacesContent6}</section>`;

    topBoard += lTile1Exit;
    topBoard += lTile2Exit;
    topBoard += lTile1Normal;
    topBoard += lTile2Normal;

    middleBoard += normalSpaces1;
    middleBoard += normalSpaces2;
    middleBoard += normalSpaces3;
    middleBoard += normalSpaces4;
    middleBoard += normalSpaces5;
    middleBoard += normalSpaces6;
    
    bottomBoard += lTile3Normal;
    bottomBoard += lTile4Normal;
    bottomBoard += lTile3Exit;
    bottomBoard += lTile4Exit;
    
    target.innerHTML = `
    <section class="board">
        <section class="top">${topBoard}</section>
        <section class="middle">${middleBoard}</section>
        <section class="bottom">${bottomBoard}</section>
    </section>
    `
}


function renderButtons(){} // confirm, back, etc.
function renderCards(){}
function renderPieces(){}

function renderReinforcements(){} // may incorporate this into renderPieces
function renderFire(){}
function renderJeepMovement(){}
function renderMotherRaptorDisappears(){}
function renderMotherRaptorReappears(){}

export {render, renderRemove, renderIntro, renderHowToPlay, renderPickTeams, renderTeamChoices, renderBoard};
