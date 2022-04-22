import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ChangeDetectionStrategyType } from "ag-grid-react/lib/shared/changeDetectionService";
import "./TaskList.scss";
import ticketApis from "../../services/tickets-service.js";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "react-bootstrap/Button";
import TypeRenderer from "./typeRenderer";
import StatusRenderer from "./statusRenderer";

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
        {
          field: "status",
          cellEditor: StatusRenderer,
          cellRenderer: function (params) {
            // if (params.value === "Closed") {
            return `<span>` + params.value + `</span>`;
            // }
          },
        },
        { field: "ticketType", cellEditor: TypeRenderer },
        { field: "priority" },
      ],
      rowData: [],
    };
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  // cellEditorSelector(params) {
  //   console.log(params.data)
  //   if (params.data === 'ticketType') {
  //     return {
  //       component: TypeRenderer,
  //     };
  //   }

  //   if (params.data.type === 'status') {
  //     return {
  //       component: 'agRichSelectCellEditor',
  //       params: {
  //         values: ['Male', 'Female'],
  //       },
  //       popup: true,
  //     };
  //   }

  //   return undefined;
  // }

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
          {/* <h5>Task List</h5> */}
          {/* <DropdownButton id="dropdown-basic-button" title="Select sprint">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </DropdownButton> */}
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
