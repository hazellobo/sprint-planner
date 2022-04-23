import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/js/bootstrap.min.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ticketApis from "../../services/tickets-service.js";
import "./CreateTicket.scss";

require("react-bootstrap/ModalHeader");

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      issueName: "",
      issueType: [],
      issueDescription: "",
      reporter: "",
      assignee: "",
      priority: [],
      users: [],
      sprints: [],
      // TicketSprint: "",
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleTextAreaInputChange = this.handleTextAreaInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen });
  }

  // openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  addTask() {
    console.log(this.state);
    const payload = {
      name: this.name.value,
      description: this.description.value,
      ticketType: [this.type.value],
      createdBy: this.reporter.value,
      assignedTo: this.assignee.value,
      priority: [this.priority.value],
      status: ["Open"],
    };
    console.log(payload);
    ticketApis.createTicket(payload).then((result) => result.json());
    this.closeModal();
  }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   console.log(event);
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  handleIssueType = (e) => {
    this.setState.issueType = e;
  };

  handleTextAreaInputChange(event) {
    this.setState({
      issueDescription: event,
    });
  }

  handleTextInputChange(event) {
    this.setState({
      issueName: event,
    });
  }

  handleReporter(event) {
    this.setState({
      assignee: event,
    });
  }

  handleAssignee(event) {
    this.setState({
      reporter: event,
    });
  }

  handlePriority(event) {
    this.setState({
      priority: event,
    });
  }

  handleSprint(event) {
    this.setState({
      sprint: event,
    });
  }

  render() {
    return (
      <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Form.Control
                as="input"
                onChange={this.handleTextInputChange.bind(this)}
                ref={(c) => (this.name = c)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <Form.Control
                as="textarea"
                rows="3"
                name="address"
                onChange={this.handleTextAreaInputChange.bind(this)}
                ref={(c) => (this.description = c)}
              />
            </div>
            <div className="mb-3 dropdown-ct">
              <label className="form-label">Issue Type</label>
              <select
                onChange={this.handleIssueType.bind(this)}
                ref={(c) => (this.type = c)}
              >
                <option value="Task">Task</option>
                <option value="Bug">Bug</option>
                <option value="Story">Story</option>
              </select>
            </div>
            <div className="mb-3 dropdown-ct">
              <label className="form-label">Reporter</label>
              <select
                onChange={this.handleReporter.bind(this)}
                ref={(c) => (this.reporter = c)}
              >
                <option value="Aravind">Aravind</option>
                {/* {this.state.users.map((User) => {
      return <option value={User}> {User} </option>;
    })} */}
              </select>
            </div>
            <div className="mb-3 dropdown-ct">
              <label className="form-label">Assignee</label>
              <select
                onChange={this.handleAssignee.bind(this)}
                ref={(c) => (this.assignee = c)}
              >
                <option value="Aravind">Aravind</option>
                {/* <option value="Medium">Medium</option>
                    <option value="Low">Low</option> */}
                {/* {this.state.users.map((User) => {
      return <option value={User}> {User} </option>;
    })} */}
              </select>
            </div>

            <div className="mb-3 dropdown-ct">
              <label className="form-label">Priority</label>
              <select
                onChange={this.handlePriority.bind(this)}
                ref={(c) => (this.priority = c)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="mb-3 dropdown-ct">
              <label className="form-label">Sprint</label>
              <select
                onChange={this.handleSprint.bind(this)}
                ref={(c) => (this.sprint = c)}
              >
                <option value="Sprint 1">Sprint 1</option>
                <option value="backlog">Backlog</option>
                <option value="future">Future</option>
                {/* {this.state.sprints.map((Sprint) => {
      return <option value={Sprint}> {Sprint} </option>;
    })} */}
              </select>
            </div>
          </form>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.addTask.bind(this)}
          >
            Add
          </button>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Project;
