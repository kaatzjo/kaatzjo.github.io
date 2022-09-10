const languageSelector = document.getElementById("languageDropdown");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

languageSelector.addEventListener('change', (e)=>{
    localStorage.setItem("locales", e.target.value);
});

startDateElement.addEventListener('change', (e)=>{
    localStorage.setItem('startDate', e.target.value);
});

endDateElement.addEventListener('change', (e)=>{
    localStorage.setItem('endDate', e.target.value);
});

window.addEventListener('load', (e)=>{
    languageSelector.value = localStorage.getItem('locales');
    startDateElement.value = localStorage.getItem('startDate');
    endDateElement.value = localStorage.getItem('endDate');
});