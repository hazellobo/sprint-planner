import React from "react";
import Plot from "react-plotly.js";

class OpenReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          values: [this.props.openTicket, this.props.totalTickets],
          labels: ["Open", "Total tickets"],
          type: "pie",
        },
      ],
      layout: {
        autosize: false,
        height: 530,
        width: 370,
        title: "Open",
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: [
        {
          values: [nextProps.openTicket, nextProps.totalTickets],
          labels: ["Open", "Total tickets"],
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

export default OpenReport;