import React from "react";
import { NavLink } from "react-router-dom";
import "../style/homepage.css";
export default function Homepage() {
  return (
    <div className="homepage">
      <h5 className="async">async</h5>
      <div className="heading1">Tic Tac</div>
      <div className="heading2">Toe</div>
      <button className="login_btn">
        <NavLink to="/login">Login</NavLink>
      </button>
      <br></br>
      <button className="register_btn">
        <NavLink to="/signup">Register</NavLink>
      </button>
    </div>
  );
}
