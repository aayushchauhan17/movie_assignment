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

  console.log(req.body);

  const newUser = new User({
    userName,
    email,
    password,
    playlist,
  });
  newUser
    .save()
    .then((use) => {
      res.status(201).json(use);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error creating a new book" });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  async function getDataDb(email, password) {
    await User.find()
      .then((data) => {
        let state = false;
        data?.forEach((e) => {
          if (e.email === email) {
            if (e.password !== password) {
              res.json({ status: "Password not matched" });
              //   return false;
            }
            res.json({ status: "Successfully verified", userData: e });
            console.log(e);
            state = true;
            // return true;
          }
        });
        if (state === false) {
          res.status(200).json({ status: "Not Found User" });
        }
      })
      .catch((err) => {
        res.status(500).json({ status: "Error fetching User" });
      });
  }
  getDataDb(email, password);
});

app.put("/addplaylist", (req, res) => {
  const { userId, playlist } = req.body;

  async function updateData(userId, playlist, oldData) {
    console.log(oldData);
    await User.findByIdAndUpdate(
      userId,
      { playlist: [...oldData?.playlist, playlist] },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ error: "Book not found" });
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        res.status(500).json({ error: "Error updating the book" + err });
      });
  }

  async function findDataFun(userId) {
    await User.findById(userId)
      .then((e) => {
        updateData(userId, playlist, e);
      })
      .catch((err) => {
        res.status(500).json({ error: "Error fetching the book" + err });
      });
  }
  findDataFun(userId);
});

app.post("/playlist", (req, res) => {
  const { userId } = req.body;

  async function findDatabyId() {
    await User.findById(userId)
      .then((e) => {
        res.json(e.playlist);
      })
      .catch((err) => {
        res.status(500).json({ error: "Error fetching the book" + err });
      });
  }

  findDatabyId(userId);
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
