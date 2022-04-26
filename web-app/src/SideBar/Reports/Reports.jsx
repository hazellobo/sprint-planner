import React from "react";
import Plot from "react-plotly.js";
import "./Reports.scss";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieChartData: [
        {
          values: [19, 26, 55],
          labels: ["In progress", "Open", "Done"],
          type: "pie",
        },
      ],
      pieChartLayout: {
        height: 400,
        width: 500,
        title: "Report of the active sprint",
      },
      barChartData: [
        {
          y: [3, 2, 5],
          x: ["Aravind", "Anvitha", "Hazel"],
          type: "bar",
        },
      ],
      barChartLayout: {
        height: 400,
        width: 500,
        title: "Tickets assigned to each developer",
      },
    };
  }
  render() {
    return (
      <div className="report">
        <Plot
          data={this.state.pieChartData}
          layout={this.state.pieChartLayout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
        <Plot
          data={this.state.barChartData}
          layout={this.state.barChartLayout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}

export default Reports;
