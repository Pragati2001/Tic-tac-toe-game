import React, { useState } from "react";
import basestyle from "../style/Base.module.css";
import loginstyle from "../style/Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login_page({ setLoginUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleClick = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(user);
  };

  const login = () => {
    const { username, password } = user;
    console.log(username, "+++", password);
    let path = "../home";
    navigate(path);
    // if (username && password) {
    //   console.log(username, "+", password);
    //   // axios
    //   //   .post("http://localhost:9002/login", user)
    //   //   .then((res) => {
    //   //     setLoginUser(res.data.user);
    //   //     // alert("done");
    //   //     // let path = "../home";
    //   //     // navigate(path);
    //   //   })
    //   //   .catch((err) => {
    //   //     // alert("not done");
    //   //     // let path = "../home";
    //   //     // navigate(path);
    //   //     console.log(err);
    //   //   });
    // } else {
    //   //   alert("fill all details");
    //   let path = "../home";
    //   navigate(path);
    //   console.log("nt posible");
    // }
  };
  // const loginss = () => {
  //   alert("yess");
  //   console.log("yessssssssssssssssssss");
  // };
  return (
    <div className={loginstyle.login}>
      <span className="material-symbols-outlined">chevron_left</span>
      <div>Create Account</div>
      <div className={loginstyle.para}>Let's get to know you better</div>
      <form>
        <label>
          <b>Username</b>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="type your Username here"
          onChange={handleClick}
          autoComplete="on"
          value={user.username}
        />

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="type your Password here"
          onChange={handleClick}
          autoComplete="on"
          value={user.password}
        />
        <button className={basestyle.button_common} onClick={login}>
          Login
        </button>
      </form>
      <NavLink to="/signup" className={loginstyle.navlink}>
        Not yet registered? Register Now
      </NavLink>
    </div>
  );
}
