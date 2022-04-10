const sql = require("./db.js");
// constructor
const Movie = function(movie) {
  this.title = movie.title;
  this.genero = movie.genero;
  this.visto = movie.visto;
};
Movie.create = (newMovie, result) => {
  sql.query("INSERT INTO filmes SET ?", newMovie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("filme criado: ", { id: res.insertId, ...newMovie });
    result(null, { id: res.insertId, ...newMovie });
  });
};
Movie.findById = (id, result) => {
  sql.query(`SELECT * FROM filmes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("filme encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Movie with the id
    result({ kind: "not_found" }, null);
  });
};
Movie.getAll = (title, result) => {
  let query = "SELECT * FROM filmes";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("filmes: ", res);
    result(null, res);
  });
};
Movie.getAllVisto = result => {
  sql.query("SELECT * FROM filmes WHERE visto=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("movies: ", res);
    result(null, res);
  });
};
Movie.updateById = (id, movie, result) => {
  sql.query(
    "UPDATE filmes SET title = ?, genero = ?, visto = ? WHERE id = ?",
    [movie.title, movie.genero, movie.visto, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Movie with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("filme atualizado: ", { id: id, ...movie });
      result(null, { id: id, ...movie });
    }
  );
};
Movie.remove = (id, result) => {
  sql.query("DELETE FROM filmes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Movie with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("filme deletado com id: ", id);
    result(null, res);
  });
};
Movie.removeAll = result => {
  sql.query("DELETE FROM filmes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deletado ${res.affectedRows} filmes`);
    result(null, res);
  });
};
module.exports = Movie;