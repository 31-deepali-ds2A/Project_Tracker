function openForm() {
  document.getElementById('myForm').style.display = 'block';
}


// ADD PROJECT
function addProject() {
  const title = document.getElementById('project-title').value;
  const description = document.getElementById('project-description').value;

  if (title.trim() === "" || description.trim() === "") {
      alert("Please fill in both fields.");
      return;
  }

  const projectDiv = createProjectElement(title, description);

  // Add project to active projects container
  document.getElementById('active-projects').appendChild(projectDiv);

  // Save project to localStorage
  saveProjects();

  // Clear the form fields
  document.getElementById('project-title').value = "";
  document.getElementById('project-description').value = "";
}

// to create / append new project in active

function createProjectElement(title, description) {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('projects');
  projectDiv.innerHTML = `
      <h3>${title}</h3>
      <i class="fa fa-close"></i>
      <p>${description}</p>
      <button class="finish-button">Finish</button>
  `;

  projectDiv.querySelector('.finish-button').addEventListener('click', function() {
      moveToFinished(projectDiv);
  });

  projectDiv.querySelector('.fa-close').addEventListener('click', function() {
      projectDiv.remove(); // Remove the project card
      saveProjects(); // Save the updated state
  });

  return projectDiv;
}

function moveToFinished(projectDiv) {
  const finishedProjectsContainer = document.getElementById('finished-projects');
  finishedProjectsContainer.appendChild(projectDiv);

  projectDiv.querySelector('.finish-button').remove(); // Remove the Finish button
  projectDiv.querySelector('.fa-close').remove(); // Optionally remove the close icon

  saveProjects(); // Save the updated state
}

function saveProjects() {
  const activeProjects = [];
  const finishedProjects = [];

  document.querySelectorAll('#active-projects .projects').forEach(project => {
      const title = project.querySelector('h3').textContent;
      const description = project.querySelector('p').textContent;
      activeProjects.push({ title, description });
  });

  document.querySelectorAll('#finished-projects .projects').forEach(project => {
      const title = project.querySelector('h3').textContent;
      const description = project.querySelector('p').textContent;
      finishedProjects.push({ title, description });
  });

  localStorage.setItem('activeProjects', JSON.stringify(activeProjects));
  localStorage.setItem('finishedProjects', JSON.stringify(finishedProjects));
}

function loadProjects() {
  const activeProjects = JSON.parse(localStorage.getItem('activeProjects') || '[]');
  const finishedProjects = JSON.parse(localStorage.getItem('finishedProjects') || '[]');

  activeProjects.forEach(project => {
      const projectDiv = createProjectElement(project.title, project.description);
      document.getElementById('active-projects').appendChild(projectDiv);
  });

  finishedProjects.forEach(project => {
      const projectDiv = createProjectElement(project.title, project.description);
      moveToFinished(projectDiv);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadProjects(); // Load projects from localStorage when the page loads

  document.getElementById('trigger').addEventListener('click', openForm);
  document.getElementById('add-proj').addEventListener('click', addProject);
  document.querySelector('.cancel').addEventListener('click', function() {
      document.getElementById('myForm').style.display = 'none';
  });
});
