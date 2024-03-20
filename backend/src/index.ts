import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';


const app = express();

app.use(cors());

app.use(express.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Listening on http://localhost:8080/");
});

const MONG_URL = "mongodb+srv://gbn:FKchqtATWLhMF7gz@itacademy.wpr16aj.mongodb.net/?retryWrites=true&w=majority&appName=ITAcademy";

mongoose.Promise = Promise;
mongoose.connect(MONG_URL);
mongoose.connection.on('error', (err: Error) => {
    console.log(err);
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.use('/', router())
