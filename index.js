const express = require("express");
const app = express();
const port = 9000;
const db = require("./queries");

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/notes", db.getNotes);
app.post("/notes", db.createNote);
app.put("/notes", db.updateNote);
app.delete("/notes", db.deleteNote);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
