const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connection", (socket) => {
  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "A new user has joined");
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has Left");
  });

  socket.on("sendLocation", (coords) => {
    socket.broadcast.emit(
      "message",
      `https://google.coms/maps?q=${coords.longitude},${coords.latitude}`
    );
  });
});
server.listen(port, () => {
  console.log(`on port ${port}`);
});
