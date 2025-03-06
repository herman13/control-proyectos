import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCjor19MmoueQqxTLzR4bPrEvJpUlpTMio",
    authDomain: "controproyectos.firebaseapp.com",
    projectId: "controproyectos",
    storageBucket: "controproyectos.firebasestorage.app",
    messagingSenderId: "292870634559",
    appId: "1:292870634559:web:359c76c384d0b14ebbcc8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let isAdmin = sessionStorage.getItem("isAdmin") === "true";

// Muestra el formulario de inicio de sesión de administrador
function showAdminLogin() {
    document.getElementById("adminLogin").style.display = "block";
}

// Realiza el login de administrador
function loginAdmin() {
    const password = document.getElementById("adminPassword").value;
    const correctPassword = "admin123"; // Puedes cambiar esta contraseña por una más segura

    if (password === correctPassword) {
        isAdmin = true;
        sessionStorage.setItem("isAdmin", "true");
        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        alert("Acceso concedido.");
        loadProjects();
    } else {
        alert("Contraseña incorrecta.");
    }
}

// Verifica si el usuario es administrador
function checkAdminStatus() {
    if (isAdmin) {
        document.getElementById("adminPanel").style.display = "block";
    }
}

// Agregar un proyecto a Firestore
async function addProject() {
    if (!isAdmin) {
        alert("No tienes permisos para agregar proyectos.");
        return;
    }

    const newProject = {
        folderNumber: document.getElementById("newFolderNumber").value,
        projectName: document.getElementById("newProjectName").value,
        client: document.getElementById("newClient").value,
        requester: document.getElementById("newRequester").value,
        assignmentDate: document.getElementById("newAssignmentDate").value,
        deliveryDate: document.getElementById("newDeliveryDate").value,
        status: document.getElementById("newStatus").value,
        observations: document.getElementById("newObservations").value
    };

    try {
        await addDoc(collection(db, "projects"), newProject);
        alert("Proyecto agregado correctamente.");
        clearForm();
        loadProjects();
    } catch (error) {
        alert("Error al agregar el proyecto: " + error);
    }
}

// Eliminar un proyecto de Firestore
async function deleteProject(id) {
    if (!isAdmin) {
        alert("No tienes permisos para eliminar proyectos.");
        return;
    }
    try {
        await deleteDoc(doc(db, "projects", id));
        alert("Proyecto eliminado.");
        loadProjects();
    } catch (error) {
        alert("Error al eliminar el proyecto: " + error);
    }
}

// Cargar los proyectos desde Firestore
async function loadProjects() {
    const table = document.getElementById("projectsBody");
    table.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "projects"));

    querySnapshot.forEach((doc) => {
        const project = doc.data();
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
            <td><button onclick="deleteProject('${doc.id}')">Eliminar</button></td>
        `;
    });
}

// Limpiar el formulario después de agregar un proyecto
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

// Verificar si el administrador está logueado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    checkAdminStatus();
    loadProjects();
});
