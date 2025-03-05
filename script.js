const projects = [

    { 

        folderNumber: '001', 

        projectName: 'Proyecto A', 

        client: 'Cliente A', 

        requester: 'Solicitante A', 

        assignmentDate: '2023-10-01', 

        deliveryDate: '2023-12-01', 

        status: 'En Progreso', 

        observations: 'Observación A' 

    },

    { 

        folderNumber: '002', 

        projectName: 'Proyecto B', 

        client: 'Cliente B', 

        requester: 'Solicitante B', 

        assignmentDate: '2023-09-15', 

        deliveryDate: '2023-11-15', 

        status: 'Finalizado', 

        observations: 'Observación B' 

    },

    // Puedes agregar más proyectos aquí

];


function displayProjects() {

    const projectsBody = document.getElementById('projectsBody');

    projectsBody.innerHTML = '';

    projects.forEach(project => {

        const row = `<tr>

            <td>${project.folderNumber}</td>

            <td>${project.projectName}</td>

            <td>${project.client}</td>

            <td>${project.requester}</td>

            <td>${project.assignmentDate}</td>

            <td>${project.deliveryDate}</td>

            <td>${project.status}</td>

            <td>${project.observations}</td>

        </tr>`;

        projectsBody.innerHTML += row;

    });

}


function showAdminLogin() {

    document.getElementById('adminLogin').style.display = 'block';

}


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


    // Crear un nuevo objeto de proyecto

    const newProject = {

        folderNumber: folderNumber,

        projectName: projectName,

        client: client,

        requester: requester,

        assignmentDate: assignmentDate,

        deliveryDate: deliveryDate,

        status: status,

        observations: observations

    };


    // Agregar el nuevo proyecto al array de proyectos

    projects.push(newProject);


    // Limpiar los campos del formulario

    document.getElementById('newFolderNumber').value = '';

    document.getElementById('newProjectName').value = '';

    document.getElementById('newClient').value = '';

    document.getElementById('newRequester').value = '';

    document.getElementById('newAssignmentDate').value = '';

    document.getElementById('newDeliveryDate').value = '';

    document.getElementById('newStatus').value = '';

    document.getElementById('newObservations').value = '';


    // Volver a mostrar la lista de proyectos

    displayProjects();

}


// Función para buscar proyectos

document.getElementById('search').addEventListener('input', function() {

    const searchTerm = this.value.toLowerCase();

    const filteredProjects = projects.filter(project => 

        project.projectName.toLowerCase().includes(searchTerm) ||

        project.client.toLowerCase().includes(searchTerm) ||

        project.requester.toLowerCase().includes(searchTerm)

    );

    displayFilteredProjects(filteredProjects);

});


// Función para filtrar proyectos por tipo

document.getElementById('filter').addEventListener('change', function() {

    const filterValue = this.value;

    const filteredProjects = filterValue ? projects.filter(project => project.client === filterValue) : projects;

    displayFilteredProjects(filteredProjects);

});


// Función para mostrar proyectos filtrados

function displayFilteredProjects(filteredProjects) {

    const projectsBody = document.getElementById('projectsBody');

    projectsBody.innerHTML = '';

    filteredProjects.forEach(project => {

        const row = `<tr>

            <td>${project.folderNumber}</td>

            <td>${project.projectName}</td>

            <td>${project.client}</td>

            <td>${project.requester}</td>

            <td>${project.assignmentDate}</td>

            <td>${project.deliveryDate}</td>

            <td>${project.status}</td>

            <td>${project.observations}</td>

        </tr>`;

        projectsBody.innerHTML += row;

    });

}


// Inicializar la tabla de proyectos al cargar la página

window.onload = displayProjects;