import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, getDocs, collection, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "loginwed-975b4.firebaseapp.com",
  projectId: "loginwed-975b4",
  storageBucket: "loginwed-975b4.firebasestorage.app",
  messagingSenderId: "917659536943",
  appId: "1:917659536943:web:603a36379d166062d740da"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cargar usuarios en la tabla
async function cargarUsuarios() {
  const tabla = document.querySelector("#tablaUsuarios tbody");
  tabla.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "usuarios"));
  let i = 1;
  querySnapshot.forEach((docu) => {
    const data = docu.data();
    const fila = `
      <tr>
        <td>${i++}</td>
        <td>${data.nombre}</td>
        <td>${data.apellido}</td>
        <td><button onclick="eliminarUsuario('${docu.id}')">Eliminar</button></td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

window.eliminarUsuario = async function(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este usuario?");
  if (!confirmar) return;

  await deleteDoc(doc(db, "usuarios", id));
  alert("✅ Usuario eliminado correctamente");
  cargarUsuarios();
};

window.volverIndex = function() {
  window.location.href = "index.html";
};

cargarUsuarios();
