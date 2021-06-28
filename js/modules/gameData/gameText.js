let introContent = {
    h1Text: "Did you hear that?!",
    imgURL: "https://images.unsplash.com/photo-1610227514387-d50bbb97d1c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    altText: "The jungle awaits",
    pText: "A group of scientists are on the hunt to capture three, live, baby raptors to study and then display in a brand new exhibit. A ferocious mother raptor will never let this happen. She'll either kill all the invading scientists, or hang on long enough to allow three of her babies to escape deep into the jungle, never to be found again.",
    btnText: "Next",
    btnId: "next-btn",
    btnType: "primary",
    btnValue: "Next",
    addCustomClassBool: false,
    customBtnClass: null
}

let howToPlayContent = {
    h1Text: "How to play:",
    imgURL: null,
    altText: null,
    instructions: ["Pick a team.", "Place your pieces in their starting positions.", "Pick a card.", "Take your actionss based on who goes first."],
    victoryConditions: ["Raptors win by helping three baby raptors escape or killing all scientists on the board.", "Scientists win by capturing three baby raptors or neutralizing the mother raptor."],
    btnText: "Ready?",
    btnId: "ready-btn",
    btnType: "primary",
    btnValue: "Ready",
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
        btnValue: "Raptors",
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
        btnValue: "Scientists",
        addCustomClassBool: false,
        customBtnClass: null   
    }
}

let gameCardsContent = [
    {
        name: "Mother's Call and Shuffle", 
        actions: ["Move active baby raptor to free space on tile where mother raptor is located."], 
        notes: ["Shuffles your deck","Babies already on tile can go to another space on the same tile.","Babies cannot move through obstacles."]
    },
    {
        name: "Disappearance and Observation", 
        actions: ["Remove mother raptor from board.","Wait for scientist to spend actions points.","Place mother raptor back on board."], 
        notes: ["Next round, see what card the scientists plays before you choose yours."]
    },
    {
        name: "Fear", 
        actions: ["Frighten one scientist"], 
        notes: ["Scientist is inactive until revived","Scientists cannot be revived the same round they were put to sleep"]
    },
    {
        name: "Mother's Call (x2)", 
        actions: ["Move one or two baby raptors to free space on the tile where the mother raptor is located"], 
        notes: ["Babies on the same tile can move to a new space","There must be an open path for the babies to follow"]
    },
    {
        name: "Recovery (x2)", 
        actions: ["Heal the mother raptor two times, wake up two babies, or do one of both"], 
        notes: []
    },
    {
        name: "Disappearance and Observation", 
        actions: ["Remove the mother raptor","Wait for the scientist to use actions points","Place the mother raptor back on a space"], 
        notes: ["Next round, the raptors get to see what card the scientist will play before revealing theirs."]
    },
    {
        name: "Recovery (x3)", 
        actions: ["Heal the mother raptor three times, wake up three babies, or do a combination of each."], 
        notes: []
    },
    {
        name: "Fear (x2)", 
        actions: ["Frighten one or two scientists"], 
        notes: ["Scientist(s) are inactive until revived","Scientists cannot be revived the same round they were put to sleep"]
    },
    {
        name: "No effect", 
        actions: ["No effect"], 
        notes: []
    },
    {
        name: "Sleeping Gas and Shuffle", 
        actions: ["Put a baby raptor to sleep"], 
        notes: ["Baby raptor cannot be awakened until next round","Only works if the scientist is on the same or an adjacent tile to the baby","Shuffles your deck"]
    },
    {
        name: "Reinforcements", 
        actions: ["Place one or two scientists from the reserve on empty spaces located along the long edges of the board"], notes: ["If you have no scientists left, you're out of reinforcements and do nothing this round!","L-shaped tiles are not permissable landing zones"]
    },
    {
        name: "Jeep (x2)", 
        actions: ["Move one or two scientists with a Jeep."], 
        notes: ["Move as many spaces as you like in an unobstructed straight line","Moving through fire removes it","The same scientist may move as many times as available"]
    },
    {
        name: "Sleeping Gas (x2)", 
        actions: ["Put one or two baby raptors to sleep"], 
        notes: ["Baby raptors cannot be awakened until next round","Only works if the scientist is on the same or an adjacent tile to the baby"]
    },
    {
        name: "Fire (x2)", 
        actions: ["Place two fire tokens on free spaces on the board"], 
        notes: ["Can only be placed adjacent to a scientist or another fire token"]
    },
    {
        name: "Reinforcements", 
        actions: ["Place one or two scientists from the reserve on empty spaces located along the long edges of the board"], notes: ["If you have no scientists left, you're out of reinforcements and do nothing this round!","L-shaped tiles are not permissable landing zones"]
    },
    {
        name: "Fire (x3)", 
        actions: ["Place three fire tokens on free spaces on the board"], 
        notes: ["Can only be placed adjacent to a scientist or another fire token"]
    },
    {
        name: "Jeep (x4)", 
        actions: ["Move up to four scientists with a Jeep."], 
        notes: ["Move as many spaces as you like in an unobstructed straight line","Moving through fire removes it","The same scientist may move as many times as available"]
    },
    {
        name: "No effect", 
        actions: [], 
        notes: []
    }
]

