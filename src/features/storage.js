// storage.js
// storage.js
import { Project } from "./project";  // Add this import statement

function saveTasksToLocalStorage(tasks) {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedTasks);
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
}

function getTasksFromLocalStorage() {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    if (serializedTasks === null) {
      return null;
    }
    return JSON.parse(serializedTasks);
  } catch (error) {
    console.error('Error retrieving tasks from localStorage:', error);
    return null;
  }
}

function saveProjectsToLocalStorage(projects) {
  try {
    const serializedProjects = JSON.stringify(projects);
    localStorage.setItem('projects', serializedProjects);
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
}

function getProjectsFromLocalStorage() {
  try {
    const serializedProjects = localStorage.getItem('projects');
    if (serializedProjects === null) {
      return null;
    }
    return JSON.parse(serializedProjects);
  } catch (error) {
    console.error('Error retrieving projects from localStorage:', error);
    return null;
  }
}

export { saveTasksToLocalStorage, getTasksFromLocalStorage, saveProjectsToLocalStorage, getProjectsFromLocalStorage };
