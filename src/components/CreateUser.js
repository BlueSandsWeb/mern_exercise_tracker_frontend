import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Header, Label, Button } from "semantic-ui-react";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/add`, user)
      .then(res => {
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <Header as="h2">Create New User</Header>
        <Form onSubmit={e => this.onSubmit(e)}>
          <Form.Field>
            <Label pointing="below">Username</Label>
            <input type="text" onChange={e => this.onChangeUsername(e)} />
          </Form.Field>
          <Button positive>Submit</Button>
        </Form>
      </div>
    );
  }
}
