// project.js

import { saveProjectsToLocalStorage, getProjectsFromLocalStorage } from './storage.js';

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  displayTodos() {
    console.log(`Todos in Project: ${this.name}`);
    this.todos.forEach(todo => {
      console.log(`- ${todo.title}`);
    });
  }
}

// Example: Create a default project
const defaultProject = new Project('Default Project');

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

// Export the Project class and default project for use in other files
export { Project, defaultProject };
