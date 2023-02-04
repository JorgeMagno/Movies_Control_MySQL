import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.updateVisto = this.updateVisto.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      currentMovie: {
        id: null,
        title: "",
        genero: "",
        visto: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          title: title
        }
      };
    });
  }

  onChangeGenero(e) {
    const genero = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        genero: genero
      }
    }));
  }

  getMovie(id) {
    MovieDataService.get(id)
      .then(response => {
        this.setState({
          currentMovie: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateVisto(status) {
    var data = {
      id: this.state.currentMovie.id,
      title: this.state.currentMovie.title,
      genero: this.state.currentMovie.genero,
      visto: status
    };

    MovieDataService.update(this.state.currentMovie.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMovie: {
            ...prevState.currentMovie,
            visto: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMovie() {
    MovieDataService.update(
      this.state.currentMovie.id,
      this.state.currentMovie
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O filme foi atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMovie() {    
    MovieDataService.delete(this.state.currentMovie.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/movies')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMovie } = this.state;

    return (
      <div>
        {currentMovie ? (
          <div className="edit-form">
            <h4>Filme</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMovie.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genero">Gênero</label>
                <input
                  type="text"
                  className="form-control"
                  id="genero"
                  value={currentMovie.genero}
                  onChange={this.onChangeGenero}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMovie.visto ? "Visto" : "Pendente"}
              </div>
            </form>

            {currentMovie.visto ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateVisto(false)}
              >
                Não Visto
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateVisto(true)}
              >
                Visto
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMovie}
            >
              Remover
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMovie}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Escolha um Filme</p>
          </div>
        )}
      </div>
    );
  }
}
