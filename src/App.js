import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <div className="container">
          <div className="row">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
