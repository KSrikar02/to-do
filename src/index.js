// Import necessary modules
import { Project, defaultProject } from './features/project.js';
import { TodoItem } from './features/todo.js';
import { saveDataToLocalStorage, getDataFromLocalStorage } from './features/storage.js';

// Function to initialize the website
function initialize() {
  // Check for data in localStorage
  const storedProjects = getDataFromLocalStorage();

  // If there is stored data, initialize projects and todos
  if (storedProjects) {
    storedProjects.forEach(projectData => {
      const project = new Project(projectData.name);

      // Restore todos
      projectData.todos.forEach(todoData => {
        const todo = new TodoItem(
          todoData.title,
          todoData.description,
          new Date(todoData.dueDate),
          todoData.priority,
          todoData.notes,
          todoData.checklist
        );

        // Associate todo with the project
        todo.project = project;

        // Add todo to the project
        project.addTodo(todo);
      });

      // Add project to the default project list
      defaultProject.addTodoProject(project);
    });
  }

  // Render the todo list
  renderTodoList();

  // Example: Create a new todo and add it to the default project
  const newTodo = new TodoItem(
    'Example Todo',
    'This is an example todo',
    new Date('2024-01-15T12:00:00'),
    'Medium',
    'Some notes for the todo'
  );

  newTodo.addToProject(defaultProject);

  // Save data to localStorage
  saveDataToLocalStorage(defaultProject.getTodoProjects());

  // Re-render the updated todo list
  renderTodoList();
}

// Function to render the todo list dynamically
function renderTodoList() {
  const todoListContainer = document.getElementById('todo-list');

  // Clear existing content
  todoListContainer.innerHTML = '';

  // Iterate through projects and todos to generate HTML dynamically
  defaultProject.getTodoProjects().forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.innerHTML = `<h2>${project.name}</h2>`;

    project.todos.forEach(todo => {
      const todoElement = document.createElement('div');
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Due Date: ${todo.formatDueDate()}</p>
        <p>Priority: ${todo.priority}</p>
        <!-- Add more details as needed -->

        <!-- Example: Add a checkbox for checklist items -->
        <ul>
          ${todo.checklist.map(item => `<li>${item.completed ? '[x]' : '[ ]'} ${item.text}</li>`).join('')}
        </ul>
      `;

      projectElement.appendChild(todoElement);
    });

    todoListContainer.appendChild(projectElement);
  });
}

// Call the initialize function when the page loads
window.addEventListener('load', initialize);
