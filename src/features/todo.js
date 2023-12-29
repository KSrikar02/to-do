// todo.js

import { format } from 'date-fns';
import { saveData } from './storageHandler.js';
import { defaultProject } from './projects.js';
import { createTodoElement } from './user.js';
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from './storage.js';

const inputTitle = document.getElementById('input-title');
const inputDescription = document.getElementById('input-description');
const inputDueDate = document.getElementById('input-due-date');
const inputPriority = document.getElementById('input-priority');
const inputNotes = document.getElementById('input-notes');
const inputChecklist = document.getElementById('input-checklist');
const listContainer = document.getElementById('list-container');
const projectsContainer = document.getElementById('projects-container');

function addTaskToProject(project, todo) {
  project.addTodo(todo);
}

function addTask() {
  const title = inputTitle.value;
  const description = inputDescription.value;
  const dueDate = inputDueDate.value;
  const priority = inputPriority.value;
  const notes = inputNotes.value;
  const checklist = inputChecklist.value.split(',');

  if (title === '') {
    alert('You must enter a title!');
  } else {
    // Create a new todo object
    const todo = {
      title,
      description,
      dueDate,
      priority,
      notes,
      checklist,
    };

    // Add the todo to the default project
    addTaskToProject(defaultProject, todo);

    // Create the todo element and append it to the list
    const todoElement = createTodoElement(todo);
    listContainer.appendChild(todoElement);

    const tasks = defaultProject.todos;
    saveTasksToLocalStorage(tasks);
  }

  // Clear input fields
  clearInputFields();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData(listContainer.innerHTML);
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData(listContainer.innerHTML);
  }
}, false);

function renderTodoItem(todo) {
  let li = document.createElement("li");
  li.innerHTML = `
    <strong>Title:</strong> ${todo.title}<br>
    <strong>Description:</strong> ${todo.description}<br>
    <strong>Due Date:</strong> ${todo.dueDate}<br>
    <strong>Priority:</strong> ${todo.priority}<br>
    <strong>Notes:</strong> ${todo.notes}<br>
    <strong>Checklist:</strong> ${todo.checklist.map(item => `- ${item}`).join('<br>')}
  `;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
}

function clearInputFields() {
  inputTitle.value = '';
  inputDescription.value = '';
  inputDueDate.value = '';
  inputPriority.value = '';
  inputNotes.value = '';
  inputChecklist.value = '';
}

export { addTask };
