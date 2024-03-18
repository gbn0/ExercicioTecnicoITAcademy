import express from 'express';

import { create } from '../controllers/betsController';

export default (router: express.Router) => {
    router.post('/bet/create', create);
};