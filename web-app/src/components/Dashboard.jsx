import React from 'react'
import SideBar from "../SideBar/SideBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskList from "../SideBar/TaskList/TaskList";
import Reports from "../SideBar/Reports/Reports";
import Board from "../SideBar/Board/Board";
import Project from "../SideBar/ProjectDetails/ProjectDetails";
import NavBarC from "../NavBar/NavBar";

function Dashboard() {
 
  return (
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
              </Switch>
            </Router>
          </div>
        </div>
  )
        
}

  export default Dashboard;