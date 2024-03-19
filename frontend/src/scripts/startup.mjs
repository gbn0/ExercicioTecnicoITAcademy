export let editionNumber = 1;

const checkEdition = async () => {
    return await fetch('http://localhost:8080/edition/last', {
        method: 'GET'
    }).then(response => response.json()).then(data => {
        if(data == null) {
            console.log('No editions found');
            return true;
        }else if(data.winners.length == 0) {
            console.log('Edition already started')
            editionNumber = data.id;
            return false;
        }else if (data.winners.length > 0) {
            console.log('Edition already finished');
            editionNumber = data.id + 1;
            return true; 
        }
    });
    
    
}

async function createNewEdition() {
    if(await checkEdition()) {
        const randomPrizeNumber = Math.floor(Math.random() * (1000001 - 250000) + 250000);
        console.log(editionNumber);
        await fetch('http://localhost:8080/edition/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editionNumber, prize: randomPrizeNumber })
        }).then(response => response.json()).then(data => console.log(data));
    }

}


createNewEdition();