let setupInfoContent = [
    {
        team: "raptors",
        hText: "Turn: Raptors",
        hTextId: "h4-raptor-turn",
        pText: ["Place your mother raptor and baby raptors."],
        pTextId: "p-raptor-text",
        icons: ["../assets/raptor.png", "../assets/baby-raptor.png"],
        numBabies: 5,
        numMother: 1,
        btnText: "Confirm Placement",
        btnId: "confirm-raptor-placement-btn",
        btnType: "warning",
        btnValue: "Confirm Raptor Placement",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        team: "scientists",
        hText: "Turn: Scientists",
        hTextId: "h4-scientist-turn",
        pText: ["Place your scientists."],
        pTextId: "p-scientist-text",
        icons: ["../assets/scientist.png"],
        numScientists: 4,
        btnText: "Confirm Placement",
        btnId: "confirm-scientist-placement-btn",
        btnType: "warning",
        btnValue: "Confirm Scientist Placement",
        addCustomClassBool: false,
        customBtnClass: null
    }
]

let cardChoiceContent = [
    {
        team: "raptors",
        hText: "Turn: Raptors",
        hTextId: "h4-raptor-turn",
        pText: ["Pick a card."],
        pTextId: "p-raptor-text",
        btnText: "Confirm Card",
        btnId: "confirm-raptor-card-btn",
        btnType: "warning",
        btnValue: "Confirm Raptor Card",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        team: "scientists",
        hText: "Turn: Scientists",
        hTextId: "h4-scientist-turn",
        pTextId: "p-scientist-text",
        pText: ["Pick a card."],
        btnText: "Confirm Card",
        btnId: "confirm-scientist-card-btn",
        btnType: "warning",
        btnValue: "Confirm Scientist Card",
        addCustomClassBool: false,
        customBtnClass: null
    }
]

let raptorActionButtonsContent = [
    {
        btnText: "Kill",
        btnId: "raptor-kill-btn",
        btnType: "warning",
        btnValue: "raptor kill action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Put Out Fire",
        btnId: "raptor-put-out-fire-btn",
        btnType: "warning",
        btnValue: "raptor put out fire action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Wake Baby",
        btnId: "raptor-wake-baby-btn",
        btnType: "warning",
        btnValue: "raptor wake baby action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Call Babies",
        btnId: "raptor-call-babies-btn",
        btnType: "warning",
        btnValue: "raptor call babies action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Shuffle Deck",
        btnId: "raptor-shuffle-deck-btn",
        btnType: "warning",
        btnValue: "raptor shuffle deck action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Disappear",
        btnId: "raptor-disappear-btn",
        btnType: "warning",
        btnValue: "raptor disappear action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Observe",
        btnId: "raptor-observe-btn",
        btnType: "warning",
        btnValue: "raptor observe action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Frighten Scientist",
        btnId: "raptor-frighten-scientist-btn",
        btnType: "warning",
        btnValue: "raptor frighten scientist action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Heal",
        btnId: "raptor-heal-btn",
        btnType: "warning",
        btnValue: "raptor heal action",
        addCustomClassBool: false,
        customBtnClass: null
    }
    
]

let scientistActionButtonsContent = [
    {
        btnText: "Shoot",
        btnId: "scientist-shoot-btn",
        btnType: "warning",
        btnValue: "scientist shoot action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Light Fire",
        btnId: "scientist-light-fire-btn",
        btnType: "warning",
        btnValue: "scientist light fire action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Put Baby to Sleep",
        btnId: "scientist-baby-sleep-btn",
        btnType: "warning",
        btnValue: "scientist baby sleep action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Drive Jeep",
        btnId: "scientist-drive-jeep-btn",
        btnType: "warning",
        btnValue: "scientist drive jeep action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Shuffle Deck",
        btnId: "scientist-shuffle-deck-btn",
        btnType: "warning",
        btnValue: "scientist shuffle deck action",
        addCustomClassBool: false,
        customBtnClass: null
    },
    {
        btnText: "Reinforce",
        btnId: "scientist-reinforce-btn",
        btnType: "warning",
        btnValue: "scientist reinforce action",
        addCustomClassBool: false,
        customBtnClass: null
    }
]


export {introContent, howToPlayContent, pickTeamsContent, gameCardsContent, setupInfoContent, cardChoiceContent, raptorActionButtonsContent, scientistActionButtonsContent}