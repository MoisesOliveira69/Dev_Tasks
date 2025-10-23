let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "pending" && task.completed) return;
    if (filter === "completed" && !task.completed) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      ${index + 1}. ${task.text}
      <div class="actions">
        <i class="fas fa-check" onclick="toggleComplete(${index})"></i>
        <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
