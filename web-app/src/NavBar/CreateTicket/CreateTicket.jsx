// function for Creating the Ticket

import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/js/bootstrap.min.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ticketApis from "../../services/tickets-service.js";
import "./CreateTicket.scss";
import sprintApis from "../../services/sprint-service.js";

require("react-bootstrap/ModalHeader");

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      isEditMode: this.props.isEditMode,
      issueName: this.props.issueName,
      issueType: [this.props.issueType],
      issueDescription: this.props.issueDescription,
      reporter: this.props.reporter,
      assignee: this.props.assignee,
      priority: [this.props.priority],
      status: [this.props.status],
      taskId: this.props.taskId,
      users: [],
      sprints: [],
      allAvailableSprint: [],
      // TicketSprint: "",
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleTextAreaInputChange = this.handleTextAreaInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen,
      isEditMode: nextProps.isEditMode,
      issueName: nextProps.issueName,
      issueDescription: nextProps.issueDescription,
      issueType: nextProps.issueType,
      assignee: nextProps.assignee,
      reporter: nextProps.reporter,
      priority: nextProps.priority,
      status: nextProps.status,
      taskId: nextProps.taskId,
    });
  }

  // openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  addTask() {
    const payload = {
      name: this.name.value,
      description: this.description.value,
      ticketType: [this.type.value],
      createdBy: this.reporter.value,
      assignedTo: this.assignee.value,
      priority: [this.priority.value],
      status: ["Open"],
    };
    // when a new ticket is added to a sprint - also update in the sprint api
    ticketApis.createTicket(payload).then((result) => result.json());
    this.closeModal();
    this.props.parentCallback(payload);
  }

  updateTask() {
    const payload = {
      name: this.name.value,
      description: this.description.value,
      ticketType: [this.type.value],
      createdBy: this.reporter.value,
      assignedTo: this.assignee.value,
      priority: [this.priority.value],
      status: [this.status.value],
    };
    ticketApis
      .updateTicket(this.state.taskId, payload)
      .then((result) =>
        result.json().then((res) => this.props.parentCallback(res))
      );
    this.closeModal();
  }
  componentDidMount() {
    sprintApis
      .getAllSprints()
      .then((result) => result.json())
      .then((allAvailableSprint) => this.setState({ allAvailableSprint }));
  }

  handleIssueType = (event) => {
    this.setState({ issueType: event.target.value });
  };

  handleTextAreaInputChange(event) {
    this.setState({
      issueDescription: event.target.value,
    });
  }

  handleTextInputChange(event) {
    this.setState({
      issueName: event.target.value,
    });
  }

  handleReporter(event) {
    this.setState({
      reporter: event.target.value,
    });
  }

  handleAssignee(event) {
    this.setState({
      assignee: event.target.value,
    });
  }

  handlePriority(event) {
    this.setState({
      priority: event.target.value,
    });
  }

  handleSprint(event) {
    this.setState({
      sprint: event.target.value,
    });
  }

  handleStatus(event) {
    this.setState({
      status: event.target.value,
    });
  }

  render() {
    const sprintLength = this.state.allAvailableSprint.length;
    let sprintAvailableOptions;
    let title;
    let button;
    if (sprintLength === 0) {
      sprintAvailableOptions = <option>No sprints to select</option>;
    } else {
      sprintAvailableOptions = this.state.allAvailableSprint.map((sprint) => {
        return <option value={sprint.sprintName}> {sprint.sprintName} </option>;
      });
    }
    if (this.state.isEditMode) {
      title = "Edit Ticket";
      button = (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.updateTask.bind(this)}
        >
          Update
        </button>
      );
    } else {
      title = "Create Ticket";
      button = (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.addTask.bind(this)}
        >
          Add
        </button>
      );
    }
    return (
      <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Form.Control
                as="input"
                onChange={this.handleTextInputChange.bind(this)}
                ref={(c) => (this.name = c)}
                value={this.state.issueName}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={this.handleTextAreaInputChange.bind(this)}
                ref={(c) => (this.description = c)}
                value={this.state.issueDescription}
              />
            </div>
            <div className="mb-3 dropdown-ct">
              <label className="form-label">Issue Type</label>
              <select
                onChange={this.handleIssueType.bind(this)}
                ref={(c) => (this.type = c)}
                value={this.state.issueType}
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
                value={this.state.reporter}
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
                value={this.state.assignee}
              >
                <option value="Aravind">Aravind</option>
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
                value={this.state.priority}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="mb-3 dropdown-ct">
              <label className="form-label">Status</label>
              <select
                onChange={this.handleStatus.bind(this)}
                ref={(c) => (this.status = c)}
                value={this.state.status}
              >
                <option value="Open">Open</option>
                <option value="In progress">In progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="mb-3 dropdown-ct">
              <label className="form-label">Sprint</label>
              <select
                onChange={this.handleSprint.bind(this)}
                ref={(c) => (this.sprint = c)}
                value={this.state.sprint}
              >
                {sprintAvailableOptions}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {button}
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Project;
