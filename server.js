const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const Todo = require("./model");
const Contact = require("./contact");

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

//add contact

app.post("/addcontact", async (req, res) => {
  const { name, number, address } = req.body;
  try {
    const contact = new Contact({ name, number, address });
    await contact.save();
    res.json(await Contact.find({}));

    res.json();
  } catch (err) {
    console.log(err);
  }
});

//get contact details

app.get("/contact", async (req, res) => {
  try {
    res.json(await Contact.find());
  } catch (err) {
    console.log(err);
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleUser = await Contact.findById(id);
    res.json(getSingleUser);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log("server start"));
