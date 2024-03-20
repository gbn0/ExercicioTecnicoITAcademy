const table = document.querySelector('.dataTable');
const drawButton = document.querySelector('.drawButton');
const confirmationWindow = document.querySelector('.confirmation');
const yesButton = document.querySelector('.yesButton');
const noButton = document.querySelector('.noButton');

drawButton.addEventListener('click', openConfirmation);
noButton.addEventListener('click', closeConfirmation);
yesButton.addEventListener('click', drawNumbers);

async function loadData() {
    await fetch('http://localhost:8080/bets/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ edition: localStorage.getItem('edition') })
    }).then(response => response.json()).then(data => {
        if(data.length == 0) {
            table.innerHTML += `<tr><td>Sem apostas até o momento</td></tr>`;
        }else {
            data.forEach(element => {
                table.innerHTML += `<tr><td>${element.id}</td><td>${element.numbers}</td><td>${element.better}</td></tr>`;
            });
        }
    });
}

loadData()


async function drawNumbers() {
    await fetch('http://localhost:8080/edition/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: localStorage.getItem('edition') })
    }).then(response => response.json()).then(data => {
        console.log(data);
        localStorage.setItem('result', JSON.stringify(data));
        closeConfirmation();
        alert('Sorteio realizado com sucesso');
        window.location.assign('/frontend/src/result.html');
    })
}

function openConfirmation() {
    confirmationWindow.classList.add('active');
}

function closeConfirmation() {
    confirmationWindow.classList.remove('active');
}