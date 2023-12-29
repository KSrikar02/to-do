// index.js

import { renderProjects } from './UI.js';
import { getProjectsFromLocalStorage, getTasksFromLocalStorage } from './storage.js';

// Load projects data from localStorage
const storedProjects = getProjectsFromLocalStorage();
if (storedProjects) {
  renderProjects(storedProjects);
}

// Load tasks data from localStorage
const storedTasks = getTasksFromLocalStorage();
// Assuming you have a renderTasks function to update the UI with tasks
// renderTasks(storedTasks);

// Add any additional initialization code or event listeners here
