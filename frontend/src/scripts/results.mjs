import { api } from './api.mjs';


const table = document.querySelector('.resultTable');
const drawnNumbers = document.querySelector('.drawnNumbers');
const editionText = document.querySelector('.editionText');

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
}

var data = localStorage.getItem('result');
data = JSON.parse(data);
data.winners.sort((a, b) => a.username - b.username);
console.log(data);

renderResults();

