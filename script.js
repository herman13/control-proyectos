// Cargar proyectos desde localStorage o usar un array por defecto
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Función para mostrar proyectos
function displayProjects() {
    const projectsBody = document.getElementById('projectsBody');
    projectsBody.innerHTML = '';
    projects.forEach((project, index) => {
        const row = `<tr>
            <td>${project.folderNumber}</td>
            <td>${project.projectName}</td>
            <td>${project.client}</td>
            <td>${project.requester}</td>
            <td>${project.assignmentDate}</td>
            <td>${project.deliveryDate}</td>
            <td>${project.status}</td>
            <td>${project.observations}</td>
            <td>
                <button onclick="editProject(${index})">Editar</button>
                <button onclick="deleteProject(${index})">Eliminar</button>
            </td>
        </tr>`;
        projectsBody.innerHTML += row;
    });
}

// Función para agregar un nuevo proyecto
function addProject() {
    const folderNumber = document.getElementById('newFolderNumber').value;
    const projectName = document.getElementById('newProjectName').value;
    const client = document.getElementById('newClient').value;
    const requester = document.getElementById('newRequester').value;
    const assignmentDate = document.getElementById('newAssignmentDate').value;
    const deliveryDate = document.getElementById('newDeliveryDate').value;
    const status = document.getElementById('newStatus').value;
    const observations = document.getElementById('newObservations').value;

    const newProject = {
        folderNumber,
        projectName,
        client,
        requester,
        assignmentDate,
        deliveryDate,
        status,
        observations
    };

    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
    clearForm();
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('newFolderNumber').value = '';
    document.getElementById('newProjectName').value = '';
    document.getElementById('newClient').value = '';
    document.getElementById('newRequester').value = '';
    document.getElementById('newAssignmentDate').value = '';
    document.getElementById('newDeliveryDate').value = '';
    document.getElementById('newStatus').value = '';
    document.getElementById('newObservations').value = '';
}

// Función para editar un proyecto
function editProject(index) {
    const project = projects[index];
    document.getElementById('newFolderNumber').value = project.folderNumber;
    document.getElementById('newProjectName').value = project.projectName;
    document.getElementById('newClient').value = project.client;
    document.getElementById('newRequester').value = project.requester;
    document.getElementById('newAssignmentDate').value = project.assignmentDate;
    document.getElementById('newDeliveryDate').value = project.deliveryDate;
    document.getElementById('newStatus').value = project.status;
    document.getElementById('newObservations').value = project.observations;

    // Eliminar el proyecto original
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
}

// Función para eliminar un proyecto
function deleteProject(index) {
    // Eliminar el proyecto del array
    projects.splice(index, 1);
    // Guardar los proyectos actualizados en localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    // Volver a mostrar la lista de proyectos
    displayProjects();
}

// Función para iniciar sesión como administrador
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'codamherman') { // Cambia 'codamherman' por la contraseña que desees
        alert('Bienvenido, Administrador!');
        document.getElementById('adminLogin').style.display = 'none'; // Oculta el formulario de inicio de sesión
        document.getElementById('adminPanel').style.display = 'block'; // Muestra el panel de administración
        displayProjects(); // Muestra la lista de proyectos
    } else {
        alert('Contraseña incorrecta. Intenta de nuevo.');
    }
}

// Función para buscar proyectos
document.getElementById('search').addEventListener('input', function()
