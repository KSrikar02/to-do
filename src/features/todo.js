import { format } from 'date-fns';
import { Project, defaultProject } from './project.js';
import { saveDataToLocalStorage, getDataFromLocalStorage } from './storage.js';

class TodoItem {
    constructor(title, description, dueDate, priority, notes = '', checklist = []) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.checklist = checklist;
    }
  
    // Method to add an item to the checklist
    addItemToChecklist(item) {
      this.checklist.push({ text: item, completed: false });
    }
  
    // Method to mark an item as completed in the checklist
    completeItemInChecklist(index) {
      if (index >= 0 && index < this.checklist.length) {
        this.checklist[index].completed = true;
      } else {
        console.error('Invalid checklist item index');
      }
    }
  
    // Method to display the details of the todo item
    displayDetails() {
      console.log(`
        Title: ${this.title}
        Description: ${this.description}
        Due Date: ${this.dueDate}
        Priority: ${this.priority}
        Notes: ${this.notes}
        Checklist: ${this.checklist.map(item => `${item.completed ? '[x]' : '[ ]'} ${item.text}`).join('\n')}
      `);
    }

    addToProject(project) {
        project.addTodo(this);
    }

    formatDueDate() {
        return format(new Date(this.dueDate), 'yyyy-MM-dd HH:mm:ss');
    }

    saveToLocalStorage() {
        const projects = getDataFromLocalStorage() || [];
        const projectIndex = projects.findIndex(proj => proj.name === this.project.name);
    
        if (projectIndex !== -1) {
          projects[projectIndex].addTodo(this);
        } else {
          this.project.addTodo(this);
          projects.push(this.project);
        }
    
        saveDataToLocalStorage(projects);
    }
  }
  
  // Example usage:
  const myTodoItem = new TodoItem(
    'Complete Project',
    'Finish the project by implementing all required features',
    '2023-12-31',
    'High',
    'Don\'t forget to review the code before submission'
  );
  
  myTodoItem.addItemToChecklist('Write documentation');
  myTodoItem.addItemToChecklist('Test all functionalities');
  myTodoItem.completeItemInChecklist(0);
  
  myTodoItem.displayDetails();
  myTodoItem.addToProject(defaultProject);

  export{ TodoItem }
  