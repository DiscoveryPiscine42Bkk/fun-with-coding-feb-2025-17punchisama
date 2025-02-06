document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo() {
    let task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        createTodo(task.trim());
        saveTodos();
    }
}

function createTodo(text) {
    let div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;
    div.addEventListener("click", function () {
        let confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            div.remove();
            saveTodos();
        }
    });

    let list = document.getElementById("ft_list");
    list.appendChild(div); 
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        if (cookie.startsWith("todos=")) {
            let todos = JSON.parse(cookie.split("=")[1]);
            todos.forEach(task => createTodo(task));
            break;
        }
    }
}
