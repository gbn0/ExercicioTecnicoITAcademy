import express from 'express';

import usersRoute from './usersRoute';

const router = express.Router();

export default (): express.Router => {
    usersRoute(router);
    return router;
}