import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Header, Table } from "semantic-ui-react";
import Exercise from "./Exercise";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/exercises/`)
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  deleteExercise = id => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/exercises/${id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  exerciseList = () => {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <Header as="h3">Logged Exercises</Header>
        <Table celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.exerciseList()}</Table.Body>
        </Table>
      </div>
    );
  }
}
