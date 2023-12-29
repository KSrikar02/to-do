// UI.js

import { Project, defaultProject } from './projects.js';
import { saveTasksToLocalStorage, getTasksFromLocalStorage, saveProjectsToLocalStorage, getProjectsFromLocalStorage } from './storage.js';

function createProjectElement(project) {
  const projectElement = document.createElement('div');
  projectElement.innerHTML = `<h2>${project.name}</h2>`;
  const todosContainer = renderTodos(project.todos);
  projectElement.appendChild(todosContainer);
  return projectElement;
}

function createTodoElement(todo) {
  let li = document.createElement("li");
  li.innerHTML = `
    <strong>Title:</strong> ${todo.title}<br>
    <strong>Description:</strong> ${todo.description}<br>
    <strong>Due Date:</strong> ${todo.dueDate}<br>
    <strong>Priority:</strong> ${todo.priority}<br>
    <strong>Notes:</strong> ${todo.notes}<br>
    <strong>Checklist:</strong> ${todo.checklist.map(item => `- ${item}`).join('<br>')}
  `;

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  return li;
}

function renderTodos(todos) {
  const todosContainer = document.createElement('ul');
  todos.forEach(todo => {
    const todoElement = createTodoElement(todo);
    todosContainer.appendChild(todoElement);
  });
  return todosContainer;
}

function renderProjects(projectList) {
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';

  projectList.forEach(project => {
    const projectElement = createProjectElement(project);
    projectsContainer.appendChild(projectElement);
  });
}

// Load projects data from localStorage
const storedProjects = getProjectsFromLocalStorage();
if (storedProjects) {
  storedProjects.forEach(projectData => {
    const project = new Project(projectData.name);
    projectData.todos.forEach(todoData => {
      // ... (restore todos)
    });
    defaultProject.addTodo(project);
  });
}

// Save default project to localStorage
saveProjectsToLocalStorage([defaultProject]);

// Export the renderProjects function for use in other files
export { renderProjects };
