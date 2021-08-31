import { getInputData } from './fileHandler.js'

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

window.addEventListener('beforeunload', function (e) {
    const inputObjects = getInputData()
    window.localStorage.setItem('inputsObject', inputObjects)
    
    e.returnValue = '';
});

// TO DO: carregar os dados quando o usuário reabrir a página