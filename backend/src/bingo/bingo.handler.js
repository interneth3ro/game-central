export default function bingoHandler(io, socket) {
  console.log('socket connected');
  const roomName = socket.handshake.query.room;
  socket.join(roomName);
  io.to(roomName).emit('message', 'test from handler');

  const chatMessage = (message) => {
    console.log('chat message received');
    io.to(roomName).emit('message', message);
  };

  socket.on('chat:message', chatMessage);
}
