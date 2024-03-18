import express from 'express';

import { createBet, getBetById, getBets, getBetByBetter, getBetBy_Id} from '../db/bets';

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const {id, numbers, better} = req.body;

        if (!id || !numbers || !better) {
            res.sendStatus(400);
            return;
        }

        const existingBet = await getBetById(id);

        if(existingBet) {
            res.sendStatus(409);
            return;
        }

        const bet = await createBet(id, numbers, better);

        return res.status(200).json(bet).end();
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const select = async (req: express.Request, res: express.Response) => {
    try {
        const {id, better, _id} = req.body;
        if(_id) {
            const user = await getBetBy_Id(_id);
            return res.status(200).json(user).end();
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