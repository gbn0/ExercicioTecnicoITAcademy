import express from 'express';

import { create, select, next } from '../controllers/betsController';

export default (router: express.Router) => {
    router.post('/bet/create', create);
    router.get('/bet/select', select);
    router.post('/bet/list', select);
    router.post('/bet/nextId', next);
};