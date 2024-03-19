import { editionNumber } from './startup.mjs';

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


betButton.addEventListener('click', async () => {
    if(selectedNumbers.length === 5) {
        // var id = await fetch('http://localhost:8080/bets/nextId', {
        //     method: 'GET'
        // }).then(response => response.json()).then(data => {
        //     return data;
        // });
        await fetch('http://localhost:8080/bet/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 1000,
                numbers: selectedNumbers,
                better: 85699659072,
                edition: editionNumber
            })
        });
    }else {
        alert('Selecione 5 números');
    }
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