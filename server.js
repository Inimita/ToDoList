import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


/*
GET /api/todos
Mengirimkan seluruh data todo dalam bentuk JSON
*/

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

/*
POST /api/todos
Menambahkan todo baru ke dalam array
*/


app.post("/api/todos", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      message: "Tugas tidak boleh kosong"
    });
  }

  const newTodo = {
    id: todos.length + 1,
    text: text,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});