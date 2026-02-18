const express = require("express");
const router = express.Router();

// import the Sequelize Task model
const Task = require("../models/task");

// CREATE a task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE a task
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      res.send(updatedTask);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.send({ message: "Task deleted" });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
