// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCjor19MmoueQqxTLzR4bPrEvJpUlpTMio",
    authDomain: "controproyectos.firebaseapp.com",
    projectId: "controproyectos",
    storageBucket: "controproyectos.firebasestorage.app",
    messagingSenderId: "292870634559",
    appId: "1:292870634559:web:359c76c384d0b14ebbcc8a"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Declarar la variable adminAuthenticated con var
var adminAuthenticated = false;

// Función de login de administrador
function login() {
    const password = document.getElementById('admin-password').value;
    if (password === "miContraseñaSegura123") {
        adminAuthenticated = true;
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('project-form').classList.remove('hidden');
        document.getElementById('projects-list').classList.remove('hidden');
        loadProjects();
    } else {
        alert("Contraseña incorrecta");
    }
}

// Función para agregar proyecto
function addProject() {
    const projectName = document.getElementById('project-name').value;
    const client = document.getElementById('client').value;
    const requester = document.getElementById('requester').value;
    const deliveryDate = document.getElementById('delivery-date').value;
    const projectDetails = document.getElementById('project-details').value;

    if (projectName && client && requester && deliveryDate && projectDetails) {
        db.collection("proyectos").add({
            projectName,
            client,
            requester,
            deliveryDate,
            projectDetails
        }).then(() => {
            alert("Proyecto agregado con éxito");
            loadProjects();
        }).catch((error) => {
            alert("Error al agregar proyecto: " + error.message);
        });
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

// Función para cargar proyectos
function loadProjects() {
    db.collection("proyectos").get().then((querySnapshot) => {
        const projectsList = document.getElementById('projects');
        projectsList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const project = doc.data();
            const li = document.createElement('li');
            li.textContent = `${project.projectName} - ${project.client}`;
            const editButton = document.createElement('button');
            editButton.textContent = "Editar";
            editButton.onclick = () => editProject(doc.id);
            li.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deleteProject(doc.id);
            li.appendChild(deleteButton);
            projectsList.appendChild(li);
        });
    });
}

// Función para eliminar proyecto
function deleteProject(id) {
    db.collection("proyectos").doc(id).delete().then(() => {
        alert("Proyecto eliminado con éxito");
        loadProjects();
    }).catch((error) => {
        alert("Error al eliminar proyecto: " + error.message);
    });
}

// Función para editar proyecto
function editProject(id) {
    const newName = prompt("Nuevo nombre del proyecto:");
    if (newName) {
        db.collection("proyectos").doc(id).update({
            projectName: newName
        }).then(() => {
            alert("Proyecto actualizado con éxito");
            loadProjects();
        }).catch((error) => {
            alert("Error al actualizar proyecto: " + error.message);
        });
    }
}
