const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.SERVER;
const funcs = require("./queries");
app.use(express.json());

app.get("/notes", funcs.getNotes);
app.get("/notes/:id", funcs.getUserById);
app.post("/notes", funcs.createNote);
app.put("/notes/:id", funcs.updateNote);
app.delete("/notes/:id", funcs.deleteNote);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = server;
