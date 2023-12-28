// Function to save projects and todos to localStorage
function saveDataToLocalStorage(projects) {
    try {
      const serializedProjects = JSON.stringify(projects);
      localStorage.setItem('projects', serializedProjects);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }
  
  // Function to retrieve projects from localStorage
  function getDataFromLocalStorage() {
    try {
      const serializedProjects = localStorage.getItem('projects');
      if (serializedProjects === null) {
        return null; // No data found in localStorage
      }
  
      return JSON.parse(serializedProjects);
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return null;
    }
  }
  
  export { saveDataToLocalStorage, getDataFromLocalStorage };
  