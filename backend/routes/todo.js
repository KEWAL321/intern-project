const express = require("express");
const router = express.Router();
const Todos = require("../models/todo");
const todoController = require("../controllers/todo");

router
  .route("/")
  .get(todoController.index)
  .post(todoController.renderCreateNew);

router.route("/:id").delete(todoController.renderDelete);
router.route("/:id").put(todoController.renderUpdate);

module.exports = router;
