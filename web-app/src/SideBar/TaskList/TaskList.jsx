import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const TaskList = () => {
  const [rowData] = useState([
    {
      name: "Add user stories",
      description: "add add add add adad adad add",
      assignedTo: "Anvitha",
      status: "open",
      type: "bug",
      priority: "high"
    },
    {
      name: "Add screens",
      description: "add add add add adad adad add",
      assignedTo: "Anvitha",
      status: "open",
      type: "bug",
      priority: "medium"
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  const [columnDefs] = useState([
    { field: "name" },
    { field: "description" },
    { field: "assignedTo" },
    { field: "status" },
    { field: "type" },
    {field: "priority"}
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef}></AgGridReact>
    </div>
  );
};

export default TaskList;
