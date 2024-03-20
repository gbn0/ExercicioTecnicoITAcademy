import { api } from './api.mjs';

const registrationWindow = document.querySelector('.registration');
const cpfInput = document.querySelector('.cpfInput');
const nameInput = document.querySelector('.nameInput');
const betButton = document.querySelector('.betButton');
const closeRegistrationButton = document.querySelector('.submitRegister');



betButton.addEventListener('click', openRegistration);

closeRegistrationButton.addEventListener('click', closeRegistration);

let editionNumber = 1;
let cpf;
let name;

const checkEdition = async () => {
    return await api.get('/edition/last', {}).then(response => {
        return response.data
    }).then(data => {
        console.log(data)
        if(data == null) {
            localStorage.setItem('edition', editionNumber);
            return true;
        }else if(data.winners.length == 0) {
            editionNumber = data.id;
            localStorage.setItem('edition', editionNumber);
            return false;
        }else if (data.winners.length > 0) {
            editionNumber = data.id + 1;
            localStorage.setItem('edition', editionNumber);
            return true; 
        }
    });
    
    
}

async function createNewEdition() {
    if(await checkEdition()) {
        const randomPrizeNumber = Math.floor(Math.random() * (1000001 - 250000) + 250000);
        await api.post('edition/create', {
            body: { id: editionNumber, prize: randomPrizeNumber }
        }).then(response => response.json());
    }
}

function openRegistration() {
    registrationWindow.classList.add('active');
}

async function closeRegistration() {
    if(cpfInput.value.length != 11) {
        alert('Preencha os campos corretamente');
        return;
    }
    registrationWindow.classList.remove('active');
    
    try {
        const res = await fetch('user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf: parseInt(cpfInput.value), name: nameInput.value })
        }).then((res) => {
            console.log(res);
            cpf = cpfInput.value;
            name = nameInput.value;
            localStorage.setItem('cpf', cpf);
            localStorage.setItem('name', name);
            cpfInput.value = '';
            nameInput.value = '';
            setTimeout(changeScreen, 1000);
        });
    }catch(error) {
        // console.log(error);
    }
        
}

function changeScreen() {
    window.location.assign('/frontend/src/bet.html');
}


createNewEdition();


