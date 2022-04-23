import "./App.scss";
import { useState } from "react";
// import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TaskList from "./SideBar/TaskList/TaskList";
import Reports from "./SideBar/Reports/Reports";
import Board from "./SideBar/Board/Board";
import Project from "./SideBar/ProjectDetails/ProjectDetails";
import NavBarC from "./NavBar/NavBar";

function App() {
  // const adminUser = {
  //   email: "admin@admin.com",
  //   password: "admin123",
  // };
  // const [user, setUser] = useState({ name: "", email: "" });
  // const [error, setError] = useState("");
  // const Login = (details) => {
  //   console.log(details);

  //   if (
  //     details.email === adminUser.email &&
  //     details.password === adminUser.password
  //   ) {
  //     console.log("Logged in");
  //     setUser({
  //       name: details.name,
  //       email: details.email,
  //     });
  //   } else {
  //     console.log("Details do not match!");
  //     setError("Details do not match!");
  //   }
  // };
  // const Logout = () => {
  //   setUser({
  //     name: "",
  //     email: " ",
  //   });
  // };
  let emailId = window.localStorage.getItem("emailId");
  return (
    <div className="main">
      {emailId !== null ? (
        <div>
          <NavBarC></NavBarC>
          <div className="sidebar-routes">
            <Router>
              <SideBar />
              <Switch>
                <Route path="/tasks" exact component={TaskList} />
                <Route path="/board" exact component={Board} />
                <Route path="/reports" component={Reports} />
                <Route path="/project" component={Project} />
                {/* <Route path="/login" component={Login} /> */}
              </Switch>
            </Router>
          </div>
          {/* <h2>
            Welcome, <span>{user.name}</span>
          </h2>

          <button onClick={Logout}>Logout</button> */}
        </div>
      ) : (
        // <LoginForm Login={Login} error={error} />
        <LoginForm />
      )}
      <></>
      {/* <LoginForm></LoginForm> */}
    </div>
  );
}

export default App;
