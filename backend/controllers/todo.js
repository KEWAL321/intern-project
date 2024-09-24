const Todo = require("../models/todo.js");

module.exports.index = async (req, res, next) => {
  const allTodos = await Todo.find({});
  res.json(allTodos);
};

module.exports.renderCreateNew = async (req, res, next) => {
  let { todo } = req.body;
  const newTodo = new Todo({ todo });
  newTodo.save();
  res.json({ message: "Todo added" });
};

module.exports.renderEdit = async (req, res, next) => {
  let { id } = req.params;
  let todo = await Todo.findByIdAndUpdate(id);
};

module.exports.renderUpdate = async (req, res, next) => {
  let { id } = req.params;
  let todo = await Todo.findByIdAndUpdate(id, {
    ...req.body.todo,
  });
};

module.exports.renderDelete = async (req, res, next) => {
  let { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: `Todo with id ${id} deleted` });
};
