const io = require("socket.io")(8000);

const users = {};

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
