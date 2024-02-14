import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import bingoHandler from './src/bingo/bingo.handler.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

const server = app.listen(PORT || 8080, () =>
  console.log(`Server Started On Port ${PORT}`)
);

const io = new Server(server, { cors: { origin: '*' } });
const bingo = io.of('/bingo');

const onBingoConnection = (socket) => {
  bingoHandler(bingo, socket);
};

bingo.on('connection', onBingoConnection);
