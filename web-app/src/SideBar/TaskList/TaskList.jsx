/* eslint-disable eqeqeq */
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ChangeDetectionStrategyType } from "ag-grid-react/lib/shared/changeDetectionService";
import "./TaskList.scss";
import ticketApis from "../../services/tickets-service.js";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "react-bootstrap/Button";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import CreateTicket from "./../../NavBar/CreateTicket/CreateTicket";
import sprintApis from "../../services/sprint-service";
import moment from "moment";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        filter: true,
        resizable: true,
      },
      isOpen: false,
      isEditMode: false,
      issueName: "",
      issueType: [],
      issueDescription: "",
      reporter: "",
      assignee: "",
      priority: [],
      taskId: "",
      isSprintActive: false,
      selectedSprint: [],
      sprints: [],
      columnDefs: [
        { field: "name" },
        { field: "description" },
        { field: "assignedTo" },
        { field: "status", width: "150" },
        { field: "ticketType", width: "175" },
        {
          field: "priority",
          width: "150",
          cellRenderer: function (params) {
            if (params.value == "Low") {
              return <AiIcons.AiOutlineArrowDown />;
            } else if (params.value == "Medium") {
              return <VscIcons.VscThreeBars />;
            } else if (params.value == "High") {
              return <AiIcons.AiOutlineArrowUp />;
            }
          },
        },
        {
          field: "edit",
          width: "150",
          cellRenderer: () => {
            return (
              <Button
                variant="light"
                onClick={this.getSelectedRowData.bind(this)}
              >
                <AiIcons.AiFillEdit />
              </Button>
            );
          },
        },
      ],
      rowData: [],
    };
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  componentDidMount() {
    ticketApis
      .getAllTickets()
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
    sprintApis
      .getAllSprints()
      .then((result) => result.json())
      .then((sprints) => this.setState({ sprints }));
  }

  // componentDidUpdate() {
  //   if (this.state.sprints.length > 0) {
  //     this.setState({ selectedSprint: this.state.sprints[0] });
  //   }
  // }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  getSelectedRowData = () => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    this.setState({
      isOpen: true,
      isEditMode: true,
      issueName: selectedData[0].name,
      issueDescription: selectedData[0].description,
      priority: selectedData[0].priority[0],
      assignee: selectedData[0].assignee,
      reporter: selectedData[0].reporter,
      issueType: selectedData[0].ticketType[0],
      taskId: selectedData[0].id,
    });
  };

  handleCreateTicket() {
    this.setState({
      isOpen: true,
      isEditMode: false,
      issueName: "",
      issueDescription: "",
      priority: "",
      assignee: "",
      reporter: "",
      issueType: "",
      taskId: "",
    });
  }

  getUniqueListBy(arr) {
    return [...new Map(arr.map((item) => [item["id"], item])).values()];
  }

  handleCallback = (childData) => {
    if (this.state.isEditMode) {
      let updatedRowData = [...this.state.rowData, childData];
      let uniqueRowData = this.getUniqueListBy(updatedRowData);
      this.setState({ rowData: uniqueRowData });
    } else {
      this.setState({ rowData: [...this.state.rowData, childData] });
    }
    this.closeModal();
  };

  setSelectedSprint(event) {
    // this.setState({ selectedSprint: event.target.value });
  }

  handleSprint() {
    // TODO change this !!!!!
    this.setState({ selectedSprint: this.state.sprints[0] }, () => {
      const payload = {
        name: this.state.selectedSprint.sprintName,
        duration: this.state.selectedSprint.sprintDuration,
        status: this.state.selectedSprint.status,
        startDate: moment(),
        endDate: moment().add(
          parseInt(this.state.selectedSprint.sprintDuration, 10),
          "week"
        ),
      };
      sprintApis
        .updateSprint(this.state.selectedSprint.id, payload)
        .then((result) => result.json());
    });
  }

  render() {
    let options;
    let sprintLength = this.state.sprints.length;
    let isSelectedSprintActive = this.state.selectedSprint.status;
    let activeStatus;
    let createButton;
    if (sprintLength === 0) {
      options = <option>No sprints to select</option>;
    } else {
      options = this.state.sprints.map((sprint) => {
        return <option value={sprint.sprintName}> {sprint.sprintName} </option>;
      });
      if (isSelectedSprintActive) {
        activeStatus = (
          <span>
            Start date :{" "}
            {moment(this.state.selectedSprint.startDate).format("MMM Do YYYY")}{" "}
            - End date :{" "}
            {moment(this.state.selectedSprint.endDate).format("MMM Do YYYY")}
          </span>
        );
      } else {
        activeStatus = (
          <Button variant="primary" onClick={this.handleSprint.bind(this)}>
            Start Sprint
          </Button>
        );
      }
      createButton = (
        <Button variant="primary" onClick={this.handleCreateTicket.bind(this)}>
          Create Ticket
        </Button>
      );
    }
    return (
      <div className="tasklist">
        <div className="edit-ticket-btn">
          <select
            name="sprints"
            id="sprints"
            value={this.state.selectedSprint}
            onChange={this.setSelectedSprint.bind(this)}
          >
            {options}
          </select>
          {activeStatus}
        </div>

        <div className="ag-theme-alpine ag-grid-tasklist">
          <AgGridReact
            rowDataChangeDetectionStrategy={
              ChangeDetectionStrategyType.IdentityCheck
            }
            rowData={this.state.rowData}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onCellValueChanged={this.getSelectedRowData}
            onGridReady={this.onGridReady}
            rowSelection={"single"}
          ></AgGridReact>
        </div>
        <div className="create-ticket-btn">{createButton}</div>
        <CreateTicket
          parentCallback={this.handleCallback.bind(this)}
          isOpen={this.state.isOpen}
          isEditMode={this.state.isEditMode}
          issueName={this.state.issueName}
          issueDescription={this.state.issueDescription}
          priority={[this.state.priority]}
          assignee={this.state.assignee}
          reporter={this.state.reporter}
          issueType={[this.state.issueType]}
          taskId={this.state.taskId}
        ></CreateTicket>
      </div>
    );
  }
}

export default TaskList;
