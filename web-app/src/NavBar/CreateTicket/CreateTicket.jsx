import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

require("react-bootstrap/ModalHeader");

class CreateTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      IssueType: "",
      IssueDescription: "",
      Reporter: "",
      Assignee: "",
      Priority: "",
    };
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
    this.setState({
      [name]: value.split(","),
    });
    console.log(this.state.AddTeammates);
  }

  handleIssueSelect(e) {
    this.setState({
      IssueType: e.eventKey,
    });
  }

  handleReporterSelect(e) {
    this.setState({
      Reporter: e.eventKey,
    });
  }

  handleAssigneeSelect(e) {
    this.setState({
      Assignee: e.eventKey,
    });
  }

  handlePrioritySelect(e) {
    this.setState({
      Priority: e.eventKey,
    });
  }

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
            User Login
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="IssueDescription"
                        id="IssueDescription"
                        value={this.state.IssueDescription}
                        onChange={(event) => this.handleChange(event)}
                        aria-describedby="emailHelp"
                      />
                    </div>

                    <div className="Issue Type">
                      <label>Select Issue :</label>
                      <DropdownButton
                        alignRight
                        title="Dropdown right"
                        id="dropdown-menu-align-right"
                        onSelect={this.handleIssueSelect()}
                      >
                        <option selected>Issue Type</option>
                        <Dropdown.Item eventKey="Bug">Bug</Dropdown.Item>
                        <Dropdown.Item eventKey="Story">Story</Dropdown.Item>
                        <Dropdown.Divider />
                      </DropdownButton>
                    </div>

                    <div className="modal-body">
                      <label>Reporter :</label>
                      <DropdownButton
                        alignRight
                        title="Dropdown right"
                        id="dropdown-menu-align-right"
                        onSelect={this.handleReporterSelect}
                      >
                        <DropdownMenu>
                          {this.users.map((size) => (
                            <DropdownItem>{size}</DropdownItem>
                          ))}
                        </DropdownMenu>
                      </DropdownButton>
                    </div>

                    <div className="modal-body">
                      <label>Assignee :</label>
                      <DropdownButton
                        alignRight
                        title="Dropdown right"
                        id="dropdown-menu-align-right"
                        onSelect={this.handleAssigneeSelect}
                      >
                        <DropdownMenu>
                          {this.users.map((size) => (
                            <DropdownItem>{size}</DropdownItem>
                          ))}
                        </DropdownMenu>
                      </DropdownButton>
                    </div>

                    <div className="Issue Type">
                      <label>Priority :</label>
                      <DropdownButton
                        alignRight
                        title="Dropdown right"
                        id="dropdown-menu-align-right"
                        onSelect={this.handlePrioritySelect}
                      >
                        <Dropdown.Item eventKey="P1">P1</Dropdown.Item>
                        <Dropdown.Item eventKey="P2">P2</Dropdown.Item>
                        <Dropdown.Item eventKey="P3">P3</Dropdown.Item>
                        <Dropdown.Item eventKey="P4">P4</Dropdown.Item>
                        <Dropdown.Divider />
                      </DropdownButton>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Create Issue
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                  >
                    Cancel
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

export default CreateTicket;
