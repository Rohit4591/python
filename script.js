document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from the backend
    const loadTasks = async () => {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    // Add a task
    const addTask = async (task) => {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const newTask = await response.json();
        addTaskToDOM(newTask);
    };

    // Update a task
    const updateTask = async (task) => {
        await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        loadTasks();
    };

    // Delete a task
    const deleteTask = async (id) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        loadTasks();
    };

    // Add a task to the DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    };

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName) {
            addTask({ name: taskName, completed: false });
            taskInput.value = '';
        }
    });

    // Handle task actions
    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        const id = li.dataset.id;
        if (e.target.classList.contains('complete')) {
            const task = {
                id: id,
                name: li.querySelector('span').textContent,
                completed: !li.classList.contains('completed')
            };
            updateTask(task);
        } else if (e.target.classList.contains('edit')) {
            const newName = prompt('Edit task name:', li.querySelector('span').textContent);
            if (newName) {
                const task = {
                    id: id,
                    name: newName,
                    completed: li.classList.contains('completed')
                };
                updateTask(task);
            }
        } else if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(id);
            }
        }
    });

    // Initial load
    loadTasks();
});
