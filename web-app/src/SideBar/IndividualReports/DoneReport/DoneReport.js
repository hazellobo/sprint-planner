import React from "react";
import Plot from "react-plotly.js";

class DoneReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          values: [this.props.doneTicket, this.props.totalTickets],
          labels: ["Done", "Total tickets"],
          type: "pie",
        },
      ],
      layout: {
        autosize: false,
        height: 530,
        width: 370,
        title: "Done",
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: [
        {
          values: [nextProps.doneTicket, nextProps.totalTickets],
          labels: ["Done", "Total tickets"],
          type: "pie",
        },
      ],
    });
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

export default DoneReport;
