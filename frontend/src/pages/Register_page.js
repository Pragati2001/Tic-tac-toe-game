import React from "react";
import { useEffect, useState } from "react";
import basestyle from "../style/Base.module.css";
import registerstyle from "../style/Register.module.css";
import loginstyle from "../style/Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function Register_page() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleClick = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, username, email, password } = user;
    if (name && email && password && username) {
      axios
        .post("http://localhost:9002/register", user)
        .then((res) => {
          console.log("yeahhhhh");
          alert(res.data.message);
          let path = "../login";
          navigate(path);
        })
        .catch((err) => console.log(err));
    } else {
      alert("invalid input");
    }
  };

  return (
    <>
      <div className={registerstyle.register}>
        <span className="material-symbols-outlined">chevron_left</span>
        <div>
          <b>Create Account</b>
        </div>
        <div className={loginstyle.para}>Let's get to know you better</div>
        <form>
          <label>
            <b>Your Name</b>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="type your Name here"
            onChange={handleClick}
            value={user.name}
          />

          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="type your Username here"
            onChange={handleClick}
            value={user.username}
          />

          <label>
            <b>email</b>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="type your Email here"
            onChange={handleClick}
            value={user.email}
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
            value={user.password}
          />

          <button className={basestyle.button_common} onClick={register}>
            Register
          </button>
        </form>
        <NavLink to="/login" className={loginstyle.navlink}>
          Already registered? Login
        </NavLink>
      </div>
    </>
  );
}
