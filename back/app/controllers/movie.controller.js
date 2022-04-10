const Movie = require("../models/movie.model.js");
// Create and Save a new Movie
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode ficar vazio!"
      });
    }
    // Create a Movie
    const movie = new Movie({
      title: req.body.title,
      genero: req.body.genero,
      visto: req.body.visto || false
    });
    // Save Movie in the database
    Movie.create(movie, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao criar o Filme."
        });
      else res.send(data);
    });
  };
// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    Movie.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao recuperar os filmes."
        });
      else res.send(data);
    });
  };
// Find a single Movie with a id
exports.findOne = (req, res) => {
    Movie.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Filme não encontrado com id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao recuperar o filme com id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
// find all viewed Movies
exports.findAllVisto = (req, res) => {
    Movie.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao recuperar filmes."
        });
      else res.send(data);
    });
  };
// Update a Movie identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode ficar vazio!"
      });
    }
    console.log(req.body);
    Movie.updateById(
      req.params.id,
      new Movie(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Filme não encontrado com id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erro ao atualizar o filme com id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    Movie.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Filme não encontrado com id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Não foi possível excluir o filme com ID " + req.params.id
          });
        }
      } else res.send({ message: `O filme foi excluído com sucesso!` });
    });
  };
// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
    Movie.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao remover todos os filmes."
        });
      else res.send({ message: `Todos os filmes foram excluídos com sucesso!` });
    });
  };