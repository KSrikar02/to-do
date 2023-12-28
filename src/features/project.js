import { saveDataToLocalStorage, getDataFromLocalStorage } from './storage.js';

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

    saveToLocalStorage() {
        const projects = getDataFromLocalStorage() || [];
        projects.push(this);
        saveDataToLocalStorage(projects);
    }
  }
  
  // Example usage:
  const defaultProject = new Project('Default Project');
  
  // Export the Project class for use in other files
  export { Project, defaultProject };
  