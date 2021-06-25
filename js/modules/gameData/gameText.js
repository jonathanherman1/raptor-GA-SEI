let introContent = {
    h1Text: "Did you hear that?!",
    imgURL: "https://images.unsplash.com/photo-1610227514387-d50bbb97d1c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    altText: "The jungle awaits",
    pText: "A group of scientists are on the hunt to capture three, live, baby raptors to study and then display in a brand new exhibit. A ferocious mother raptor will never let this happen. She'll either kill all the invading scientists, or hang on long enough to allow three of her babies to escape deep into the jungle, never to be found again.",
    btnText: "Next",
    btnId: "next-btn",
    btnType: "primary",
    addCustomClassBool: false,
    customBtnClass: null
}

let howToPlayContent = {
    h1Text: "How to play:",
    imgURL: null,
    altText: null,
    instructions: ["Pick a team.", "Place your pieces in their starting positions.", "Pick a card.", "Take your actions based on who goes first."],
    victoryConditions: ["Raptors win by helping three baby raptors escape or killing all scientists on the board.", "Scientists win by capturing three baby raptors or neutralizing the mother raptor."],
    btnText: "Ready?",
    btnId: "ready-btn",
    btnType: "primary",
    addCustomClassBool: false,
    customBtnClass: null
}

let pickTeamsContent = {
    h1Text: "Player 1, pick a team",
    raptors: {
        h2Text: "Raptors",
        imgURL: "https://images.unsplash.com/photo-1606856110002-d0991ce78250?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        altText: "A raptor showing its teeth in the jungle.",
        pText: "Conquer with swift aggression.",
        btnText: "Play Raptors",
        btnId: "play-raptors-btn",
        btnType: "primary",
        addCustomClassBool: false,
        customBtnClass: null
    },
    scientists: {
        h2Text: "Scientists",
        imgURL: "https://images.unsplash.com/photo-1584696993692-a53190f76609?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80",
        altText: "A smirking man in the jungle holding a machete.",
        pText: "Reinforce your foothold in the jungle.",
        btnText: "Play Scientists",
        btnId: "play-scientists-btn",
        btnType: "primary",
        addCustomClassBool: false,
        customBtnClass: null   
    }
}


export {introContent, howToPlayContent, pickTeamsContent}