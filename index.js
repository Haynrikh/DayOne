const express = require("express");
const app = express();
const port = 9000;
const db = require("./queries");

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.post("/users", db.createUser);
app.put("/users", db.updateUser);
app.delete("/users", db.deleteUser);

app.get("/notes", (req, res) => {
  res.send(notes);
});

// app.get("/notes/:id", (req, res) => {
//   const finder = notes.find((note) => note.id == req.params.id);
//   if (finder) {
//     const temp = finder;
//     res.status(201);
//     res.send(finder);
//   }
// });

// app.post("/note", (req, res) => {
//   notes.push({
//     title: req.body.title,
//     isDone: req.body.isDone,
//   });
//   res.status(201);
//   res.send(notes);
// });

// app.delete("/note/:id", (req, res) => {
//   const finder = notes.find((note) => note.id == req.params.id);
//   if (finder) {
//     notes.pop(finder);
//   } else {
//     res.send("Sorry this ID does not exist");
//   }
//   res.status(201);
//   res.send(notes);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
