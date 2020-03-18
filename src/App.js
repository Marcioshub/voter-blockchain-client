import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Votes from "./pages/Votes";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/votes" component={Votes} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
