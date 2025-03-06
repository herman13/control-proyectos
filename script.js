let isAdmin = false;

function showAdminLogin() {
    document.getElementById("adminLogin").style.display = "block";
}

function loginAdmin() {
    const password = document.getElementById("adminPassword").value;
    const correctPassword = "admin123"; // Puedes cambiar esta contraseña por una más segura

    if (password === correctPassword) {
        isAdmin = true;
        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        alert("Acceso concedido.");
        loadProjects();
    } else {
        alert("Contraseña incorrecta.");
    }
}

function addProject() {
    if (!isAdmin) {
        alert("No tienes permisos para agregar proyectos.");
        return;
    }

    const folderNumber = document.getElementById("newFolderNumber").value;
    const projectName = document.getElementById("newProjectName").value;
    const client = document.getElementById("newClient").value;
    const requester = document.getElementById("newRequester").value;
    const assignmentDate = document.getElementById("newAssignmentDate").value;
    const deliveryDate = document.getElementById("newDeliveryDate").value;
    const status = document.getElementById("newStatus").value;
    const observations = document.getElementById("newObservations").value;

    if (!folderNumber || !projectName || !client || !requester || !assignmentDate || !deliveryDate || !status) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

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

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));

    alert("Proyecto agregado correctamente.");
    clearForm();
    loadProjects();
}

function deleteProject(index) {
    if (!isAdmin) {
        alert("No tienes permisos para eliminar proyectos.");
        return;
    }
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Proyecto eliminado.");
    loadProjects();
}

function loadProjects() {
    const table = document.getElementById("projectsBody");
    table.innerHTML = "";
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach((project, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${project.folderNumber}</td>
            <td>${project.projectName}</td>
            <td>${project.client}</td>
            <td>${project.requester}</td>
            <td>${project.assignmentDate}</td>
            <td>${project.deliveryDate}</td>
            <td>${project.status}</td>
            <td>${project.observations}</td>
            <td><button onclick="deleteProject(${index})">Eliminar</button></td>
        `;
    });
}

function clearForm() {
    document.getElementById("newFolderNumber").value = "";
    document.getElementById("newProjectName").value = "";
    document.getElementById("newClient").value = "";
    document.getElementById("newRequester").value = "";
    document.getElementById("newAssignmentDate").value = "";
    document.getElementById("newDeliveryDate").value = "";
    document.getElementById("newStatus").value = "";
    document.getElementById("newObservations").value = "";
}

document.addEventListener("DOMContentLoaded", loadProjects);

