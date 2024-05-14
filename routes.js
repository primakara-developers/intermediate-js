const express = require("express");
const {
  getAllBooks,
  createBook,
  getOneBookById,
  deleteBookById,
  register,
  login,
} = require("./controllers");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);

route.get("/books", getAllBooks);
route.post("/books/menambah", createBook);
route.get("/book/:id", getOneBookById);
route.delete("/book/:id", deleteBookById);

module.exports = route;
