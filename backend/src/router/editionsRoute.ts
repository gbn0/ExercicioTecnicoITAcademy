import express from 'express';

import { create, select } from '../controllers/editionsController';

export default (router: express.Router) => {
    router.post('/edition/create', create);
    router.get('/edition/select', select);
};