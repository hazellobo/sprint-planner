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
        editable: true,
      },
      columnDefs: [
        { field: "name" },
        { field: "description", width: 400, editable: true },
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
      ],
      rowData: [],
    };
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
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
    console.log("log data", [...selectedData], selectedData[0].id);
    // alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    ticketApis
      .updateTicket(selectedData[0].id, selectedData[0])
      .then((result) => result.json())
      .then((json) => console.log(json));
    // .then((rowData) => this.setState({ rowData }));
  };

  onTypeChange = (color) => {
    console.log("type Change", color);
  };

  onStatusChange = (color) => {
    console.log("Color Change", color);
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
        </div>
      </div>
    );
  }
}

export default TaskList;
