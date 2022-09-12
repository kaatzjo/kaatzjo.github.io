let startD = new Date(1900, 0, 1);
let endD = new Date(2099, 11, 31);
let dateOptions = {day:'numeric', month:'long', year: 'numeric'};
let buttonTextOption = 'long';

let locales;
const buttonNext = document.getElementById("btn-next");
const buttonStart = document.getElementById("btn-start");
const dateElement = document.getElementById("dateElement");
const questionNumberElement = document.getElementById("questionNumberElement");
const preStartSection = document.getElementById("preStart")
const postStartSection = document.getElementById("postStart")
const currentStreakElement = document.getElementById("currentStreakElement");
const longestStreakElement = document.getElementById("longestStreakElement");
const timeElement = document.getElementById("timeElement");
const ansButtons = new Array(7);
for (let i=0; i<7; i++){
	ansButtons[i] = document.getElementById("btn-ans-"+String(i));
	ansButtons[i].onclick = (() => ansButtonclick(i));
	ansButtons[i].setAttribute("state", "clickable")
}
buttonStart.addEventListener('click', start);
buttonNext.addEventListener('click', next);
window.addEventListener('keydown', keydown_function);


let randomD;
let weekday;

let answered = false;
let questionCounter = 0;

let currentStreak;
let longestStreak;

let questionStartTime;


function ansButtonclick(i){
	if (!answered && ansButtons[i].getAttribute("disabled") == null){
		const isCorrect = check_answer(i);
		ansButtons[i].setAttribute("state", isCorrect ? "correct":"incorrect");
		ansButtons[i].setAttribute("disabled", "");
	}
}

function resetAnsButtonState(){
	for (let i=0; i<7; i++){
		ansButtons[i].removeAttribute("state");
		ansButtons[i].removeAttribute("disabled");
	}
}


function randomNumber(start, end) {
	return start+Math.floor(Math.random()*(end-start));
}

function randomDate(startDate, endDate){
	// not including endDate
	return new Date(randomNumber(startDate.getTime(), endDate.getTime()));
}

function updateQuestionNumber(){
	questionCounter ++;
	sessionStorage.setItem('questionCounter', questionCounter);
	questionNumberElement.innerHTML = String(questionCounter);
}

function updateStreakElements(){
	currentStreakElement.innerHTML = String(currentStreak);
	longestStreakElement.innerHTML = String(longestStreak);
	sessionStorage.setItem('currentStreak', currentStreak);
}

function start(){
	preStartSection.hidden = true;
	postStartSection.hidden = false;
	next();
}

function next() {
	if(postStartSection.hidden){return;}
	updateQuestionNumber();
	resetAnsButtonState();
	answered = false;
	dateElement.style.color = "black";
	randomD = randomDate(startD, endD);
	weekday = randomD.getDay();
	const dayString = randomD.toLocaleDateString(locales, dateOptions);
	console.log(randomD);
	dateElement.innerHTML = dayString;
	questionStartTime = Date.now();
}

function keydown_function(event){
	console.log(event.key);
	if (event.key === 'n'){
		next();
	} else if (event.key === 's' && questionCounter === 0){
		start();
	} else if ('0'<=event.key && event.key<'8'){
		ansButtonclick(Number(event.key)%7);
	}
}

function check_answer(answer){
	if (weekday == null || answered === true){return}
	if (weekday === answer){
		correct_answer();
		correctAnswerFound();
		return true;
	} else {
		incorrect_answer();
		return false;
	}
}

function correctAnswerFound(){
	dateElement.style.color = "green";
	answered = true;
	for (let i=0; i<7; i++){
		ansButtons[i].setAttribute("disabled", "");
	}
}

function setAnsButtonsText(){
	for (let i=0; i<7; i++){
		ansButtons[i].innerHTML = new Date(1900,0,i).toLocaleString(locales, {weekday: buttonTextOption});
	}
}

function correct_answer(){
	let time_elapsed = Date.now() - questionStartTime;
	timeElement.innerHTML = time_elapsed/1000;
	currentStreak ++;
	if (currentStreak > longestStreak){
		longestStreak = currentStreak;
		localStorage.setItem("longestStreak", String(longestStreak));
	}
	updateStreakElements();
}

function incorrect_answer(){
	currentStreak = 0;
	updateStreakElements();
}

function loadLocalStorage(){
	locales = localStorage.getItem('locales');
	if (!locales){
		//locales = document.documentElement.lang;
		locales = navigator.language;
	}
	questionCounter = sessionStorage.getItem('questionCounter') || 0;
	currentStreak = sessionStorage.getItem('currentStreak') || 0;
	longestStreak = localStorage.getItem('longestStreak');
	if (!longestStreak){
		longestStreak = 0;
	}
	else {
		longestStreak = Number(longestStreak);
	}
	const startDate = localStorage.getItem('startDate');
	if (startDate){
		startD = new Date(startDate)
	}
	const endDate = localStorage.getItem('endDate');
	if (endDate){
		endD = new Date(endDate)
	}
}

onload = () => {
	loadLocalStorage();
	setAnsButtonsText();
	updateStreakElements();
	start()
}