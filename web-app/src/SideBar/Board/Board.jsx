import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import { AiFillPushpin } from "react-icons/ai";
import "./Board.scss";

class Board extends React.Component {
  state = {};

  componentDidMount() {
    
  }
  render() {
    return (
      <div className="board">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>In progress</Card.Title>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default Board;
