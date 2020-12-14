const express = require("express");
const Router = express.Router();
const BooksController = require("../controllers/books");
const authorization = require("../middlewares/authorization");
const { LIBRARIAN } = require("../constant/role");

Router.get("/", BooksController.getAllBooks);
Router.get("/:id", BooksController.getBookById);

Router.post("/", authorization(LIBRARIAN), BooksController.addNewBook);

Router.patch("/:id", authorization(LIBRARIAN), BooksController.updateBook);
Router.delete("/:id", authorization(LIBRARIAN), BooksController.deleteBook);

module.exports = Router;
