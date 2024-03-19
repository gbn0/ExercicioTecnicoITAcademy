import express from 'express';

import { create, select, draw, last } from '../controllers/editionsController';

export default (router: express.Router) => {
    router.post('/edition/create', create);
    router.get('/edition/select', select);
    router.get('/edition/draw', draw);
    router.get('/edition/last', last);
};