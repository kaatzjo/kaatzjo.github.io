const numberGuessesElement = document.getElementById('numberGuesses');
const correctGuessesElement = document.getElementById('correctGuesses');
const timePerCorrectGuessElement = document.getElementById('timePerCorrectGuess');

window.addEventListener('load', loadStats);


function loadStats(){
    numberGuessesElement.innerHTML = sessionStorage.getItem('numberGuesses');
    const correctGuesses = sessionStorage.getItem('correctGuesses')
    correctGuessesElement.innerHTML = correctGuesses;
    const totalTime = sessionStorage.getItem('totalTime');
    const timePerCorrectGuess = Math.floor(totalTime/correctGuesses)/1000;
    timePerCorrectGuessElement.innerHTML = timePerCorrectGuess;

}