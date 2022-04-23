import React from "react";
// import "~bootstrap/scss/bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import projectApis from "../../services/project-service.js";

require("react-bootstrap/ModalHeader");

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      name: "",
      description: "",
      url: "",
      scrumTeam: [],
      scrumDuration: "",
      scrumIds:""
    };
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

      addTask = async () =>{
        const { name, description, url, scrumTeam, scrumIds} = this.state
        const payload = { name, description, url, scrumTeam, scrumIds}
        await projectApis.createProject(payload).then(res => {
            this.setState({
                name: '', 
                description: '',
                url: '',
                scrumTeam: [],
                isOpen: false,
                scrumIds: ""
            })
        })
        }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state.scrumTeam);
  }

  handleTeam(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value.split(","),
    });
    console.log(this.state.scrumTeam);
  }

  render() {
    return (
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(event) => this.handleChange(event)}
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={this.state.description}
            onChange={(event) => this.handleChange(event)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Github URL</label>
          <input
            type="text"
            className="form-control"
            name="url"
            id="url"
            value={this.state.url}
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
            onChange={(event) => this.handleTeam(event)}
            aria-describedby="emailHelp"
          />
          <label className="form-label">
            separate teammates by ","
          </label>
        </div>
      </form>
      <div className="modal-footer">
          <button type="submit" className="btn btn-primary" onClick={this.addTask}>
            Create Project
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
      
    );
  }
}

export default Project;

