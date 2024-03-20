import express from 'express';
import mongoose from 'mongoose';

import { createEdition, getEditionById, getEditions, getEditionByWinner, updateEditionWinnersById} from '../db/edition';
import { getBetsByEdition, getBetBy_Id} from '../db/bets';
import { getUserByCpf } from '../db/users';


type winnerObject = {
    username: string,
    usercpf: number,
    betnumbers: number[],
    prize: unknown

}


export const create = async (req: express.Request, res: express.Response) => {
    try {
        const {id, prize} = req.body;

        const edition = await createEdition(id, prize);

        return res.status(200).json(edition).end();
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const select = async (req: express.Request, res: express.Response) => {
    try {
        const {id, winner} = req.body;

        if (!id && !winner) {
            const editions = await getEditions();
            return res.status(200).json(editions).end();
        }else if(id && !winner || id && winner) {
            const edition = await getEditionById(id);
            return res.status(200).json(edition).end();
        }else {
            const edition = await getEditionByWinner(winner);
            return res.status(200).json(edition).end();
        }
        
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const draw = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.body;
        const edition = await getEditionById(id);
        const editionBets = await getBetsByEdition(id);
        var winners: mongoose.Types.ObjectId[] = [];
        var drawnNumbers: Number[] = [];
        if(edition && editionBets.length > 0) {
            while(drawnNumbers.length < 5) {
                var drawnNumber = Math.floor(Math.random() * (50 - 1) + 1);
                if(!drawnNumbers.includes(drawnNumber)) {
                    drawnNumbers.push(drawnNumber);
                }
            }

            while(!(winners.length > 0) && drawnNumbers.length < 30) {
                for(var i = 0; i < editionBets.length; i++) {
                    var hits = 0;
                    for(var j = 0; j < 5; j++) {
                        if(drawnNumbers.includes(editionBets[i].numbers[j])) {
                            hits++;
                        }
                    }
                    if(hits == 5) {
                        winners.push(editionBets[i]._id);
                    }
                    hits = 0;
                }

                if(winners.length == 0) {
                    var drawnNumber = Math.floor(Math.random() * (50 - 1) + 1);
                    if(!drawnNumbers.includes(drawnNumber)) {
                        drawnNumbers.push(drawnNumber);
                    }
                }
            }

            if(winners.length > 0) {
                await updateEditionWinnersById(edition._id, winners);
            }else {
                var winners2: mongoose.Types.ObjectId[] = [new mongoose.mongo.ObjectId()];
                await updateEditionWinnersById(edition._id, winners2);
            }

            var winnersRes: winnerObject[] = [];

            for(var i = 0; i < winners.length; i++) {
                var winner = await getBetBy_Id(winners[i]);

                if(winner != null) {
                    var user = await getUserByCpf(winner.better);
                    if(user != null) {
                        var winnerObj = {
                            username: user.name,
                            usercpf: user.cpf,
                            betnumbers: winner.numbers,
                            prize: edition.prize,
                        }
                        winnersRes[i] = winnerObj;
                    }
                }
                
            }
            var returnObj = {
                edition: id,
                drawnNumbers: drawnNumbers,
                winners: winnersRes
            }
            return res.status(200).json(returnObj).end();
        }else {
            res.sendStatus(404);
            return;
        }
        
    }catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const last = async (req: express.Request, res: express.Response) => {
    try {
        const editions = await getEditions();
        if(editions.length == 0) {
            return res.status(200).json(null).end();
        }
        var lastEdition = editions[editions.length - 1];
        return res.status(200).json(lastEdition).end();
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}