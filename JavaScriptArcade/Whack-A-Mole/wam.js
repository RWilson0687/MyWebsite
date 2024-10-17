//This piece of code initializes variables and selects DOM elements for a Whac-A-Mole game.
const squares = document.querySelectorAll('.square');
const timeLeftDisplay = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#score');

let score = 0;
let hitPosition;
let timeRemaining = 60;
let moleTimerId = null;
let countDownTimerId = null;
/*
    Element Selection:
        const squares = document.querySelectorAll('.square');: This line selects all elements in the document with the class .square and stores them in the squares variable. This is likely an array-like collection of squares where moles will appear.
        const timeLeftDisplay = document.querySelector('#time-left');: This selects the element with the ID time-left, which will display the remaining time for the game.
        const scoreDisplay = document.querySelector('#score');: This selects the element with the ID score, which will display the player's score.
    Game State Variables:
        let score = 0;: Initializes a variable score to keep track of the player's score, starting at 0.
        let hitPosition;: This variable will store the ID of the square that currently has the mole, allowing the game to check if the player clicks the correct square.
        let timeRemaining = 60;: Initializes a variable to track the remaining time for the game, starting at 60 seconds.
        let moleTimerId = null;: This will hold the timer ID for the mole's movement, allowing the game to control when the mole appears in different squares.
        let countDownTimerId = null;: This will hold the timer ID for the countdown, allowing the game to control the remaining time display.
Summary:
    In essence, this code sets up the basic state for the game by selecting the necessary elements from the DOM and initializing variables that will be used to track the game score, the position of the mole, and the countdown timer.
*/

// Function to randomly select a square for the mole to appear
function randomSquare() {
    squares.forEach(square => square.classList.remove('mole'));

    const randomIndex = Math.floor(Math.random() * squares.length);
    const selectedSquare = squares[randomIndex];
    selectedSquare.classList.add('mole');

    hitPosition = selectedSquare.id;
}
/*
    Remove Existing Mole:
        squares.forEach(square => square.classList.remove('mole'));: This line iterates through all the squares and removes the mole class from each one. 
        This effectively hides the mole from all squares before selecting a new one.
    Select a Random Square:
        const randomIndex = Math.floor(Math.random() * squares.length);: This generates a random index based on the total number of squares. 
        The Math.random() function returns a floating-point number between 0 (inclusive) and 1 (exclusive). 
        This is then multiplied by the length of the squares array. Math.floor() rounds down to the nearest whole number, ensuring the index is valid.
    Add Mole to Selected Square:
        const selectedSquare = squares[randomIndex];: This line retrieves the square at the randomly generated index.
        selectedSquare.classList.add('mole');: The mole class is added to the selected square, making it visible to the player.
    Update Hit Position:
        hitPosition = selectedSquare.id;: This sets the hitPosition variable to the ID of the square where the mole has appeared. 
        This ID will be used later to check if the player successfully hits the mole when they click on a square.
Summary:
    Overall, this function randomly selects one of the squares for the mole to appear in by first hiding the mole in all squares, then choosing one randomly, 
    displaying the mole in that square, and updating the position of the mole for later hit detection.
*/

// Event listener for squares to detect hits
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            score++;
            scoreDisplay.textContent = score;
            hitPosition = null; // Reset hit position
        }
    });
});
/*
This code adds event listeners to each square in the game to detect when a player successfully "hits" the mole. Here's a breakdown of its functionality:
    Iterate Over Squares:
        squares.forEach(square => { ... });: This line loops through each square in the squares array, allowing you to add functionality to each individual square.
    Add Event Listener:
        square.addEventListener('mousedown', () => { ... });: For each square, an event listener is added that listens for a mousedown event. 
        This means the code inside the arrow function will execute when the player clicks (or presses down on) that square.
    Check for Hit:
        if (square.id === hitPosition) { ... }: This condition checks if the ID of the square that was clicked matches the hitPosition (the square where the mole currently appears). 
        If it does, it means the player successfully hit the mole.
    Update Score:
        score++;: If the player hit the mole, the score is incremented by 1.
    Display Updated Score:
        scoreDisplay.textContent = score;: This updates the score display on the user interface to reflect the new score.
    Reset Hit Position:
        hitPosition = null;: After a successful hit, the hitPosition is reset to null. This ensures that the next click will need to match a new position, as the mole will soon appear in a different square.
Summary:
    Overall, this code allows the game to register player clicks on the squares. If the player clicks on the square where the mole is located, the score increases, and the display is updated accordingly. 
    It effectively handles user interaction for scoring in the game.
*/

// Function to move the mole at intervals
function moveMole() {
    moleTimerId = setInterval(randomSquare, 1000);
}
/*
This code defines a function called moveMole, which is responsible for periodically changing the position of the mole in the game.
    Define Function:
        function moveMole() { ... }: This declares the moveMole function, which will contain the logic to move the mole.
    Set Interval:
        moleTimerId = setInterval(randomSquare, 1000);: This line uses setInterval to repeatedly call the randomSquare function every 1000 milliseconds (or 1 second).
        The setInterval function returns an ID (moleTimerId) that can be used later to clear the interval if needed (e.g., when the game ends).
Summary:
    The moveMole function initiates a timer that changes the mole's position every second by calling the randomSquare function. 
    This creates the gameplay dynamic where players have to hit the mole within a limited timeframe, increasing the challenge and engagement of the game.
*/

// Countdown function for game duration
function countDown() {
    timeRemaining--;
    timeLeftDisplay.textContent = timeRemaining;

    if (timeRemaining === 0) {
        clearInterval(countDownTimerId);
        clearInterval(moleTimerId); // Stop the mole from moving
        alert('GAME OVER! Your final score is ' + score);
    }
}
/*
This code defines a function called countDown, which manages the countdown timer for the game.
    Decrease Time:
        timeRemaining--;: This line decrements the timeRemaining variable by 1 each time the function is called, effectively counting down the time.
    Update Display:
        timeLeftDisplay.textContent = timeRemaining;: This updates the displayed time left on the screen to reflect the current value of timeRemaining.
    Check for Game Over:
        if (timeRemaining === 0) { ... }: This condition checks if the countdown has reached zero.
        Inside this conditional block:
            clearInterval(countDownTimerId);: This stops the countdown timer from continuing.
            clearInterval(moleTimerId);: This stops the mole from moving by clearing its movement timer.
            alert('GAME OVER! Your final score is ' + score);: This displays an alert to the player indicating that the game is over and shows their final score.
Summary:
    The countDown function is responsible for managing the game's timer, updating the display, and determining when the game ends. When the time runs out, it stops the mole's movement, halts the countdown, and alerts the player with their score.
*/

// Start the mole movement and countdown
moveMole();
countDownTimerId = setInterval(countDown, 1000);
/*
This code is responsible for initiating the mole's movement and starting the countdown timer for the game.
    Start Mole Movement:
        moveMole();: This calls the moveMole function, which starts the mole's movement by setting an interval that randomly selects a square for the mole to appear every second.
    Start Countdown Timer:
        countDownTimerId = setInterval(countDown, 1000);: This line sets up a timer that calls the countDown function every 1000 milliseconds (or 1 second).
        The countDown function will decrement the remaining time, update the display, and check for game-over conditions.
Summary:
    This code effectively starts both the mole's random movement and the countdown timer, making the game interactive by allowing players to hit the mole while keeping track of the remaining time.
*/