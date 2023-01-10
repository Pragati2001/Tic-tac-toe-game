import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
mongoose.set("strictQuery", true);
const DB =
  "mongodb+srv://somapra:pragati@cluster0.tjxxbcp.mongodb.net/tictactoe?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("successful");
  })
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});
dotenv.config({ path: "./config.env" });

import {
  getGameDetail,
  addUser,
  userLeft,
  newGame,
  CheckWin,
  removeRoom,
} from "./users.js";

let rooms = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome");
  socket.on("msg", (data) => {
    console.log("hewwlo,", data);
  });
  socket.on("joinRoom", (payload) => {
    addUser(socket.id, payload.roomId);

    const user = {
      socketId: socket.id,
      username: payload.username,
      roomId: payload.roomId,
    };
    newGame(payload.roomId, payload.userId, payload.username);

    socket.join(user.roomId);

    socket.emit("message", "Welcome to ChatCord!");

    const current_room = getGameDetail(user.roomId);
  });
  socket.on("joinExistingRoom", (payload) => {
    addUser(socket.id, payload.roomId);

    const user = {
      socketId: socket.id,
      username: payload.username,
      roomId: payload.roomId,
    };

    const roomExists = getGameDetail(payload.roomId);

    if (!roomExists) {
      socket.emit("message", { error: "Room does not exist" });
      return;
    }

    if (!newGame(payload.roomId, payload.userId, payload.username)) {
      socket.emit("message", { error: "Room is full" });
      return;
    }

    socket.join(user.roomId);

    socket.emit("message", "Welcome to ChatCord!");

    socket
      .to(payload.roomId)
      .emit("userJoined", `${payload.username} has joined the chat`);

    return;
  });
  socket.on("usersEntered", (payload) => {
    // console.log("userEntered Called");
    const current_game = getGameDetail(payload.roomId);

    if (!current_game) {
      return;
    }

    if (current_game.user1.userId === payload.userId) {
      current_game.user1.inGame = true;
    } else if (current_game.user2.userId === payload.userId) {
      current_game.user2.inGame = true;
    }

    if (current_game.user1.inGame && current_game.user2.inGame) {
      io.in(payload.roomId).emit("usersEntered", {
        user1: current_game.user1,
        user2: current_game.user2,
      });
    }
  });

  socket.on("move", async (payload) => {
    const current_room = await getGameDetail(payload.roomId);
    let current_username;
    let moveCount;

    if (!current_room.user1.userId || !current_room.user2.userId) {
      io.in(payload.roomId).emit("userLeave", {});
      // console.log("user left");
    }

    if (current_room.user1.userId == payload.userId) {
      current_room.user1.moves.push(payload.move);
      moveCount = current_room.user1.moves.length;
      current_username = current_room.user1.username;
    } else {
      current_room.user2.moves.push(payload.move);
      moveCount = current_room.user2.moves.length;
      current_username = current_room.user2.username;
    }

    io.in(payload.roomId).emit("move", {
      move: payload.move,
      userId: payload.userId,
    });

    if (moveCount >= 3) {
      const { isWin, winCount, pattern } = CheckWin(
        payload.roomId,
        payload.userId
      );

      if (isWin) {
        io.in(payload.roomId).emit("win", {
          userId: payload.userId,
          username: current_username,
          pattern,
        });
        return;
      }

      if (
        current_room.user1.moves.length + current_room.user2.moves.length >=
        9
      ) {
        io.in(payload.roomId).emit("draw", { roomId: payload.roomId });
        return;
      }
    }
  });

  socket.on("reMatch", (payload) => {
    let currGameDetail = getGameDetail(payload.roomId);

    currGameDetail.user1.moves = [];
    currGameDetail.user2.moves = [];

    io.in(payload.roomId).emit("reMatch", { currGameDetail });
  });

  socket.on("removeRoom", (payload) => {
    io.in(payload.roomId).emit("removeRoom", "remove");

    removeRoom(payload.roomId);
  });

  socket.on("disconnect", () => {
    const roomId = userLeft(socket.id);

    io.in(roomId).emit("userLeave", { roomId });
  });
});
//Routes
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        username,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log("server is running");
});
