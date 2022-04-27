// Logic for the Report
import React from "react";
import Plot from "react-plotly.js";
import "./Reports.scss";
import sprintApis from "../../services/sprint-service";
import ticketApis from "../../services/tickets-service";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprints: [],
      selectedSprint: [],
      allTickets: [],
      rowData: [],
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

  componentDidMount() {
    sprintApis
      .getAllSprints()
      .then((result) => result.json())
      .then((sprints) =>
        this.setState({ sprints, selectedSprint: sprints[0] }, () => {
          ticketApis
            .getAllTickets()
            .then((result) => result.json())
            .then((res) => {
              this.setState({ allTickets: res });
              let filteredSprintTickets = [];
              res.forEach((element) => {
                if (
                  element.sprint[0] === this.state.selectedSprint.sprintName
                ) {
                  filteredSprintTickets.push(element);
                }
              });
              this.setState({ rowData: filteredSprintTickets }, () => {
                
              });
            });
        })
      );
  }

  setSelectedSprint(event) {
    let filteredSprintTickets = [];
    this.state.sprints.forEach((element) => {
      if (element.sprintName === event.target.value) {
        this.setState({ selectedSprint: element });
      }
    });
    this.state.allTickets.forEach((element) => {
      if (element.sprint[0] === event.target.value) {
        filteredSprintTickets.push(element);
      }
    });
    this.setState({ rowData: filteredSprintTickets });
  }

  render() {
    let options;
    if (this.state.sprints.length === 0) {
      options = <option>No sprints to select</option>;
    } else {
      options = this.state.sprints.map((sprint) => {
        return <option value={sprint.sprintName}> {sprint.sprintName} </option>;
      });
    }
    return (
      <div className="report">
        <select
          name="sprints"
          id="sprints"
          value={this.state.selectedSprint.sprintName}
          onChange={this.setSelectedSprint.bind(this)}
          ref={(c) => (this.selectedSprintName = c)}
        >
          {options}
        </select>
        <div>
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
      </div>
    );
  }
}

export default Reports;
