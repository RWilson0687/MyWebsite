//cardArray Definition: 
const cardArray = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'icecream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'icecream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
];

/*
Constant Declaration:
    const cardArray = [...]:
        This line declares a constant variable named cardArray that will hold an array of card objects. 
        Using const indicates that this variable reference cannot be reassigned, though the contents of the array can be modified.
Array of Objects:
    The array consists of multiple objects, each representing a card. Each object contains two properties:
        name: A string that represents the name of the card (e.g., 'fries', 'cheeseburger').
        img: A string that specifies the path to the image associated with the card (e.g., 'images/fries.png').
Duplicate Cards:
    The cards are designed to have pairs (two cards of the same type). 
    For example, 'fries' appears twice, as do 'cheeseburger', 'hotdog', 'icecream', 'milkshake', and 'pizza'. 
    This duplication is essential for the mechanics of a memory game, where players must find matching pairs.
Summary
    The cardArray serves as the foundational data structure for the memory game. 
    It defines the types of cards available in the game, including their names and associated images. 
    By including duplicates, it ensures that there are pairs for players to match, which is a core element of the game’s functionality.
    If you have specific questions about this part or want to explore other aspects of the code, let me know!
*/

// Shuffle the cards
cardArray.sort(() => 0.5 - Math.random());

/*
Purpose:
    This line shuffles the cardArray so that the order of the cards is randomized each time the game starts. 
    This ensures that players have a different layout of cards in each game session, enhancing replayability.
Method:
    The sort() method is used with a comparison function that generates a random number. 
    The expression 0.5 - Math.random() produces a value between -0.5 and 0.5, which helps to randomly sort the elements in the array.
*/

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

/*
Selecting DOM Elements:
    const gridDisplay = document.querySelector('#grid');:
        This line selects the HTML element with the ID grid, which will serve as the container for displaying the cards in the game.
    const resultDisplay = document.querySelector('#result');:
        This line selects the HTML element with the ID result, which will be used to display the current score or results (like the number of matches found).
Game State Variables:
    let cardsChosen = [];:
        This array will keep track of the names of the cards that the player has selected during the game.
    let cardsChosenIds = [];:
        This array will store the IDs of the selected cards (corresponding to their position in the cardArray). This is necessary for checking if two chosen cards match.
    const cardsWon = [];:
        This array will hold the cards that have been matched successfully. It keeps a count of how many pairs have been found.

Summary
    This section of the code handles two main tasks: 
            Shuffling the cards to ensure a random layout for each game
            Setting up essential variables for tracking the state of the game. 
        The chosen cards and their IDs are prepared to facilitate matching logic, while the DOM elements are selected for rendering the game interface
*/

// Create the game board: This function, createBoard, is responsible for setting up the visual layout of the game by generating the cards that players will interact with.
function createBoard() {
    cardArray.forEach((_, i) => {
    /*
    Looping Through the Card Array
        Method: The forEach method is used to iterate over each item in the cardArray.
        Parameters:
            The first parameter is an underscore (_), which is a common convention in JavaScript to indicate that the first argument (the actual card object) is not being used in this loop.
            The second parameter, i, represents the index of the current card in the array.
    */
        const card = document.createElement('img');
        //Creating Card Elements: For each card in the cardArray, a new <img> element is created. This will represent the card visually in the game.
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        /*
        Setting Attributes
            Image Source:
                card.setAttribute('src', 'images/blank.png'); sets the initial image of the card to a "blank" image. 
                This is what players will see before they flip the cards.
            Data Attribute:
                card.setAttribute('data-id', i); assigns a unique identifier to each card using the data-id attribute. 
                This ID corresponds to the index of the card in the cardArray, which will be crucial later for matching logic.
        */
        card.addEventListener('click', flipCard);
        //Adding Click Event Listener: This line adds a click event listener to the card. When the card is clicked, the flipCard function will be executed, allowing the player to reveal the card's image.
        gridDisplay.appendChild(card);
        //Appending the Card to the Grid: Through DOM manipulation, the newly created card (the <img> element) is appended to the gridDisplay, which is the container element for the game board. 
        //This adds the card to the visual layout of the game.
    });
}

createBoard();

