const req = require("express/lib/request");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "mypass",
  port: 5432,
});
const getNotes = async (req, res) => {
  pool.query("SELECT * FROM todo", async (error, results) => {
    if (error) {
      throw error;
    }
    await res.status(200).json(results.rows);
  });
};

const createNote = async (req, res) => {
  const { id, title, done } = req.body;
  pool.query(
    "INSERT INTO todo (id, title, done) VALUES ($1, $2, $3)",
    [id, title, done],
    async (error, response) => {
      if (error) {
        throw error;
      } else {
        await res.status(201).send(`Note added`);
      }
    }
  );
};

const updateNote = async (req, res) => {
  const id = req.body.id;
  const { title, done } = req.body;
  pool.query(
    "UPDATE todo SET title = $1, done = $2 WHERE id = $3",
    [title, done, id],
    async (error, results) => {
      if (error) {
        throw error;
      }
      await res.status(200).send(`Note modified`);
    }
  );
};
const deleteNote = async (req, res) => {
  const id = req.body.id;
  pool.query("DELETE FROM todo WHERE id = $1", [id], async (error, results) => {
    if (error) {
      throw error;
    }
    await res.status(200).send(`Note deleted with ID: ${id}`);
  });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
