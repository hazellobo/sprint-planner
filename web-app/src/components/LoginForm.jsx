import React, { useState } from "react";
import './Login.scss';
import Button from "react-bootstrap/Button";

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ emailId: "", password: "" });
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const obj = details;

    await fetch(`http://localhost:9000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem('emailId',details.emailId)
        }
        return response.json();
      })
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        {error !== "" ? <div className="error">{error}</div> : ""}
        {/* <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            onChange={(e) => setDetails({ ...details, emailId: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <Button
              type='submit'
            >
              Login
            </Button>
      </div>
    </form>
  );
}

export default LoginForm;
