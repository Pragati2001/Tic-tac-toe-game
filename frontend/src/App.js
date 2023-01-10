import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import io from "socket.io-client";
import Home from "./components/Home/Home.jsx";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import Register_page from "./pages/Register_page";
import Login_page from "./pages/Login_page";
import Game from "./components/Game/Game";
import Main_Game from "./components/Main_Game/Main_Game";

const socket = io("http://localhost:3001");

export default function App() {
  const [user, setLoginUser] = useState({});
  const [play_email, setPlayEmail] = useState("pragati");
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("well listen data", (data) => {
        console.log("msg from server,", data);
      });
      socket.emit("msg", "thnks for connecting");
    });
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/login"
            element={<Login_page setUserState={setLoginUser} />}
          ></Route>
          <Route path="/signup" element={<Register_page />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/createroom"
            element={
              <CreateRoom
                socket={socket}
                user={user}
                setPlayEmail={setPlayEmail}
              />
            }
          ></Route>
          {/* <Route path="/game" element={<Game socket={socket} />}></Route> */}
          <Route
            path="/game"
            element={<Main_Game socket={socket} play_email={play_email} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
