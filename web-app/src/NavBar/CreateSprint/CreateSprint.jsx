import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/js/bootstrap.min.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import sprintApis from "../../services/sprint-service.js"
require("react-bootstrap/ModalHeader");

class Sprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSprintOpen: this.props.isSprintOpen,
      sprintName: "",
      sprintDuration: "",
      sprintGoal: "",

      // TicketSprint: "",
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleTextAreaInputChange = this.handleTextAreaInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isSprintOpen: nextProps.isSprintOpen });
  }

  // openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isSprintOpen: false });

  createSprint= async () => {
    const {isSprintOpen, sprintName, sprintDuration, sprintGoal} = this.state
    const status= "Inactive"
    const startDate=""
    const endDate=""
    const payload = { sprintName, sprintDuration, status, startDate, endDate}
    await sprintApis.createSprint(payload).then(res => {
        this.setState({
            sprintName: "",
            sprintDuration: "",
            sprintGoal: "",
        })
    })
    console.log(payload);
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
    this.state.sprintDuration = e.target.value;
  };

  handleTextAreaInputChange(event) {
    this.setState({
        sprintGoal: event.target.value,
    });
  }

  handleTextInputChange(event) {
    this.setState({
        sprintName: event.target.value,
    });
  }


  render() {
    return (
      <Modal show={this.state.isSprintOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Sprint</Modal.Title>
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
              <label className="form-label">Goal</label>
              <Form.Control
                as="textarea"
                rows="3"
                name="address"
                onChange={this.handleTextAreaInputChange.bind(this)}
                ref={(c) => (this.description = c)}
              />
            </div>
            <div className="mb-3 dropdown-ct">
              <label className="form-label">Sprint Duration</label>
              <select
                onChange={this.handleIssueType.bind(this)}
                ref={(c) => (this.type = c)}
              >
                <option value="1 Week">1 Week</option>
                <option value="2 Weeks">2 Weeks</option>
                <option value="3 Weeks">3 Weeks</option>
              </select>
            </div>
          </form>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.createSprint.bind(this)}
          >
            Create Sprint
          </button>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Sprint;
