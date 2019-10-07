import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
  }

  handleNavClick = (location, name) => {
    this.setState({ activeItem: name });
    this.props.history.push(location);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          content="Home"
          onClick={e => this.handleNavClick("/", "Home")}
        />
        <Menu.Item
          name="CreateExercise"
          active={activeItem === "CreateExercise"}
          content="Create Exercise"
          onClick={e => this.handleNavClick("/create", "CreateExercise")}
        />
        <Menu.Item
          name="User"
          active={activeItem === "User"}
          content="User"
          onClick={e => this.handleNavClick("/user", "User")}
        />
      </Menu>
    );
  }
}

export default withRouter(Navbar);
