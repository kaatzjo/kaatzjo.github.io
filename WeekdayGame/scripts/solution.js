const dateElement = document.getElementById('exampleDate');
const pYear = document.getElementById('pYear');
const pYearExplanation = document.getElementById('pYearExplanation');
const pMonth = document.getElementById('pMonth');
const pMonthExplanation = document.getElementById('pMonthExplanation');
const pResult = document.getElementById('pResult');
const pResultExplanation = document.getElementById('pResultExplanation');

const locales = 'en';
const options = {day: 'numeric', month: 'long', year: 'numeric'};

const equiv = '\u2261'
const doomsdays = [NaN, 3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];

dateElement.addEventListener('change', (e)=>{
    sessionStorage.setItem('exampleDate', e.target.value);
    displaySolution(e.target.value);
});

window.addEventListener('load', (e)=>{
    dateElement.value = sessionStorage.getItem('exampleDate');
    displaySolution(dateElement.value);
});

function getWeekday(num){
    return new Date(1900, 0, num).toLocaleString(locales, {weekday: 'long'})
}

function displaySolution(dateString){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const isLeapYear = ((year%4 === 0) && !(year%100 === 0)) || (year%400 === 0);
    

    const [yearDoom, yearExplanation] = yearDoomsday(year);
    pYear.innerHTML = `In ${year} doomsdays are on ${getWeekday(yearDoom)} (${yearDoom}).`;
    pYearExplanation.innerHTML = yearExplanation;

    const leapYearAdjustment = (isLeapYear && month<=2) ? 1: 0;
    const monthDoomsday = new Date(year, month-1, doomsdays[month]+leapYearAdjustment);
    const monthDoomsdayString = monthDoomsday.toLocaleDateString(locales, {day: "numeric", month: "long"});
    const [monthDoom, monthExplanation] = dayMonthDoomsday(day, month, isLeapYear);
    pMonth.innerHTML = `The relevant doomsday is ${monthDoomsdayString}! So we have to add ${monthDoom}.`;
    pMonthExplanation.innerHTML = monthExplanation;

    const [result, resultExplanation] = resultDoom(monthDoom, yearDoom);
    pResult.innerHTML = `We conclude ${date.toLocaleDateString(locales, options)} is a ${getWeekday(result)} (${result}).`;
    pResultExplanation.innerHTML = resultExplanation;
}


function mod7(num){
    return (num%7+7)%7;
}

function yearDoomsday(year){
    const century = Math.floor(year/100);
    const yearRemainder = year%100;

    const leapYears = Math.floor(yearRemainder/4);
    const centuryDoom = mod7(2+Math.floor(century/4)-2*century);

    const result = centuryDoom + yearRemainder + leapYears;
    const explanation = `${centuryDoom}(century) + ${yearRemainder} + ${leapYears}(leap years) = ${result} \u2261 ${mod7(result)} (mod 7)`;
    return [mod7(result), explanation];
}

function centuryDoomsday(century){
    return mod7(2+Math.floor(century/4)-2*century);
}

function yearRemainderDoomsday(yearRemainder){
    const leapYears = Math.floor(yearRemainder/4);
    const result = yearRemainder+leapYears;
    const explanation = `${yearRemainder} + ${leapYears}(leap years) = ${result} \u2261 ${mod7(result)} (mod 7)`;
    return [mod7(result), explanation];    
}

function dayMonthDoomsday(day, month, isLeapYear){
    let referenceDay = doomsdays[month];
    if (month <= 2 && isLeapYear){
        referenceDay ++;
    }
    const result = day - referenceDay;
    const explanation = `${day} - ${referenceDay} = ${result} \u2261 ${mod7(result)} (mod 7)`;
    return [mod7(result), explanation];
}

function resultDoom(monthDoom, yearDoom){
    const result = yearDoom + monthDoom;
    const explanation = `${yearDoom} + ${monthDoom} = ${result} \u2261 ${mod7(result)} (mod 7)`;
    return [mod7(result), explanation];
}