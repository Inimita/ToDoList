document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("todoinput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todolist");
  const filterButtons = document.querySelectorAll(".filter button");
  const taskCount = document.getElementById("taskCount");
  const clearCompletedBtn = document.getElementById("clearCompleted");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let currentFilter = "all";

  renderTodos();

  addBtn.addEventListener("click", function () {
    const text = input.value.trim();

    if (text === "") {
      alert("Tugas tidak boleh kosong!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };

    todos.push(newTodo);
    save();
    input.value = "";
    renderTodos();
  });

const filterbuttons = document.querySelectorAll(".filter button");

filterbuttons.forEach(button => {
  button.addEventListener("click", function () {

    filterbuttons.forEach(btn => btn.classList.remove("active"));

    this.classList.add("active");

    currentFilter = this.dataset.filter;
    renderTodos();
  });
});

  clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter(todo => !todo.completed);
    save();
    renderTodos();
  });
console.log("FILTER: ", currentFilter);
  function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {

      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", function () {
        toggleTodo(todo.id);
      });

      const span = document.createElement("span");
      span.textContent = todo.text;

      if (todo.completed) {
        span.style.textDecoration = "line-through";
        span.style.color = "gray";
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Hapus";
      deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });

    updateCount();
  }

  function toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    save();
    renderTodos();
    console.log(todos);
  }

  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    save();
    renderTodos();
  }

  function updateCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    taskCount.textContent = `${activeCount} tugas`;
  }

  function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

});