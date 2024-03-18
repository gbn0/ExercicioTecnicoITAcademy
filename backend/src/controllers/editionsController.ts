import express from 'express';

import { createEdition, getEditionById, getEditions, getEditionByWinner} from '../db/edition';

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const {id, prize} = req.body;

        if (!id || !prize) {
            res.sendStatus(400);
            return;
        }

        const existingBet = await getEditionById(id);

        if(existingBet) {
            res.sendStatus(409);
            return;
        }

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