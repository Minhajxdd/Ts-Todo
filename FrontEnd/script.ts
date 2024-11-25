declare var axios: {
    get: (url: string, config?: any) => Promise<any>;
    post: (url: string, data?: any, config?: any) => Promise<any>;
    delete: (url: string, config?: any) => Promise<any>;
    patch: (url: string, data?: any, config?: any) => Promise<any>;
};

interface todo {
    id: string,
    text: string,
}

const addBtn = document.getElementById('addTodoBtn') as HTMLElement;
const inputEl = document.getElementById('todoInput') as HTMLInputElement;
let todoDiv = (document.getElementById('todoList') as HTMLElement);

// Getting Todo
window.onload = (event) => {
    axios
        .get(`http://localhost:3000/api/`)
        .then(function (res) {

            if (res.data.status === 'success') {


                res.data.todos.forEach((val: todo) => {

                    todoDiv.innerHTML +=
                        `
                    <li>
                        <span>${val.text}</span>
                        <div class="actions">
                            <button data-id='${val.id}'>Edit</button>
                            <button class="todo-complete" data-id='${val.id}'>Complete</button>
                        </div>
                    </li>
                    `;
                });
            };
        })
        .catch(function (error: Error) {
            console.error("Error Fetching todo:", error.message);
        });
};



// Adding Todo
addBtn.addEventListener('click', () => {
    const text = inputEl.value;
    if (text) {

        axios
            .post(`http://localhost:3000/api/`, { text })
            .then(function (res) {

                if (res.data.status === 'success') {
                    todoDiv.innerHTML +=
                        `
                    <li>
                        <span>${text}</span>
                        <div class="actions">
                            <button data-id='${res.data.createdTodo.id}'>Edit</button>
                            <button class="todo-complete" data-id='${res.data.createdTodo.id}'>Complete</button>
                        </div>
                    </li>
                    `
                };
            })
            .catch(function (error: Error) {
                console.error("Error adding todo:", error.message);
            });
    };

});


// Complete Todo
todoDiv.addEventListener('click', function (event: Event) {
    const target = event.target as HTMLElement;

    if (target && target.classList.contains("todo-complete")) {
        const id: string | null = target.getAttribute('data-id');

        axios
            .delete(`http://localhost:3000/api/${id}`)
            .then(function (res) {

                if (res.data.status === 'success') {

                    const li = target.closest("li") as HTMLElement;
                    li.remove();

                };
            })
            .catch(function (error: Error) {
                console.error("Error Completing todo:", error.message);
            });
    }
});

// const todoInput = document.getElementById('todoInput');
// const addTodoBtn = document.getElementById('addTodoBtn');
// const todoList = document.getElementById('todoList');

// const editFormContainer = document.getElementById('editFormContainer');
// const editTodoInput = document.getElementById('editTodoInput');
// const saveEditBtn = document.getElementById('saveEditBtn');
// const cancelEditBtn = document.getElementById('cancelEditBtn');

// let todos = [];
// let editingTodoId = null;

// // Add a new todo
// addTodoBtn.addEventListener('click', () => {
//   const text = todoInput.value.trim();
//   if (text) {
//     todos.push({ id: Date.now(), text, completed: false });
//     todoInput.value = '';
//     renderTodos();
//   }
// });

// // Render todos
// function renderTodos() {
//   todoList.innerHTML = '';
//   todos.forEach(todo => {
//     const li = document.createElement('li');
//     li.className = todo.completed ? 'completed' : '';
//     li.innerHTML = `
//       <span>${todo.text}</span>
//       <div class="actions">
//         <button onclick="toggleComplete(${todo.id})">Complete</button>
//         <button onclick="showEditForm(${todo.id})">Edit</button>
//         <button onclick="deleteTodo(${todo.id})">Delete</button>
//       </div>
//     `;
//     todoList.appendChild(li);
//   });
// }

// // Toggle completion
// function toggleComplete(id) {
//   todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
//   renderTodos();
// }

// // Show edit form
// function showEditForm(id) {
//   editingTodoId = id;
//   const todo = todos.find(todo => todo.id === id);
//   editTodoInput.value = todo.text;
//   editFormContainer.classList.remove('hidden');
// }

// // Save edited todo
// saveEditBtn.addEventListener('click', () => {
//   todos = todos.map(todo => todo.id === editingTodoId ? { ...todo, text: editTodoInput.value.trim() } : todo);
//   editFormContainer.classList.add('hidden');
//   renderTodos();
// });

// // Cancel edit
// cancelEditBtn.addEventListener('click', () => {
//   editFormContainer.classList.add('hidden');
// });

// // Delete todo
// function deleteTodo(id) {
//   todos = todos.filter(todo => todo.id !== id);
//   renderTodos();
// }

// // Initial render
// renderTodos();
