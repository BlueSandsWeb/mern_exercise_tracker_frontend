// Modules
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercises from "./components/EditExercises";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

// Styles
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" exact component={EditExercises} />
          <Route path="/create" exact component={CreateExercise} />
          <Route path="/user" exact component={CreateUser} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
