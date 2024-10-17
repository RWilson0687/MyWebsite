//declarations
const computerChoiceDisplay = document.getElementById('computer-choice');
const playerChoiceDisplay = document.getElementById('player-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let playerChoice;
let computerChoice;
let result;
/*
Variable Declarations:
    computerChoiceDisplay, playerChoiceDisplay, resultDisplay: These variables store references to HTML elements where the computer's choice, player's choice, and the result will be displayed. 
        This is done using document.getElementById() to select elements by their IDs.
    possibleChoices: This variable holds all the button elements on the page, which represent the possible choices (Rock, Paper, Scissors). 
        It uses document.querySelectorAll('button') to select all button elements in the document.
    playerChoice, computerChoice, result: These are declared as let variables to store the player's choice, the computer's choice, and the game result, respectively. 
        They are initially undefined.
*/

// Add event listeners to all possible choices
possibleChoices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        playerChoice = e.target.id;
        playerChoiceDisplay.innerHTML = playerChoice;
        generateComputerChoice();
        getResult();
    });
});

/*
Looping Through Choices: 
    The code uses forEach to iterate over each button element stored in possibleChoices, which represents the player's possible choices (Rock, Paper, Scissors).
Adding Event Listeners: 
    For each button (or choice), an event listener is added that listens for a 'click' event. This means that whenever a player clicks one of the buttons, the following occurs:
        Capturing Player Choice: 
            When a button is clicked, the event object (e) is used to get the id of the clicked button, which corresponds to the player's choice (e.g., 'Rock', 'Paper', or 'Scissors'). 
            This value is assigned to the variable playerChoice.
Updating Display: 
    The player's choice is then displayed on the webpage by updating the innerHTML of the playerChoiceDisplay element.
Generating Computer Choice: 
    After the player's choice is captured and displayed, the function generateComputerChoice() is called. This function will randomly select a choice for the computer.
Determining the Result: 
    getResult() is called to evaluate the game outcome based on both the player's and the computer's choices.
Summary: 
    This part of the code essentially sets up the interaction for the player, capturing their choice and updating the game state accordingly
*/

// Generate a random choice for the computer
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    const choices = ['Rock', 'Paper', 'Scissors'];
    computerChoice = choices[randomNumber];
    computerChoiceDisplay.innerHTML = computerChoice;
}
/*
Function Definition: The function is defined using the function keyword, allowing it to be called later in the code.
    Generating a Random Number:
        Math.random() generates a floating-point number between 0 (inclusive) and 1 (exclusive).
        Multiplying this value by 3 gives a number between 0 and just under 3.
        Math.floor() then rounds this number down to the nearest whole number, resulting in a random integer of either 0, 1, or 2.
    Choices Array: An array called choices is created that contains the three possible selections: 'Rock', 'Paper', and 'Scissors'.
    Selecting Computer Choice: The random number generated is used as an index to select one of the options from the choices array. This means:
        If randomNumber is 0, computerChoice will be 'Rock'.
        If randomNumber is 1, computerChoice will be 'Paper'.
        If randomNumber is 2, computerChoice will be 'Scissors'.
    Updating Display: Finally, the computer's choice is displayed on the webpage by updating the innerHTML of the computerChoiceDisplay element.
Summary:
    This function randomly generates a choice for the computer and updates the display accordingly.
*/

// Determine the result of the game
function getResult() {
    if (computerChoice === playerChoice) {
        result = "It's a draw!";
    } else if (
        (computerChoice === 'Rock' && playerChoice === 'Scissors') ||
        (computerChoice === 'Paper' && playerChoice === 'Rock') ||
        (computerChoice === 'Scissors' && playerChoice === 'Paper')
    ) {
        result = 'You lose!';
    } else {
        result = 'You win!';
    }

    resultDisplay.innerHTML = result;
}
/*
The function getResult determines the outcome of the game based on the choices made by the player and the computer. Here’s how it works:
    Function Definition: The function is defined to handle the logic for determining the game's result.
    Checking for a Draw:
        The first condition checks if the player's choice (playerChoice) is the same as the computer's choice (computerChoice). If they are equal, it sets the result to "It's a draw!".
    Checking for Loss Conditions:
        The next else if block contains multiple conditions that check if the player loses:
            If the computer chooses 'Rock' and the player chooses 'Scissors'.
            If the computer chooses 'Paper' and the player chooses 'Rock'.
            If the computer chooses 'Scissors' and the player chooses 'Paper'.
        If any of these conditions are true, it sets the result to "You lose!".
    Winning Case:
        If none of the previous conditions are met, it means the player has won, so it sets result to "You win!".
    Updating Display: Finally, the function updates the innerHTML of the resultDisplay element to show the determined result to the user.
Summary:
    This function evaluates the player's and computer's choices, determines the outcome (draw, win, or lose), and updates the display accordingly.
*/