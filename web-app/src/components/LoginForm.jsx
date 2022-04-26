import React, { useEffect, useState } from "react";
import './Login.scss';
import Button from "react-bootstrap/Button";
import Dashboard from './Dashboard';

function LoginForm() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [error, setError] = useState("");

  //checks if user is logged in on everytime page loads
  useEffect(() => {
    const loggedInUserToken = localStorage.getItem('userToken');
    if (loggedInUserToken) {
      const foundUserToken = JSON.stringify(loggedInUserToken);
      setToken(foundUserToken);
    }
  }, []);


  //on submit button
  const submitHandler = async (e) => {
      e.preventDefault();
      const obj = { emailId, password };
    
      await fetch(`http://localhost:9001/api/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((response) =>
          response.json()).then((result) => {
            if (!result.hasOwnProperty("error")) {
               setToken(result.token);
               localStorage.setItem('userToken', result.token);
            } else {
              setError(result.error);
            }
           
          });
    } 

  //if user exists only then allow to view dashboard
  if (token) {
    console.log("User token",token)
    return <Dashboard></Dashboard>
  }

  return (
    <div class="App">
    <form class="loginForm" onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        {error !== "" ? <div className="error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            onChange={(e) => setEmailId(e.target.value)}
            value={emailId} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setPassword( e.target.value)
            }
            value={password} required
          />
        </div>
        <Button
              type='submit'
            >
              Login
            </Button>
      </div>
    </form>
    </div>
    
  );
}

export default LoginForm;
