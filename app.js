const express = require("express");
const getData = require("./node_files/getData.js");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const connectionDb = require("./database/db.js");
const User = require("./database/schema.js");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, "frontend")));

app.use(bodyParser.json());

connectionDb(process.env.USER, process.env.PASSWORD);

app.post("/signup", (req, res) => {
  const { userName, email, password } = req.body;
  const playlist = [];

  const newUser = new User({ userName, email, password, playlist });
  newUser
    .save()
    .then((use) => {
      res.status(201).json(use);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error creating a new book" });
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/search", (req, res) => {
  if (!req.query.title) {
    return res.json({
      error: "Please enter the title!",
    });
  }

  getData(req.query.title, (data) => {
    res.json(data);
  });
});

app.listen(port, () => {
  console.log("server is up " + port);
});
