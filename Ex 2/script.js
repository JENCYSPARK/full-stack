document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('registerButton').addEventListener('click', register);
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('logoutButton').addEventListener('click', logout);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simple login validation (for demo purposes)
    if (username === '' || password === '') {
        errorMessage.textContent = 'Please fill in both fields.';
        return;
    }

    // Simulate successful login
    errorMessage.textContent = '';
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('todoSection').style.display = 'block';
}

function register() {
    alert('Registration functionality is not implemented.');
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    const taskList = document.getElementById('taskList');

    if (taskValue) {
        const li = document.createElement('li');
        li.textContent = taskValue;

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'https://img.icons8.com/material-outlined/24/000000/trash.png'; // Trash icon
        deleteIcon.className = 'icon';
        deleteIcon.onclick = () => {
            taskList.removeChild(li);
        };

        li.appendChild(deleteIcon);
        taskList.appendChild(li);
        taskInput.value = ''; // Clear input after adding
    }
}

function logout() {
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('todoSection').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('taskInput').value = '';
    document.getElementById('taskList').innerHTML = ''; // Clear tasks
}
