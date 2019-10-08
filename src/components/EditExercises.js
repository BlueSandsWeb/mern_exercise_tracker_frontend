import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Header, Form, Label, Button, Select } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";

export default class EditExercises extends Component {
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
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/exercises/${this.props.match.params.id}`
      )
      .then(res => {
        console.log(res.data.description);
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        });
      })
      .catch(err => console.log(`Error: ${err}`));

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/`).then(res => {
      this.setState({
        users: res.data.map(user => {
          return {
            key: user.username,
            value: user.username,
            text: user.username
          };
        }),
        username: this.state.username
      });
    });
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
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
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/exercises/${this.props.match.params.id}`,
        exercise
      )
      .then(res => {
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div>
        <Header as="h2">Edit New Exercise Log</Header>
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
              value={this.state.description}
              placeholder="exercise description"
              onChange={e => this.onChangeDescription(e)}
            />
          </Form.Field>
          <Form.Field>
            <Label pointing="below">Duration</Label>
            <input
              type="number"
              name="duration"
              value={this.state.duration}
              placeholder="exercise duration in min"
              onChange={e => this.onChangeDuration(e)}
            />
          </Form.Field>
          <Form.Field>
            <Label pointing="below">Date</Label>
            <div>
              <DatePicker
                value={this.state.date}
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
