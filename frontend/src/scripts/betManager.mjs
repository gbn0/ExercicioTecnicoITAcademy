const numbersList = document.querySelectorAll('.numero');
const inputField = document.querySelector('.selectedNumbers');
const clearButton = document.querySelector('.clearButton');
const betButton = document.querySelector('.betButton');

numbersList.forEach((element) => {
    element.addEventListener('click', () => {
        numberHandler(element);
    });
});
let selectedNumbers = [];

clearButton.addEventListener('click', () => {
    numbersList.forEach((element) => {
        element.classList.remove('active');
    });

    selectedNumbers = [];
    inputField.value = '';
});


function numberHandler(element) {
    if(element.classList.contains('active')) {
        element.classList.remove('active');
        selectedNumbers.splice(selectedNumbers.indexOf(element.innerText), 1);
    }else if(selectedNumbers.length < 5){
        element.classList.add('active');
        selectedNumbers.push(element.innerText);
    }

    inputField.value = selectedNumbers.join(' ');
}