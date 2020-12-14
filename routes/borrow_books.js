const express = require("express");
const Router = express.Router();
const BorrowBooksController = require("../controllers/borrow_books");
const authorization = require("../middlewares/authorization");
const { LIBRARIAN, CUSTOMER } = require("../constant/role");

Router.get(
  "/",
  authorization(LIBRARIAN),
  BorrowBooksController.getAllBorrowBooks
);
Router.get(
  "/:id",
  authorization(LIBRARIAN),
  BorrowBooksController.getBorrowBookById
);

Router.post(
  "/",
  authorization(CUSTOMER),
  BorrowBooksController.addNewBorrowBook
);

Router.patch(
  "/:id",
  authorization(LIBRARIAN),
  BorrowBooksController.updateBorrowBook
);
Router.delete(
  "/:id",
  authorization(LIBRARIAN),
  BorrowBooksController.deleteBorrowBook
);

module.exports = Router;
