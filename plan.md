# Plan for Coding Raptor

## User Stories
- As a user (AAU), I need hotseat play at a minimum so I can play against a friend in person.
- AAU, I expect to see a splash screen that welcomes me to the game and briefly introduces how to play.
- AAU, I need mobile features such as drag and drop.
- AAU, I expect the game to provide full accessibility.
- AAU, I need to pick a team.
- AAU, I expect the game to assign the other player the opposite team.
- AAU, I expect to see a blank game board with instructions on how to proceed.
- AAU, I need to place my pieces on the board.
- AAU, I need to pick and confirm a card to play.
- AAU, I expect the game to select the correct player to go first.
- AAU, I need to take my turn by playing an action or actions.
  - As temporary player 1 (ATP1), I need to play special actions.
  - As temporary player 2 (ATP2), I need to play regular actions.
- AAU, I expect the game to allow the next player to take their turn.
- AAU, I expect the game to refresh my hand to three cards.
- AAU, I expect the game to shuffle my deck if it's empty.
- AAU, I expect the game to check after each action for victory conditions.
- AAU, I expect a light and dark mode available for easy viewing.
- AAU, I expect a flawless experience with no bugs, lags, or errors.

Future enhancements:

- AAU, I want a tutorial that can show me how to play OR easy to access rules on gameplay while playing.
- AAU, I want to see more in-app feedback as I do things so I'm reassured of my choices.
- AAU, I want a user profile that can save features and customize my experience.
- AAU, I want to view a history of my games.
- AAU, I want to play against the computer.
- AAU, I want to play a single player campaign.
- AAU, I want to play against other players anywhere in the world through server play.
- AAU, I want to play an expansion that includes additional factions and expanded maps.

## Pseudocode

- [x] 1. File setup: Connect Bootstrap and local files to `index.html` and modules to `app.js`.
- [x] 2. Prepare to initialize game.
  - [x]    1. Add empty `init()` to `app.js`
  - [x]    2. Add empty `render()`
  - [x]    3. Add variables: `gameActive`, `board`, `activePlayer`, `numActionPoints`, `actionsTaken`, `players`
  - [x]    4. Render welcome: Add HTML for overlay, form to collect player names, and new game button
  - [x]    5. Cache new game button as `newGameBtn`
  - [x]    6. Add `handleNewGame()` function
  - [x]    7.  Add event listener with `handleNewGame` to new game button.
     - [x]    1.  Invoke `init(name1, name2)`
         - [x]    1.  Copy `players` to `players`
         - [x]    2.  Copy `board`   to `board`
         - [x]    3.  Copy `teams`   to `teams`
         - [x]    4.  Copy `cards`   to `cards`
         - [x]    5.  Copy `rounds` to `rounds`
         - [x]    6.  Update player names
     - [x]    2. Remove elements from previous screen
- [x] 3. Intro the game.
  - [x]    1. Render intro: Add HTML for game title, welcome image, game overview, and next button
  - [x]    2. Add modules directory
  - [x]    3. Add gameData directory 
  - [x]    4. Add gameText.js module containing the above content
  - [x]    5. Add `handleNext()` function to move to how to play
- [x] 4. Display how to play.
  - [x]    1. Render how to play: Add HTML for how to play title, paragraphs, and ready to play button
  - [x]    2. Add `handleReadyToPlay()` function
  - [x]    3. Add event listener with `handleReadyToPlay` to ready button
- [x] 5. Player picks a team. The game assigns the opposite team to the other player. Display selected teams.
  - [x]    1. Render pick teams: Add HTML for two cards to select teams and instructions inside of `div#pick-team`.
  - [x]    2. Add `handlePickTeam()` function
  - [x]    3. Add event listener with `handlePickTeam` to div
     - [x]    1. Update `players` arr
     - [x]    2. Render choices: HTML showing two cards displaying selected teams
     - [x]    3. Remove HTML showing selected teams
