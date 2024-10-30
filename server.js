const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const { v4: uuidv4 } = require("uuid");

// Peer server setup
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/peerjs"
});

app.use("/peerjs", peerServer);
app.use(express.static("public"));
app.set("view engine", "ejs");

// Room management
const activeRooms = new Map();

// Routes
app.get("/", (req, res) => {
  res.render("choice"); // Landing page to choose chat type
});

app.get("/video/:room", (req, res) => {
  res.render("video-room", { roomId: req.params.room });
});

app.get("/text/:room", (req, res) => {
  res.render("text-room", { roomId: req.params.room });
});

// Create new room
app.post("/create-room", (req, res) => {
  const roomId = uuidv4();
  activeRooms.set(roomId, { users: new Set(), type: req.body.type });
  res.json({ roomId });
});

server.listen(3000); 
