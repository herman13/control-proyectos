// Definir la función showAdminLogin() para mostrar el formulario de login del administrador
function showAdminLogin() {
    // Mostrar la sección de login y ocultar el panel de administración
    document.getElementById("adminLogin").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
}

// Función para iniciar sesión como administrador
function loginAdmin() {
    // Obtener la contraseña ingresada por el administrador
    const adminPassword = document.getElementById("adminPassword").value;

    // Aquí debes reemplazar 'admin123' por la contraseña real
    const correctPassword = "admin123"; // Cambiar por la contraseña real

    // Verificar si la contraseña es correcta
    if (adminPassword === correctPassword) {
        // Mostrar el panel de administración y ocultar el login
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("adminLogin").style.display = "none";
    } else {
        // Si la contraseña es incorrecta, mostrar un mensaje de error
        alert("Contraseña incorrecta");
    }
}

// Función para agregar un nuevo proyecto
function addProject() {
    const folderNumber = document.getElementById("newFolderNumber").value;
    const projectName = document.getElementById("newProjectName").value;
    const client = document.getElementById("newClient").value;
    const requester = document.getElementById("newRequester").value;
    const assignmentDate = document.getElementById("newAssignmentDate").value;
    const deliveryDate = document.getElementById("newDeliveryDate").value;
    const status = document.getElementById("newStatus").value;
    const observations = document.getElementById("newObservations").value;

    // Crear una nueva fila en la tabla con los valores del proyecto
    const table = document.getElementById("projectsTable");
    const newRow = table.insertRow();
    newRow.innerHTML = `
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

    // Limpiar los campos después de agregar el proyecto
    document.getElementById("newFolderNumber").value = "";
    document.getElementById("newProjectName").value = "";
    document.getElementById("newClient").value = "";
    document.getElementById("newRequester").value = "";
    document.getElementById("newAssignmentDate").value = "";
    document.getElementById("newDeliveryDate").value = "";
    document.getElementById("newStatus").value = "";
    document.getElementById("newObservations").value = "";
}

// Función para eliminar un proyecto de la tabla
function deleteProject(button) {
    const row = button.closest("tr");
    row.remove();
}
