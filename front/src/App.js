import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMovie from "./components/add-movie.component";
import Movie from "./components/movie.component";
import MoviesList from "./components/movies-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/movies"} className="navbar-brand">
            Movies List
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Filmes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/movies"]} component={MoviesList} />
            <Route exact path="/add" component={AddMovie} />
            <Route path="/movies/:id" component={Movie} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
