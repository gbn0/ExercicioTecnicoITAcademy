import express from 'express';

import { create, select} from '../controllers/usersController';

export default (router: express.Router) => {
    router.post('/user/create', create);
    router.get('/user/select', select);
};