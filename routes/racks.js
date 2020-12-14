const express = require("express");
const Router = express.Router();
const RacksController = require("../controllers/racks");
const authorization = require("../middlewares/authorization");
const { LIBRARIAN } = require("../constant/role");

Router.get("/", RacksController.getAllRacks);
Router.get("/:id", RacksController.getRackById);

Router.post("/", authorization(LIBRARIAN), RacksController.addNewRack);

Router.patch("/:id", authorization(LIBRARIAN), RacksController.updateRack);
Router.delete("/:id", authorization(LIBRARIAN), RacksController.deleteRack);

module.exports = Router;
