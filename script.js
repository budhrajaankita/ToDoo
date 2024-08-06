function filterTasks() {
    const searchQuery = document.getElementById('quick-find').value.toLowerCase();

    // Get the list of tasks to filter
    const taskList = document.getElementById('task-list');
    const tasks = taskList.getElementsByTagName('li');

    for (const task of tasks) {
        const taskText = task.querySelector('span').textContent.toLowerCase();
        if (taskText.includes(searchQuery)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // load tasks from localStorage
    loadTasks()
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskList = document.getElementById('task-list');
        let totalTasks = savedTasks.length;
        let uncompletedTasks = savedTasks.filter(task => !task.completed).length;

        taskList.innerHTML = '';

        savedTasks.forEach((task, index) => {
            if (!task.completed) {
                const taskItem = createTaskElement(task, index);

                // Add an event listener to mark tasks as completed
                taskItem.querySelector('input').addEventListener('change', function () {
                    markTaskAsCompleted(index);
                    taskItem.classList.add('completed');
                    taskList.removeChild(taskItem);
                    updateTaskUI(taskItem, index); // Update the task UI

                    updateTaskCounts(totalTasks, --uncompletedTasks);
                });

                // Add an event listener for clicking the task text to edit it
                const taskText = taskItem.querySelector('span');
                taskText.addEventListener('click', function () {
                    createEditField(taskItem, taskText, index);
                });

                taskList.appendChild(taskItem);
            }
        });

        updateTaskCounts(totalTasks, uncompletedTasks);
    }

    function updateTaskUI(taskItem, taskIndex) {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks && savedTasks[taskIndex]) {
            const task = savedTasks[taskIndex];
            const checkbox = taskItem.querySelector('input');
            const taskText = taskItem.querySelector('span');

            if (task.completed) {
                taskItem.classList.add('completed');
                checkbox.checked = true;
            } else {
                taskItem.classList.remove('completed');
                checkbox.checked = false;
            }
        }
    }

        function createTaskElement(task, index) {
            const taskItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.style.cursor = 'pointer';

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            return taskItem;
        }
        

    function markTaskAsCompleted(taskIndex) {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks && savedTasks[taskIndex]) {
            savedTasks[taskIndex].completed = true;
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
    }

    function updateInboxCount(uncompletedTasks) {
        const inboxCountElement = document.querySelector('.count');
        inboxCountElement.textContent = uncompletedTasks;
    }

    function updateTaskCounts(totalTasks, uncompletedTasks) {
        const taskCount = document.getElementById('task-count');
        taskCount.textContent = `${totalTasks}/${uncompletedTasks}`;

        updateInboxCount(uncompletedTasks);
    }

    function updateTaskText(taskIndex, newText) {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks && savedTasks[taskIndex]) {
            savedTasks[taskIndex].text = newText;
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
            
            // Find the task element by its index and update its text
            const taskList = document.getElementById('task-list');
            const taskItem = taskList.getElementsByTagName('li')[taskIndex];
            if (taskItem) {
                taskItem.querySelector('span').textContent = newText;
            }
        }
    }
    function createEditField(taskItem, taskText, taskIndex) {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = taskText.textContent;
    
        inputField.addEventListener('blur', function () {
            const newText = inputField.value;
            taskText.textContent = newText;
            updateTaskText(taskIndex, newText); 
            taskItem.replaceChild(taskText, inputField);
        });
    
        taskItem.replaceChild(inputField, taskText);
        inputField.focus();
    }
    
    function addTask(taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
    
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        savedTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    
        const totalTasks = savedTasks.length;
        const uncompletedTasks = savedTasks.filter(task => !task.completed).length;
    
        const taskList = document.getElementById('task-list');
        const taskItem = createTaskElement(newTask, totalTasks);
        
        // Add an event listener to edit the task text
        const taskTextElement = taskItem.querySelector('span');
        taskTextElement.addEventListener('click', function () {
            createEditField(taskItem, taskTextElement, totalTasks);
        });
    
        taskList.appendChild(taskItem);
        updateTaskCounts(totalTasks, uncompletedTasks);
    }

    loadTasks();


    // Toggle Navbar on Menu Icon Click
    const menuIcon = document.getElementById('menu-icon');
    console.log(menuIcon)
    const nav = document.getElementById('toggle_list');
    const main_nav = document.getElementById('main-nav');


    menuIcon.addEventListener('click', function () {
        nav.classList.toggle('hidden');
    });

    const viewportWidth = window.innerWidth;
            if (viewportWidth < 480) {
                nav.classList.toggle('hidden');    
            }

    // Add Task Button Click
    const addTaskButton = document.getElementById('add-task-button');
    addTaskButton.addEventListener('click', function () {
        const newTaskInput = document.getElementById('new-task-input');
        const taskText = newTaskInput.value;

        if (taskText.trim() !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    const addTaskWrapper = document.getElementById('addTaskWrapper');
    addTaskWrapper.addEventListener('click', function () {
        const addTaskContainer2 = document.getElementById('add-task-container2');
        const addTaskIcon = document.getElementById('addTaskIcon');
        const addTaskText = document.getElementById('add-task-text');

        addTaskContainer2.style.display = 'block';
        addTaskIcon.style.display = 'none';
        addTaskText.style.display = 'none';

        // Focus on the input field when clicking "Add Task"
        const newTaskInput = document.getElementById('new-task-input');
        newTaskInput.focus();
    });

    const cancelTaskButton = document.getElementById('cancel-task-button');
    cancelTaskButton.addEventListener('click', function () {
        const addTaskContainer2 = document.getElementById('add-task-container2');
        const addTaskIcon = document.getElementById('addTaskIcon');
        const addTaskText = document.getElementById('add-task-text');
        const newTaskInput = document.getElementById('new-task-input');

        addTaskContainer2.style.display = 'none';
        addTaskIcon.style.display = 'inline';
        addTaskText.style.display = 'inline';
        newTaskInput.value = '';
    });

    
});