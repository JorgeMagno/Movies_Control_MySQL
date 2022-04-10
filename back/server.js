const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:5001"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Aplicação Movie List." });
});
require("./app/routes/movie.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
require("./app/routes/movie.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});