// Check for matches: This function checks if the two cards selected by the player are a match and handles the logic for either finding a match or resetting the cards.
function checkMatch() {
    const cards = document.querySelectorAll('img');
    //Selecting All Cards: This line selects all <img> elements on the page (representing the cards) with a DOM Query, and stores them in the cards variable.
    const [optionOneId, optionTwoId] = cardsChosenIds;
    //Destructuring Chosen Card IDs: This line uses array destructuring to extract the two selected card IDs from the cardsChosenIds array and assigns them to optionOneId and optionTwoId.

    if (optionOneId === optionTwoId) {
        alert('You have clicked the same image!');
        resetSelectedCards(cards);
        return;
    }
    /*
    Checking for Same Card Click
        Condition: This checks if the IDs of the two selected cards are the same.
        Alert: If they are the same, it alerts the player that they clicked the same image.
        Resetting Cards: The resetSelectedCards(cards) function is called (assumed to be defined elsewhere) to reset the selected cards back to their original state.
        Return: The function exits early to prevent further checks.
    */

    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!');
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    /*
    Checking for a Match
        Match Condition: This checks if the names of the two chosen cards are the same.
        Alert: If they match, it alerts the player that they found a match.
        Updating Images: The source of both matched cards is set to a white image ('images/white.png'), visually indicating they are matched.
        Removing Event Listeners: The event listeners for these cards are removed, preventing them from being clicked again.
        Updating Wins: The matched cards are added to the cardsWon array.
    */

    } else {
        resetSelectedCards(cards);
        alert('Sorry, try again!');
    }
    /*
    Handling No Match
        No Match Condition: If the selected cards do not match, the resetSelectedCards(cards) function is called again to reset their appearance.
        Alert: The player is informed that they should try again.
    */

    resultDisplay.textContent = cardsWon.length;
    //Updating Result Display: This updates the display showing how many pairs the player has found.

    // Check for win condition
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = "Congratulations! You found them all!";
    }
    /*
    Checking for Win Condition
        Win Check: This checks if the number of matched pairs equals half the total number of cards (since each match consists of two cards).
        Win Message: If the condition is met, it updates the result display to congratulate the player.
    */

    // Reset chosen cards
    cardsChosen = [];
    cardsChosenIds = [];
    //Resetting Selected Cards: The cardsChosen and cardsChosenIds arrays are reset to be empty, preparing for the next pair of card selections.
/*
Summary
    The checkMatch function is responsible for validating whether two selected cards match. 
    It manages the game logic by providing feedback to the player, updating the game state, and checking for win conditions. 
    It enhances the interactivity of the game by ensuring players receive immediate responses to their actions.
*/
}

// Reset the images of selected cards: This function resets the images of the two selected cards to their original "blank" state.
function resetSelectedCards(cards) {
    const [optionOneId, optionTwoId] = cardsChosenIds;
    //Destructuring Selected Card IDs: This line uses array destructuring to extract the IDs of the two selected cards from the cardsChosenIds array. 
    //It assigns the first ID to optionOneId and the second ID to optionTwoId.
    cards[optionOneId].setAttribute('src', 'images/blank.png');
    cards[optionTwoId].setAttribute('src', 'images/blank.png');
    //Resetting Card Images: Here, the source attribute (src) of both selected cards is set to 'images/blank.png'.
    //This changes their displayed images back to the blank state (indicating that they are not currently selected).
}

// Flip a card: This function is executed whenever a card is clicked. It manages the selection of the card and initiates the process to check for matches.
function flipCard() {
    const cardId = this.getAttribute('data-id');
    //Retrieving Card ID: This line retrieves the data-id attribute of the clicked card (referenced by this). This ID corresponds to the index of the card in the cardArray.
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    //Storing Names and IDs: The name of the clicked card is added to the cardsChosen array, and its ID is added to the cardsChosenIds array. This helps keep track of the currently selected cards.
    this.setAttribute('src', cardArray[cardId].img);
    //Flipping the Card: The image of the clicked card is updated to show the corresponding image from the cardArray. This visually indicates to the player which card they have selected.

    // Check for a match after two cards are chosen
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
    //Delay for User Experience: This condition checks if two cards have been selected. If true, it uses setTimeout to call the checkMatch function after a 500 milliseconds delay. 
    //This allows the player to see the second card before the game checks for a match, improving the user experience

    /*
    Summary
        The flipCard function effectively handles the process of selecting a card in the game. 
        It updates the card's visual representation, tracks the selected cards, and manages the timing for checking matches. 
        This function is essential for the game's interactivity, as it responds to player actions and facilitates the matching logic.
    */
}