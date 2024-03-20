import express from 'express';

import { createBet, getBetById, getBets, getBetByBetter, getBetBy_Id} from '../db/bets';

export const create = async (req: express.Request, res: express.Response) => {
    try {
        let {id, numbers, better, edition} = req.body;

        if (!id  || !better || !edition) {
            res.sendStatus(400);
            return;
        }

        if(numbers.length == 0) {
            numbers = [];
            while(numbers.length < 5) {
                var drawnNumber = Math.floor(Math.random() * 50);
                if(!numbers.includes(drawnNumber)) {
                    numbers.push(drawnNumber);
                }
            }
        }

        const bet = await createBet(id, numbers, better, edition);

        return res.status(200).json(bet).end();
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const select = async (req: express.Request, res: express.Response) => {
    try {
        const {id, better, edition} = req.body;
        if(edition) {
            const bet = await getBetBy_Id(edition);
            return res.status(200).json(bet).end();
        }
        else if (!id && !better) {
            const bets = await getBets();
            return res.status(200).json(bets).end();
        }else if(id && !better || id && better) {
            const bet = await getBetById(id);
            return res.status(200).json(bet).end();
        }else {
            const bet = await getBetByBetter(better);
            return res.status(200).json(bet).end();
        }
        
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}