- [x] 6. Raptors place starting pieces.
  - [x]    1. Add `createBoard()` function, and call it in `init()`
  - [x]    2. Render game board, turn, instructions
  - [x]    3. Render raptor pieces
  - [x]    4. Cache `gameTray`, `instructions`, `piecesTray`
  - [ ]    5. Add mouse and touch event handlers
    - [x]    1. Add touch event handlers
    - [ ]    2. Add placement validation for touch events
    - [ ]    3. Add mouse event handlers
    - [ ]    4. Add placement validation for mouse events
  - [x]    6. Add mouse and touch event listeners with handlers.
  - [x]    7. Update `board` and `raptors` team state as raptors are placed
  - [x]    8. Add HTML for confirm placement button when all raptors are placed `confirmPlacementBtn`
  - [x]    10. Confirm placement of raptors
  - [x]    11. Remove confirm placement button
- [ ] 7. Scientists place starting pieces.
  - [x]    1. Render scientist pieces
  - [x]    2. Cache scientist pieces
  - [ ]    3. Update `board` and `scientists` team state as scientists are placed
  - [ ]    4. Confirm placement of scientists
  - [ ]    5. Remove confirm placement button
- [ ] 8. Raptors pick a card and confirm it.
  - [ ]    1. Render raptor cards
  - [ ]    2. Add `handlePickCard()` function to event listener attached to `gameControlsDiv`
  - [ ]    3. Add confirm and back buttons to HTML
  - [ ]    4. Listen to these buttons
  - [ ]    5. Remove buttons once raptor choice confirmed
- [ ] 9.  Scientists pick a card and confirm it.
   - [ ]    1.  Render scientist cards
   - [ ]    2.  `handlePickCard` records choice in `round`
   - [ ]    3.  Render confirm and back buttons
   - [ ]    4.  Handle confirm or back
- [ ] 10. Determine initiative: 
   - [ ]    1.  Add `determineInitiative()` function
   - [ ]    2.  Invoke `determineInitiative` after scientists confirm card choice
       - [ ]    1.  If tie, draw a new card to return to a hand of three cards with `dealCard()` function
       - [ ]    2.  Repeat steps for picking cards
- [ ] 11. (Temporary) player 1 is the player who picked the lower card. Player 1 plays their special action, if possible.
   - [ ]    1.  Add validity check functions
   - [ ]    2.  Add special action functions for raptors and scientists
- [ ] 12. The game processes state and renders based on special action. If victory achieved, game ends.
   - [ ]    1.  Add victory check functions
- [ ] 13. Player 1 draws a card to return to a hand of three cards.
   - [ ]    1.  Call `dealCard`
- [ ] 14. Player with the higher card goes second and plays their regular actions, if any. 
   - [ ]    1.  Add regular action functions for raptors and scientists
- [ ] 15. The game processes state and renders based on regular action(s). If victory achieved, game ends.
- [ ] 16. Player 2 draws a card to return to a hand of three cards.

### Model

#### JavaScript

Game:

- `gameActive: bool`
- `initialRaptorPlacementConfirmed: bool`
- `initialScientistPlacementConfirmed: bool`

- rounds `arr`
  - round `obj`
    - `id: int` (ex. 1)
    - `name: str` (ex. Round 1)
    - `raptorCardChoice` (set by link to a card)
    - `scientistCardChoice` (...)
    - `activePlayer`
    - `activeTeam` // could be valuable with expansions if one player is controlling more than one team
    - `activeCard` // for special action
    - `numActionPoints: int` // for regular action(s)
    - `actionsTaken: arr`
      - `action: obj`
      - `team: str`
      - `type: str` (regular or special)

Players:

- players `arr`
  - player `obj`
    - `name: str`
    - `team: str`

Teams:

- raptors `arr`
  - raptor `obj`
    - `id: str` (ex. r1)
    - `health: int` (5 if mother raptor; 1 if baby raptor)
    - `awake: bool`
    - `mother: bool`
    - `location: int`
- scientists `arr`
  - scientist `obj`
    - `id: str` (ex. s1)
    - `health: int` (1)
    - `awake: bool`
    - `aggressiveActionTaken: bool` (resets next turn)
    - `location: int`

Locations:

