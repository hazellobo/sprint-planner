import "./App.scss";
import { useState } from "react";
// import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TaskList } from "./SideBar/TaskList/TaskList";
import { Reports } from "./SideBar/Reports/Reports";
import { Board } from "./SideBar/Board/Board";
import LoginForm from "./components/LoginForm";
import { Project } from "./SideBar/ProjectDetails/ProjectDetails";

function App() {
  const adminUser = {
    email : "admin@admin.com",
    password : "admin123"
  }
  const [user, setUser] = useState({name : "", email : ""});
  const [error, setError] = useState("");
  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password)
    {
      console.log("Logged in");
      setUser(
        {
          name:details.name,
          email:details.email
        }
      );
    } else 
    {
      console.log("Details do not match!");
      setError("Details do not match!");
    }
  }
  const Logout = () =>
  {
    setUser({
      name : "", email : " "
    });
  }
  return (
    <div className = "App">
      {
        (user.email != "") ? (
          <div className="welcome">\
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
            </div>)
            :(
              <LoginForm Login = {Login} error = {error}/>
            )
          }
          )
          <></>
    {/* <LoginForm></LoginForm> */}
      <Router>
        <SideBar />
        <Switch>
          <Route path="/tasks" exact component={TaskList} />
          <Route path="/board" exact component={Board} />
          <Route path="/reports" component={Reports} />
          <Route path="/project" component={Project} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
