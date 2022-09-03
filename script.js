let startD = new Date(1900, 1, 1);
let endD = new Date(2099, 12, 31);
let dateOptions = {day:'numeric', month:'long', year: 'numeric'};
let buttonTextOption = 'long';

let locales;
const buttonNext = document.getElementById("btn-next");
const buttonStart = document.getElementById("btn-start");
const dateElement = document.getElementById("dateElement");
const questionNumberElement = document.getElementById("questionNumberElement");
const mainSection = document.querySelector("body section");
const currentStreakElement = document.getElementById("currentStreakElement");
const longestStreakElement = document.getElementById("longestStreakElement");
const ansButtons = new Array(7);
for (let i=0; i<7; i++){
	ansButtons[i] = document.getElementById("btn-ans-"+String(i));
	ansButtons[i].onclick = (() => ansButtonclick(i));
	ansButtons[i].setAttribute("state", "clickable")
}
const languageSelector = document.querySelector("select");
languageSelector.onchange = () => {changeLocales(languageSelector.value)}
buttonStart.onclick = start;
buttonNext.onclick = next;
onkeydown = keydown_function;

let randomD;
let weekday;

let answered = false;
let questionCounter = 0;

let currentStreak;
let longestStreak;


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
	return new Date(randomNumber(startDate.getTime(), endDate.getTime()));
}

function updateQuestionNumber(){
	questionCounter ++;
	questionNumberElement.innerHTML = String(questionCounter);
}

function updateStreakElements(){
	currentStreakElement.innerHTML = String(currentStreak);
	longestStreakElement.innerHTML = String(longestStreak);
}

function start(){
	mainSection.hidden = false;
	buttonStart.hidden = true;
	next();
	changeLocales(locales);
}

function next() {
	if(mainSection.hidden){return;}
	updateQuestionNumber();
	resetAnsButtonState();
	answered = false;
	dateElement.style.color = "black";
	randomD = randomDate(startD, endD);
	weekday = randomD.getDay();
	const dayString = randomD.toLocaleDateString(locales, dateOptions);
	console.log(randomD);
	dateElement.innerHTML = dayString;
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

function setAnsButtonsText(){
	for (let i=0; i<7; i++){
		ansButtons[i].innerHTML = new Date(1900,0,i+7).toLocaleString(locales, {weekday: buttonTextOption});
	}
}

function changeLocales(newLanguage){
	locales = newLanguage;
	localStorage.setItem("locales", locales);
	languageSelector.value = locales;
	setAnsButtonsText();
	if (randomD != null){
		dateElement.innerHTML = randomD.toLocaleDateString(locales, dateOptions);
	}
}

function correct_answer(){
	console.log("correct answer");
	currentStreak ++;
	if (currentStreak > longestStreak){
		console.log("new longest Streak");
		longestStreak = currentStreak;
		localStorage.setItem("longestStreak", String(longestStreak));
	}
	updateStreakElements();
}

function incorrect_answer(){
	console.log("incorrect answer")
	currentStreak = 0;
	updateStreakElements();
}


onload = () => {
	locales = localStorage.getItem('locales');
	if (!locales){
		locales = document.documentElement.lang;
	}
	longestStreak = localStorage.getItem('longestStreak');
	if (!longestStreak){
		longestStreak = 0;
	}
	else {
		longestStreak = Number(longestStreak);
	}
	currentStreak = 0;
	updateStreakElements();
	start()
}