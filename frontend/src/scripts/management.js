const api = axios.create({
    baseURL: "https://exercicio-tecnico-it-academy.vercel.app/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
})


const table = document.querySelector('.dataTable');
const drawButton = document.querySelector('.drawButton');
const confirmationWindow = document.querySelector('.confirmation');
const yesButton = document.querySelector('.yesButton');
const noButton = document.querySelector('.noButton');

drawButton.addEventListener('click', openConfirmation);
noButton.addEventListener('click', closeConfirmation);
yesButton.addEventListener('click', drawNumbers);

async function loadData() {
    await api.post('bet/list', {
        edition: localStorage.getItem('edition')
    }).then(data => data.data).then(data => {
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
    await api.post('edition/draw', {
        id: localStorage.getItem('edition')
    }).then(data => data.data).then(data => {
        console.log(data);
        localStorage.setItem('result', JSON.stringify(data));
        closeConfirmation();
        alert('Sorteio realizado com sucesso');
        window.location.assign('./result.html');
    })
}

function openConfirmation() {
    confirmationWindow.classList.add('active');
}

function closeConfirmation() {
    confirmationWindow.classList.remove('active');
}