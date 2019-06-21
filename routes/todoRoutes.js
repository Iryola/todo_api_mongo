const express = require("express");
const router = express.Router();

const Todo = require("../models/todoModel");

//GET
router.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log("Get todo error: " + err);
    } else {
      res.status(200).json(todos);
    }
  });
});

//POST
router.route("/add-todo").post((req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json(todo);
    })
    .catch(err => {
      res.status(400).send("Unable to add item: " + err);
    });
});

//PUT
router.route("/todo/:id").put((req, res) => {
  const id = req.params.id;

  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(404).send("Item not found" + err);
    } else {
      todo.title = req.body.title;
      todo.done = req.body.done;

      todo
        .save()
        .then(todo => {
          res.json(`Todo Item: '${todo}' has been updated`);
        })
        .catch(err => {
          res.status(400).send("unable to update: " + err);
        });
    }
  });
});
//DELETE
router.route("/delete/:id").delete((req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) {
      res.json("Could not delete: " + err);
    } else {
      res.json("Deleted!@#");
    }
  });
});

module.exports = router;
