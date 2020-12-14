const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(routes);

    app.use(errorHandler);

    app.listen(process.env.PORT, () =>
      console.log(`Server running at localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
