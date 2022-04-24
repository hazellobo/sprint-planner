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
        // editable: true,
        isOpen: false,
        isEditMode: false,
        issueName: "",
        issueType: [],
        issueDescription: "",
        reporter: "",
        assignee: "",
        priority: [],
        taskId: "",
      },
      columnDefs: [
        { field: "name" },
        { field: "description" },
        { field: "assignedTo" },
        { field: "status" },
        { field: "ticketType" },
        {
          field: "priority",
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

  componentDidMount() {
    ticketApis
      .getAllTickets()
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

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

  render() {
    return (
      <div className="tasklist">
        <div className="edit-ticket-btn">
          <select name="sprints" id="sprints">
            <option value="volvo">Sprint1</option>
            <option value="saab">Backlog</option>
            <option value="opel">Future sprint</option>
          </select>
          <Button variant="primary" onClick={this.getSelectedRowData}>
            Edit Ticket
          </Button>
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
            // frameworkComponents={this.state.frameworkComponents}
          ></AgGridReact>
          <CreateTicket
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
      </div>
    );
  }
}

export default TaskList;
