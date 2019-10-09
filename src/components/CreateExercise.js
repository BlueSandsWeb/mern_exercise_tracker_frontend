import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Header, Form, Label, Button, Select } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/`).then(res => {
      this.setState({
        users: res.data.map(user => {
          return {
            key: user.username,
            value: user.username,
            text: user.username
          };
        }),
        username: res.data[0].username
      });
    });
  }

  onChangeUsername = e => {
    console.log(e.target);
    this.setState({
      username: e.target.textContent
    });
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    });
  };

  onChangeDate = date => {
    this.setState({
      date: date
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/exercises/add`, exercise)
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div>
        <Header as="h2">Create New Exercise Log</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <Label pointing="below">Username</Label>
            <Select
              required
              value={this.state.username}
              name="username"
              onChange={e => this.onChangeUsername(e)}
              options={this.state.users}
            />
          </Form.Field>
          <Form.Field>
            <Label pointing="below">Exercise Description</Label>
            <input
              type="text"
              name="description"
              placeholder="exercise description"
              onChange={e => this.onChangeDescription(e)}
            />
          </Form.Field>
          <Form.Field>
            <Label pointing="below">Duration</Label>
            <input
              type="number"
              name="duration"
              placeholder="exercise duration in min"
              onChange={e => this.onChangeDuration(e)}
            />
          </Form.Field>
          <Form.Field>
            <Label pointing="below">Date</Label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={e => this.onChangeDate(e)}
              />
            </div>
          </Form.Field>
          <Button positive>Submit</Button>
        </Form>
      </div>
    );
  }
}
