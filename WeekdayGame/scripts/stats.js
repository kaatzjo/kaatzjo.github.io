const numberGuessesElement = document.getElementById('numberGuesses');
const correctGuessesElement = document.getElementById('correctGuesses');
const timePerCorrectGuessElement = document.getElementById('timePerCorrectGuess');

window.addEventListener('load', loadStats);


function loadStats(){
    numberGuessesElement.innerHTML = sessionStorage.getItem('numberGuesses') || 0;
    const correctGuesses = sessionStorage.getItem('correctGuesses') || 0;
    correctGuessesElement.innerHTML = correctGuesses;
    const totalTime = sessionStorage.getItem('totalTime');
    const timePerCorrectGuess = Math.floor(totalTime/correctGuesses)/1000 || 0;
    timePerCorrectGuessElement.innerHTML = timePerCorrectGuess;

}