document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("todoinput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todolist");
  const filterButtons = document.querySelectorAll(".filter button");
  const taskCount = document.getElementById("taskCount");

  const API_URL = "http://localhost:3000/api/todos";

  let todos = [];
  let currentFilter = "all";

  async function fetchTodos() {
    const res = await fetch(API_URL);
    todos = await res.json();
    console.log(todos)
    renderTodos();
  }

  async function addTodo() {
    const text = input.value.trim();

    if (!text) {
      alert("Tugas tidak boleh kosong!");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    input.value = "";
    fetchTodos();
  }

  async function toggleTodo(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT"
    });

    fetchTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    fetchTodos();
  }

  function renderTodos() {

    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {
      filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {

      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const span = document.createElement("span");
      span.textContent = todo.text;

      if (todo.completed) {
        span.style.textDecoration = "line-through";
        span.style.color = "gray";
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Hapus";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
    updateCount();
  }

  function updateCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    taskCount.textContent = `${activeCount} tugas`;
  }

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      currentFilter = button.dataset.filter;

      renderTodos();
    });
  });
  addBtn.addEventListener("click", addTodo);
  fetchTodos();
});