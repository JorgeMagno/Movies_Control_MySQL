import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);

    this.state = {
      id: null,
      title: "",
      genero: "", 
      visto: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeGenero(e) {
    this.setState({
      genero: e.target.value
    });
  }

  saveMovie() {
    var data = {
      title: this.state.title,
      genero: this.state.genero
    };

    MovieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          genero: response.data.genero,
          visto: response.data.visto,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMovie() {
    this.setState({
      id: null,
      title: "",
      genero: "",
      visto: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Você enviou com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newMovie}>
              Adicionar outro
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="genero">Gênero</label>
              <input
                type="text"
                className="form-control"
                id="genero"
                required
                value={this.state.genero}
                onChange={this.onChangeGenero}
                name="genero"
              />
            </div>

            <button onClick={this.saveMovie} className="btn btn-success">
              Enviar
            </button>
          </div>
        )}
      </div>
    );
  }
}
