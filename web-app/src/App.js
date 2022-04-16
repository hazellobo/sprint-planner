import "./App.scss";
// import NavBar from "./NavBar/NavBar";
import Sidebar from "./Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TaskList } from "./Sidebar/TaskList/TaskList";
import { Reports } from "./Sidebar/Reports/Reports";
import { Board } from "./Sidebar/Board/Board";
import { Project } from "./Sidebar/ProjectDetails/ProjectDetails";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/tasks" exact component={TaskList} />
          <Route path="/board" exact component={Board} />
          <Route path="/reports" component={Reports} />
          <Route path="/project" component={Project} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
