const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connection", (socket) => {
  socket.emit("message", generateMessage("Welcome")),
    socket.broadcast.emit("message", generateMessage("A new user has joined"));
  socket.on("sendMessage", (message, callback) => {
    io.emit("message", generateMessage(message));
    callback();
  });
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has Left"));
  });

  socket.on("sendLocation", (coords, callback) => {
    socket.broadcast.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });
});
server.listen(port, () => {
  console.log(`on port ${port}`);
});
