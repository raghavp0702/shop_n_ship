import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <h1>Register</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          type="name"
          name="name"
          required
          placeholder="Name"
          value={user.name}
          onChange={onChangeHandler}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeHandler}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          autoComplete="on"
          onChange={onChangeHandler}
        />

        <div className="row">
          <button type="submit"> Register</button>

          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
