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

    const table = document.getElementById("projectsBody");
    const row = table.insertRow();

    row.innerHTML = `
        <td>${folderNumber}</td>
        <td>${projectName}</td>
        <td>${client}</td>
        <td>${requester}</td>
        <td>${assignmentDate}</td>
        <td>${deliveryDate}</td>
        <td>${status}</td>
        <td>${observations}</td>
        <td><button onclick="deleteProject(this)">Eliminar</button></td>
    `;

    alert("Proyecto agregado correctamente.");
    clearForm();
}

function deleteProject(button) {
    if (!isAdmin) {
        alert("No tienes permisos para eliminar proyectos.");
        return;
    }
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    alert("Proyecto eliminado.");
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
