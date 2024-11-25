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
const editFormContainer = document.getElementById('editFormContainer') as HTMLElement;
const editTodoInput = document.getElementById('editTodoInput') as HTMLInputElement;

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
                            <button class="todo-edit" data-id='${val.id}'>Edit</button>
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
                            <button class="todo-edit" data-id='${res.data.createdTodo.id}'>Edit</button>
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

    let id: string | null
    if (target && target.classList.contains("todo-complete")) {
        id = target.getAttribute('data-id');

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
    // Edit todo
    else if (target && target.classList.contains("todo-edit")) {
        id = target.getAttribute('data-id');

        const text = ((target.closest("li") as HTMLElement)
            .querySelector('span') as HTMLElement)
            .innerHTML;

        editTodoInput.value = text;

        editFormContainer.classList.remove('hidden');

        document.getElementById('saveEditBtn')?.addEventListener('click', function () {
            editForm(id, target);
        })
    }
});


function cancelForm() {
    editFormContainer.classList.add('hidden');
}

function editForm(id: string | null, target: HTMLElement) {
    const text = editTodoInput.value;

    axios
        .patch(`http://localhost:3000/api/${id}`, { text })
        .then(function (res) {

            if (res.data.status === 'success') {

                console.log(res.data);
                editFormContainer.classList.add('hidden');

                ((target.closest("li") as HTMLElement)
                    .querySelector('span') as HTMLElement)
                    .innerHTML = res.data.updatedTodo.text;

            };
        })
        .catch(function (error: Error) {
            console.error("Error Completing todo:", error.message);
        });

}