const req = require("express/lib/request");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "mypass",
  port: 5432,
});
const getUsers = (req, res) => {
  pool.query("SELECT * FROM todo", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { id, title, done } = req.body;
  pool.query(
    "INSERT INTO todo (id, title, done) VALUES ($1, $2, $3)",
    [id, title, done],
    (error, response) => {
      if (error) {
        throw error;
      } else {
        res.status(201).send(`User added`);
      }
    }
  );
};

const updateUser = (req, res) => {
  const id = req.body.id;
  const { title, done } = req.body;
  pool.query(
    "UPDATE todo SET title = $1, done = $2 WHERE id = $3",
    [title, done, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified`);
    }
  );
};
const deleteUser = (req, res) => {
  const id = req.body.id;
  pool.query("DELETE FROM todo WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
