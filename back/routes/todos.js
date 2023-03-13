const router = require("express").Router();
const Todo = require("../models/todo");

// Find All
router.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

// Find One by todoid
router.get("/:todoid", async (req, res) => {
  const todos = await Todo.findOne({ todoid: req.params.todoid });
  if (todos) {
    res.send(todos);
  } else {
    res
      .status(404)
      .send({ message: `User with id ${req.params.todoid} not found` });
  }
});

// Create new todo document
router.post("/", async (req, res) => {
  const todos = new Todo({ todoid: req.body.todoid });
  await todos.save();
  res.send(todos);
});

// Update by todoid
router.put("/:todoid", async (req, res) => {
  const todos = await Todo.findOneAndUpdate(
    { todoid: req.params.todoid },
    { todoid: req.body.todoid }
  );
  if (todos) {
    res.send(todos);
  } else {
    res
      .status(404)
      .send({ message: `User with id ${req.params.id} not found` });
  }
});

// Delete by todoid
router.delete("/:todoid", async (req, res) => {
  const todos = await Todo.deleteOne({ todoid: req.params.todoid });
  if (todos) {
    res.send(todos);
  } else {
    res
      .status(404)
      .send({ message: `User with id ${req.params.id} not found` });
  }
});

module.exports = router;
