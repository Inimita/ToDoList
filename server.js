import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo tidak ditemukan"
    });
  }

  res.json(todo);
});


app.post("/api/todos", (req, res) => {
  console.log(req.body)
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      message: "Tugas tidak boleh kosong"
    });
  }

  const newId =
    todos.length > 0
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;

  const newTodo = {
    id: newId,
    text: text,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});


app.put("/api/todos/:id", (req, res) => {

  const id = parseInt(req.params.id);

  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  res.json({ message: "Todo berhasil diupdate", todos });
});


app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo tidak ditemukan"
    });
  }

  todos.splice(index, 1);

  res.json({
    message: "Todo berhasil dihapus"
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});