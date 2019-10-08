import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";

function Exercise(props) {
  console.log(props.exercise);

  let goToEditPage = id => {
    props.history.push(`/edit/${id}`);
  };
  return (
    <tr>
      <Table.Cell>{props.exercise.username}</Table.Cell>
      <Table.Cell>{props.exercise.description}</Table.Cell>
      <Table.Cell>{props.exercise.duration}</Table.Cell>
      <Table.Cell>{props.exercise.date.substring(0, 10)}</Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button primary onClick={() => goToEditPage(props.exercise._id)}>
            edit
          </Button>
          <Button.Or />
          <Button
            negative
            onClick={() => {
              props.deleteExercise(props.exercise._id);
            }}
          >
            delete
          </Button>
        </Button.Group>
      </Table.Cell>
    </tr>
  );
}

export default withRouter(Exercise);
