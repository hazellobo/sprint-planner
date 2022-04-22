import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/js/bootstrap.min.js";

require("react-bootstrap/ModalHeader");

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      IssueType: "",
      IssueDescription: "",
      Reporter: "",
      Assignee: "",
      Priority: "",
      Users: ["ghsad", "hdagcvf", "hgasdfc"],
      Sprints: [],
      TicketSprint: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  /*
      addTask = async () =>{
        const { ProjectName, ProjectDescription, GithubURL, AddTeammates } = this.state
        const payload = { ProjectName, ProjectDescription, GithubURL, AddTeammates}
        await createProject(payload).then(res => {
            this.setState({
                ProjectName: '', 
                ProjectDescription: '',
                GithubURL: '',
                AddTeammates: [],
                isOpen: false
            })
        })
        }*/

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(event);
    this.setState({
      [name]: value,
    });
  }

  handleIssueType = (e) => {
    this.setState.IssueType = e;
  };

  handleInputChange(event) {
    this.setState({
      IssueDescription: event,
    });
  }

  handleReporter(event) {
    this.setState({
      Assignee: event,
    });
    console.log(event);
  }

  handleAssignee(event) {
    this.setState({
      Reporter: event,
    });
  }

  handlePriority(event) {
    this.setState({
      Priority: event,
    });
  }

  handleSpint(event) {
    this.setState({
      TicketSprint: event,
    });
  }
  handleSpint;

  render() {
    return (
      <div className="App">
        <div className="container p-5">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create Ticket
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title text-danger"
                    id="exampleModalLabel"
                  >
                    Create Ticket
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Issue Type</label>
                      <select onChange={this.handleIssueType}>
                        <option value="Task">Task</option>
                        <option value="Bug">Bug</option>
                        <option value="Story">Story</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        name="address"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Reporter</label>
                      <select onChange={this.handleReporter}>
                        {this.state.Users.map((User) => {
                          return <option value={User}> {User} </option>;
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Assignee</label>
                      <select onChange={this.handleAssignee}>
                        {this.state.Users.map((User) => {
                          return <option value={User}> {User} </option>;
                        })}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select onChange={this.handlePriority}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Sprint</label>
                      <select onChange={this.handleSpint}>
                        {this.state.Sprints.map((Sprint) => {
                          return <option value={Sprint}> {Sprint} </option>;
                        })}
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