- board `arr`
  - space `obj`
    - `id: int`
    - `tile: int` (part of tile 1-6)
    - `lShaped: bool` (L-shaped tile)
    - `type: str` (mountain, normal, exit)
    - `environment: str` (jungle, desert)
    - `occupied: bool`
    - `occupiedBy: str` (link to piece id)
    - `hasFire: bool` (only possible on normal)

Cards & Actions:

- cards `obj`
  - raptorCards `arr`
    - card1 `obj`
      - `id: str` (ex. cardR1)
      - `value: int` (ex. 1)
      - `team: str` (pull reference from teams)
      - `name: str` (ex. Mother's Call and Shuffle)
      - `actions: arr` (ex. Move active baby raptor to free space on tile where mother raptor is located.)
      - `notes: arr`
      - `usedThisRound: bool`
      - `usedAsSpecial: bool`
    - card2 ... card9
  - scientistCards `arr`
    - card1 ... card9 `obj`

Help Text: `obj`
- background `obj`
- overview `obj`
- how to play `obj`
- end of game `arr`
  - raptor victory
  - scientist victory `obj`
- rules `arr`
  - general `obj`
  - determine who goes first `obj`
  - regular actions `arr`
    - raptor `obj`
    - scientist `obj`
  - special actions `arr`
    - raptor `obj`
    - scientist `obj`
- tips `obj`


### Controller

Setup:
- init() // makes the game active
- createBoard()
- placeStartingPieces() // probably unnecessary since these steps will be broken into separate funcs called in the event listeners

Cached Game Elements:
- gameControlsDiv // area above board where pieces to place, cards to pick, and confirm buttons display
- newGameBtn
- pickTeamDiv
- readyToPlayBtn
- boardEl
- raptorEl
- scientistEl
- confirmPlacementBtn

Event Handlers:
- handleNewGame()
- handleNext()
- handleReadyToPlay()
- handlePickTeam()
- handlePlay()
- handlePieceClick()
- handlePickCard()
- handleRaptorPiecesPlaced()
- handleScientistPiecesPlaced()

General Actions:
- shuffleDeck(team)
- dealCard(team)
- determineInitiative()
- move(piece)
- wake(piece)
- putOutFire(piece)

Scientist Regular Actions:
- sleepBabyRaptor()
- captureBabyRaptor()
- shootMotherRaptor()

Raptor Regular Actions:
- killScientist()

Scientist Special Actions:
- sleepGas()
- reinforceScientists()
- driveJeep()
- lightFire()

Raptor Special Actions:
- callBabyRaptors()
- disappearAndObserve()
- frightenScientist()
- recoverHealth()

Validity:
- isOrthogonal()
- isNotOccupied()
- isNotObstructed()
- isAllowedToExit()
- isAwake()
- canBeAwakened()
- hasActionPoints()
- hasAggressiveActions()

Victory:
- checkVictoryConditions() // flips game to inactive and assigns winner

Helpers:
- randomNum()
- Touch Events: (// "event type")
  - handleDown() // "touchstart"
  - handleMove() // "touchmove"
  - handleEnd() // "touchend"
  - setTranslate() // used inside of handleMove
- Mouse Events:
  - handleDrop() // "drop"
  - handleDragStart() // "dragstart"
  - handleDragEnd() // "dragend"
  - handleDragOver() // "dragover"
  - handleDragEnter() // "dragenter"
  - handleDragLeave() // "dragleave"

### View

- render()
  - renderWelcome()
  - renderIntro()
  - renderHowToPlay()
  - renderPickTeams()
  - renderTeamChoices()
  - renderButtons() // confirm, back, etc.
  - renderRemove() // for removing elements
  - renderCards()
  - renderPieces()
  - renderBoard()
  - renderReinforcements() // may incorporate this into renderPieces
  - renderFire()
  - renderJeepMovement()
  - renderMotherRaptorDisappears()
  - renderMotherRaptorReappears()

#### HTML & CSS
- The goal here is to hard code the minimum number of elements on the page.
  - At most, create opening boilerplate with:
    - New game:
      - Title of the game
      - Welcome message
      - Instructions and rules on playing
      - Team select
  - Other considerations:
    - CSS Flexbox for `<body>`
    - CSS Grid in a `<section>` for game board
    - Splash screen image(s) `<img>`
    - Game board with distinct terrain types (modularity)
    - Raptor playing pieces (v1: icon, v2: image)
    - Scientist playing pieces
    - Fire tokens
    - Raptor playing cards
    - Scientist playing cards
    - Confirm card choice `<button>`
    - Display initiative
    - Display actions taken
    - New game/play again `<button>`
    - Victory progress indicators and other indicators
      - Number of regular actions available
      - Number of baby raptors escaped
      - Number of baby raptors captured
      - Number of current hits on mother raptor
      - Number of scientists remaining on the board  
      - Number of scientists remaining in reserve
      - Victory and defeat messages

## Background
This app is a board game converted for play in a web browser. This simplifies setup and gameplay. The first iteration of the app will be hotseat play in the same session. Eventually, AI and remote play with a server can be supported.

## Game Overview
A group of scientists are on the hunt to capture three, live, baby raptors to study and then display in a brand new exhibit. A ferocious mother raptor will never let this happen. She'll either kill all the invading scientists, or hang on long enough to allow three of her babies to escape deep into the jungle, never to be found again.

## How to Play
1. Pick a team.
2. Place your pieces in their starting positions.
3. Pick a card.
4. Take your actions based on who goes first.

## End of the Game
### Raptor Victory
- Three baby raptors escaped
  
  OR

- No more scientists on the board

### Scientist Victory
- Three baby raptors captured
  
  OR

- Mother raptor neutralized with 5 sleep tokens

## Rules
### General
- All gameplay is orthogonal (no diagonals).
- Only one piece or token per space.
- No piece can ever move through another piece, even if on the same team.
- Exits are only accessible to baby raptors. Baby raptors must use "Move a baby raptor" action to escape.
- Wounded mother raptor loses movement based on the number of times she has been hit.
- Scientists have unlimited ammunition and fire.
  
### Determine Who Goes First Each Round
- Lower cards go first and perform a special action.
- Higher cards go second and perform a regular action(s). 
- The number of available regular actions is the difference of the card values.
  - For example, a card with a value of 2 and a card with a value of 6 were played. 
  - The player who played the card with 2 performs its special action. 
  - Now, 6 - 2 gives the other player 4 regular action points to use.

### Take Action!
- Each regular action for raptors and scientists costs ONE (1) action point.
- For determinining the number of actions you can take, see "Determining Who Goes First Each Round".
- Only active pieces can take actions.
- You can choose to not use regular actions.
- Only ONE (1) aggressive action (put to sleep, capture, or shoot) per scientist per round.
- Fire:
  - Raptors can never move to or through fire.
  - Scientists can move and shoot through fire, but cannot end their movement in fire.
  - When the mother raptor removes fire, all adjacent (connected) fire is removed.
  - When scientists drive a jeep through fire, it removes the fire.
- Frightened and Sleep:
  - Baby raptors cannot be revived the same round they were put to sleep.
  - Frightened scientists cannot be revived the same round they were frightened.
- Reinforcements (scientists):
  - Scientists have a fixed number of reinforcements; you can never receive more scientists than in your reserve.
  - Reinforcements can only be placed on the edge of the board, and never in the L-shaped tiles.
- Recovery (raptors):
  - The effect of cards 5 and 7 can be split between the mother and baby raptors.
- Kills:
  - When a scientist dies, it is removed from the game.

#### Raptor Actions
##### Regular Actions
Each regular action costs 1 action point.
- Move a baby raptor
- Move the mother raptor
- Kill a scientist
- Wake up a baby raptor
- Put out a fire
##### Special Actions
- Card 1: Mother's Call and Shuffle
  - Actions:
    1. Move active baby raptor to free space on tile where mother raptor is located.
  - Notes:
    - Shuffles your deck
    - Babies already on tile can go to another space on the same tile.
    - Babies cannot move through obstacles. 
- Card 2: Disappearance and Observation
  - Actions:
    1. Remove mother raptor from board.
    2. Wait for scientist to spend action points.
    3. Place mother raptor back on board.
  - Notes:
    - Next round, see what card the scientists plays before you choose yours.
- Card 3: Fear
  - Actions:
    1. Frighten one scientist
  - Notes:
    - Scientist is inactive until revived
    - Scientists cannot be revived the same round they were put to sleep
- Card 4: Mother's Call (x2)
  - Actions:
    1. Move one or two baby raptors to free space on the tile where the mother raptor is located
  - Notes:
    - Babies on the same tile can move to a new space
    - There must be an open path for the babies to follow
- Card 5: Recovery (x2)
  - Actions:
    1. Heal the mother raptor two times, wake up two babies, or do one of both
- Card 6: Disappearance and Observation
  - Actions:
    1. Remove the mother raptor
    2. Wait for the scientist to use action points
    3. Place the mother raptor back on a space
  - Notes:
    - Next round, the raptors get to see what card the scientist will play before revealing theirs.
- Card 7: Recovery (x3)
  - Actions:
    1. Heal the mother raptor three times, wake up three babies, or do a combination of each.
- Card 8: Fear (x2)
  - Actions:
    1. Frighten one or two scientists
  - Notes:
    - Scientist(s) are inactive until revived
    - Scientists cannot be revived the same round they were put to sleep
- Card 9: No effect
#### Scientist Actions
##### Regular Actions
Each regular action costs 1 action point.

*Each scientist gets only ONE aggressive action per round.
- Move a scientist
- Stand a scientist back up
- Put a baby raptor to sleep*
- Capture a sleeping baby raptor*
- Shoot the mother raptor*
##### Special Actions
- Card 1: Sleeping Gas and Shuffle
  - Actions:
    1. Put a baby raptor to sleep
  - Notes:
    - Shuffles your deck
    - Only works if the scientist is on the same or an adjacent tile to the baby
    - Baby raptor cannot be awakened until next round
- Card 2: Reinforcements
  - Actions:
    1. Place one or two scientists from the reserve on empty spaces located along the long edges of the board
  - Notes:
    - L-shaped tiles are not permissable landing zones
    - If you have no scientists left, you're out of reinforcements and do nothing this round!
- Card 3: Jeep (x2)
  - Actions:
    1. Move one or two scientists with a Jeep.
  - Notes:
    - The same scientist may move twice
    - Jeep movement:
      - Move as many spaces as you like in an unobstructed straight line
      - Moving through fire removes it
- Card 4: Sleeping Gas (x2)
  - Actions:
    1. Put one or two baby raptors to sleep
  - Notes:
    - Only works if the scientist is on the same or an adjacent tile to the baby
    -  Baby raptors cannot be awakened until next round
- Card 5: Fire (x2)
  - Actions:
    1. Place two fire tokens on free spaces on the board
  - Notes:
    - Can only be placed adjacent to a scientist or another fire token
- Card 6: Reinforcements
  - Actions:
    1. Place one or two scientists from the reserve on empty spaces located along the long edges of the board
  - Notes:
    - L-shaped tiles are not permissable landing zones
    - If you have no scientists left, you're out of reinforcements and do nothing this round!
- Card 7: Fire (x3)
  - Actions:
    1. Place three fire tokens on free spaces on the board
  - Notes:
    - Can only be placed adjacent to a scientist or another fire token
- Card 8: Jeep (x4)
  - Actions:
    1. Move up to four scientists with a Jeep.
  - Notes:
    - The same scientist may move as many times as available
    - Jeep movement:
      - Move as many spaces as you like in an unobstructed straight line
      - Moving through fire removes it
- Card 9: No effect

## Bugs
- [ ] Fix raptor validation in beginning setup
  - [ ] No piece can occupy the same space at the same time
  - [ ] Mother cannot go where baby raptor is
  - [ ] Baby raptors cannot share tiles
- [x] Confirm placement button should switch to scientist button
- [x] Remove raptor instructions