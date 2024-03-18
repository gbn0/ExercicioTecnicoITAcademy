import express from 'express';

import { create, select } from '../controllers/betsController';

export default (router: express.Router) => {
    router.post('/bet/create', create);
    router.get('/bet/select', select);
};