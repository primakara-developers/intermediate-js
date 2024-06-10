const express = require("express");
const {
  getAllBooks,
  createBook,
  getOneBookById,
  deleteBookById,
  register,
  login,
  updateBookById,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  likeOrDislike,
} = require("./controllers");
const route = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const parser = require("./multerConfig");

route.post("/register", register);
route.post("/login", login);

route.use((req, res, next) => {
  const authHeader = req.headers["token"];
  const token = authHeader;

  if (token == null) {
    return res.status(401).json({ error: "Token tidak ada, akses ditolak" });
  }
  const verifryToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifryToken) {
    return res.status(403).json({ error: "Token tidak valid" });
  } else {
    req.user = verifryToken;
    next();
  }
});

route.get("/books", getAllBooks);
route.post("/books/menambah", parser.single("image"), createBook);
route.put("/book/:id/edit", updateBookById);
route.get("/book/:id", getOneBookById);
route.delete("/book/:id", deleteBookById);

route.post("/profile", createUserProfile);
route.get("/profile", getUserProfile);
route.put("/profile", updateUserProfile);

route.post("/like/:bookId", likeOrDislike);

module.exports = route;
