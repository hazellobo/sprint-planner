// Logic for the Report
import React from "react";
import Plot from "react-plotly.js";
import "./Reports.scss";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          values: [19, 26, 55],
          labels: ["In progress", "Open", "Done"],
          type: "pie",
        },
      ],
      layout: {
        height: 400,
        width: 500,
        title: "Report of the active sprint",
      },
    };
  }
  render() {
    return (
      <div className="report">
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}

export default Reports;
