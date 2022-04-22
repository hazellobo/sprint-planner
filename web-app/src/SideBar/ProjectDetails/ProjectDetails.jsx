import React from "react";
// import "~bootstrap/scss/bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";

require("react-bootstrap/ModalHeader");

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      ProjectName: "",
      ProjectDescription: "",
      GithubURL: "",
      AddTeammates: [],
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

  render() {
    return (
      <div className="App">
        <div className="container p-5">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createProjectModal"
          >
            User Login
          </button>

          <div
            className="modal fade"
            id="createProjectModal"
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
                    Create Project
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
                      <label className="form-label">Project Name</label>
                      <input
                        type="text"
                        name="ProjectName"
                        value={this.state.ProjectName}
                        onChange={(event) => this.handleChange(event)}
                        className="form-control"
                        id="ProjectName"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="ProjectDescription"
                        id="ProjectDescription"
                        value={this.state.ProjectDescription}
                        onChange={(event) => this.handleChange(event)}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Github URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="GithubURL"
                        id="GithubURL"
                        value={this.state.GithubURL}
                        onChange={(event) => this.handleChange(event)}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Add Teammates</label>
                      <textarea
                        className="form-control"
                        name="AddTeammates"
                        id="AddTeammates"
                        value={this.state.AddTeammates}
                        onChange={(event) => this.handleChange(event)}
                        aria-describedby="emailHelp"
                      />
                      <label className="form-label">
                        separate teammates by ","
                      </label>
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
