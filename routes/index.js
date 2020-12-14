const express = require("express");
const Router = express.Router();
const booksRoutes = require("./books");
const racksRoutes = require("./racks");
const borrowBooksRoutes = require("./borrow_books");
const authRoutes = require("./auth");
const authentication = require("../middlewares/authentication");

Router.use("/books", authentication, booksRoutes);
Router.use("/racks", authentication, racksRoutes);
Router.use("/borrow_books", authentication, borrowBooksRoutes);
Router.use("/auth", authRoutes);

Router.use("/", (req, res) => res.send("Hello from server"));

module.exports = Router;
