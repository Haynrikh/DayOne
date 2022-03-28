const Pool = require("pg").Pool;
require("dotenv").config();
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD } = require("./configs");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getNotes = async (req, res) => {
  await pool.query("SELECT * FROM todo", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  if (!isNaN(id) && id > 0) {
    await pool.query(
      "SELECT * FROM todo WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  } else {
    res.send(404).send("ID not found");
  }
};

const createNote = async (req, res) => {
  const { title, done } = req.body;
  await pool.query(
    "INSERT INTO todo (title, done) VALUES ($1, $2)",
    [title, done],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send("Note created");
    }
  );
};

const updateNote = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id > 0) {
    const { title, done } = req.body;
    await pool.query(
      "UPDATE todo SET title = $1, done = $2 WHERE id = $3",
      [title, done, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Note modified with ID: ${id}`);
      }
    );
  } else {
    res.send(404).send("ID not found");
  }
};
const deleteNote = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id > 0) {
    await pool.query(
      "DELETE FROM todo WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Note deleted with ID: ${id}`);
      }
    );
  } else {
    res.send(404).send("ID not found");
  }
};

module.exports = {
  getNotes,
  getUserById,
  createNote,
  updateNote,
  deleteNote,
};
