import express from 'express';

import { createBet, getBetById } from '../db/bets';

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