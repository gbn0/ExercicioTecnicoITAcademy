import express from 'express';

import { createUser, getUserByCpf, getUsers, getUserByName } from '../db/users';

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const {cpf, name} = req.body;

        if (!cpf || !name) {
            res.sendStatus(400);
            return;
        }

        const existingUser = await getUserByCpf(cpf);

        if(existingUser) {
            res.sendStatus(200);
            return;
        }

        const user = await createUser(cpf, name);

        return res.status(200).json(user).end();
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const select = async (req: express.Request, res: express.Response) => {
    try {
        const {cpf, name} = req.body;

        if (!cpf && !name) {
            const users = await getUsers();
            return res.status(200).json(users).end();
        }else if(cpf && !name || cpf && name) {
            const user = await getUserByCpf(cpf);
            return res.status(200).json(user).end();
        }else {
            const user = await getUserByName(name);
            return res.status(200).json(user).end();
        }
        
    }catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}