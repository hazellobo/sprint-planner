import React from "react";
import "./NavBar.scss";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Sprint from "./CreateSprint/CreateSprint";

class NavBarC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isSprintOpen: false,
    };
  }

  openSprintModal = () => this.setState({ isSprintOpen: true });
  closeSprintModal = () => this.setState({ isSprintOpen: false });
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand>
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Sprint Planner
            </Navbar.Brand>
            <Button variant="primary" onClick={this.openSprintModal}>
              Create Sprint
            </Button>
            <Navbar.Collapse id="navbarScroll">
              <Nav>
                <NavDropdown
                  title="Profile"
                  id="navbarScrollingDropdown"
                  align={"end"}
                >
                  <NavDropdown.Item href="#action3">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Sprint isSprintOpen={this.state.isSprintOpen}></Sprint>
      </>
    );
  }
}

export default NavBarC;
