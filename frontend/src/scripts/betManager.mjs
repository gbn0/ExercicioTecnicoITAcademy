const numbersList = document.querySelectorAll('.numero');
const inputField = document.querySelector('.selectedNumbers');
const clearButton = document.querySelector('.clearButton');
const betButton = document.querySelector('.betButton');
const randomBetButton = document.querySelector('.randomButton');


const cpf = parseInt(localStorage.getItem('cpf'));
const name = localStorage.getItem('name');
const edition = localStorage.getItem('edition');

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


randomBetButton.addEventListener('click', async () => {
    var id = await fetch('https://exercicio-tecnico-it-academy-elc6ngioe.vercel.app/bet/nextId', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                edition: edition
            })
        }).then(response => response.json()).then(data => {
            fetch('https://exercicio-tecnico-it-academy-elc6ngioe.vercel.app//bet/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: data,
                numbers: [],
                better: cpf,
                edition: edition
            })
            }).then(response => response.json()).then(data => {
                console.log(data);
                alert('Aposta realizada com sucesso');
            })
        });
});


betButton.addEventListener('click', async () => {
    if(selectedNumbers.length === 5) {
        var id = await fetch('https://exercicio-tecnico-it-academy-elc6ngioe.vercel.app/bet/nextId', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                edition: edition
            })
        }).then(response => response.json()).then(data => {
            fetch('https://exercicio-tecnico-it-academy-elc6ngioe.vercel.app/bet/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: data,
                numbers: selectedNumbers,
                better: cpf,
                edition: edition
            })
            }).then(response => response.json()).then(data => {
                console.log(data);
                alert('Aposta realizada com sucesso');
                window.location.assign('/frontend/src/home.html');
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