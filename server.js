const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const Todo = require("./model");

mongoose
  .connect(
    "mongodb+srv://avinash:LE9e9K7eKwrmFGyA@cluster0.istpydn.mongodb.net/todos-app",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

app.post("/addtodo", async (req, res) => {
  const { task } = req.body;

  try {
    const todo = new Todo({ task });
    await todo.save();
    res.json(await Todo.find({}));
  } catch (err) {
    console.log(err);
  }
});

app.get("/todos", (req, res) => {
  Todo.find({})
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/todos/:id", async (req, res) => {
  try {
    const getSingleTodo = await Todo.findById(req.params.id);
    res.json(getSingleTodo);
  } catch (err) {
    console.log(err);
  }
});

app.get("/deletetodo/:id", async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(await Todo.find());
  } catch (err) {
    console.log(err);
  }
});

// app.delete("/todo/:_id",);

app.listen(3000, () => console.log("server start"));
