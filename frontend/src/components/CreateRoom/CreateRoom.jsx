import React, { useEffect, useState } from "react";
import "./CreateRoom.css";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import loginstyle from "../../style/Login.module.css";

import basestyle from "../../style/Base.module.css";
const roomId = nanoid(7);
// const roomId =

const CreateRoom = ({ socket, user, setPlayEmail }) => {
  // const [play_email, setPlayEmail] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);
  // console.log(user);
  // const [copied, setCopied] = useState(false);
  // const roomId = user.email;
  // console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     window.location.href = "/createroom";
  //   }
  // });

  // useEffect(() => {
  //   socket.emit("joinRoom", {
  //     username: user.userName,
  //     userId: user.userId,
  //     roomId,
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   socket.on("message", (payload) => {
  //     console.log(payload);
  //   });

  //   socket.on("message", (message) => {
  //     console.log(message);
  //   });
  // });
  const handleClick = (e) => {
    const { name, value } = e.target;
    setPlayEmail({
      [name]: value,
    });
    console.log("email");
  };
  const onClickhandler = () => {
    let path = "../game";
    navigate(path);
  };

  // function copyText() {
  //   navigator.clipboard.writeText(roomId);

  //   setCopyBtnValue("Copied");
  //   setCopied(true);

  //   setInterval(() => {
  //     setCopyBtnValue("Copy");
  //     setCopied(false);
  //   }, 3000);
  // }

  return (
    <div className="create-room">
      <span className="material-symbols-outlined">chevron_left</span>
      <div className={loginstyle.para}>Whom do you want to play with!</div>

      <div className="create-room-container">
        <label>
          <b>Email</b>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="type Email here"
          onChange={handleClick}
          // value={user.username}
        />
      </div>
      <button className={basestyle.button_common} onClick={onClickhandler}>
        Start Game
      </button>
    </div>
  );
};

export default CreateRoom;
