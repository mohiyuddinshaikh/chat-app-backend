const express = require("express");
const path = require("path");
require("dotenv").config()
const io = require("socket.io")(process.env.PORT || 8000);

const users = {};
const app = express();

app.get("/", ()=>{
  return "foobar"
})

app.use(express.static(path.join(__dirname, "../public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});



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

console.log("Connected...");
