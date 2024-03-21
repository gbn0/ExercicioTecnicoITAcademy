import { api } from './api.mjs';


const table = document.querySelector('.resultTable');
const drawnNumbers = document.querySelector('.drawnNumbers');
const editionText = document.querySelector('.editionText');
const descriptionButton = document.querySelector('.descriptionButton');
const descriptionPanel = document.querySelector('.description');
const closeButton = document.querySelector('.closeButton');
const roundsNumber = document.querySelector('.roundsNumber');
const frequencyTable = document.querySelector('.frequency');


descriptionButton.addEventListener('click', toggleDescription);
closeButton.addEventListener('click', toggleDescription);


function toggleDescription() {
    descriptionPanel.classList.toggle('active');
}

function renderResults() {
    editionText.innerHTML = `RESULTADOS DA EDIÇÃO N°${data.edition}`;
    drawnNumbers.innerHTML = `${data.drawnNumbers}`;
    if(data.winners.length == 0) {
        table.innerHTML = '<tr><td>Nenhum vencedor</td></tr>';
        return;
    }
    data.winners.forEach(element => {
        table.innerHTML += `<tr><td>${element.username}</td><td>${element.usercpf}</td><td>${element.betnumbers}</td><td>${parseInt(element.prize)/data.winners.length}</td></tr>`;
    });

    roundsNumber.innerHTML = `NÚMERO DE RODADAS: ${data.drawnNumbers.length}`;
    for(var i = 1; i < data.betNumbers; i++) {
        frequencyTable.innerHTML += `<tr><td>${i}</td><td>${data.betNumbers[i]}</td></tr>`;
    }
}

function sortTable() {
    var rows, sorting, firstRow, secondRow, needSort;
    sorting = true;
    while(sorting) {
        sorting = false;
        rows = frequencyTable.rows;
        for(var i = 1; i < rows.length - 1; i++) {
            needSort = false;
            firstRow = rows[i].getElementsByTagName('td')[1];
            secondRow = rows[i + 1].getElementsByTagName('td')[1];

            if(firstRow.innerHTML.toLowerCase() > secondRow.innerHTML.toLowerCase()) {
                needSort = true;
                break;
            }
        }
        if(needSort) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sorting = true;
        }
    }
}

var data = localStorage.getItem('result');
data = JSON.parse(data);
data.winners.sort((a, b) => a.username - b.username);
console.log(data);

renderResults();

