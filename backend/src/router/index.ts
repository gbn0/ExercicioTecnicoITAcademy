import express from 'express';

import usersRoute from './usersRoute';
import betsRoute from './betsRoute';
import editionsRoute from './editionsRoute';

const router = express.Router();

export default (): express.Router => {
    usersRoute(router);
    betsRoute(router);
    editionsRoute(router);
    return router;
}