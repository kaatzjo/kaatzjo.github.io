const languageSelector = document.getElementById("languageDropdown");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");
const autoStartElement = document.getElementById("autoStart");


languageSelector.addEventListener('change', (e)=>{
    localStorage.setItem("locales", e.target.value);
});

startDateElement.addEventListener('change', (e)=>{
    localStorage.setItem('startDate', e.target.value);
});

endDateElement.addEventListener('change', (e)=>{
    localStorage.setItem('endDate', e.target.value);
});

autoStartElement.addEventListener('change', (e)=>{
    localStorage.setItem('autoStart', e.target.checked);
});

window.addEventListener('load', (e)=>{
    languageSelector.value = localStorage.getItem('locales');
    startDateElement.value = localStorage.getItem('startDate');
    endDateElement.value = localStorage.getItem('endDate');
    autoStartElement.checked = localStorage.getItem('autoStart') === 'true';
});