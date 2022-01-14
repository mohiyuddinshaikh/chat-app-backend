const express = require("express");
const path = require("path");
require("dotenv").config()

const PORT = process.env.PORT || 8000
const app = express();
const server = require('http').Server(app)
const io = module.exports.io = require("socket.io")(server);

const users = {};


// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(express.static(path.join(__dirname, "build")));

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);

  socket.on("new-user-joined", (name) => {
    console.log("name :>> ", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    console.log("message :>> ", message);
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
});

server.listen(PORT, ()=>{
  console.log("Connected to port : ", PORT);
})

