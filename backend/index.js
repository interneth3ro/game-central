import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(cors());

let server = app.listen(PORT, () =>
  console.log(`Server Started On Port ${PORT}`)
);

let io = new Server(server);
io.on('connection', (socket) => {
  console.log(`socket.io connected: ${socket.id}`);
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
    socket.leave(roomId);
  });
});
