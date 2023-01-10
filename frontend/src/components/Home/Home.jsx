import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import basestyle from "../../style/Base.module.css";
import "./Home.css";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../Actions";
import { nanoid } from "nanoid";

const Home = () => {
  const userId = nanoid(5);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  // const dispatch = useDispatch();

  // const handleClick = () => {
  //   if (userName === "") {
  //     setError("Please enter your name");
  //     setTimeout(() => {
  //       setError("");
  //     }, 4000);
  //     return;
  //   }

  //   dispatch(addUser(userName, userId));

  //   setShow(true);
  // };
  const start_game = () => {
    let path = "../createroom";
    navigate(path);
  };

  return (
    <div className="home">
      <div className="paragraph">No games Found</div>
      <button className={basestyle.button_common} onClick={start_game}>
        Start Game
      </button>
      <button className={basestyle.button_common}>Join Game</button>
    </div>
  );
};

export default Home;
