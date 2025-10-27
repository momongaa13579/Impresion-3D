// Cargar usuarios guardados
const tablaBody = document.querySelector("#tablaUsuarios tbody");
const confirmacionDiv = document.getElementById("confirmacion");
const claveInput = document.getElementById("claveAdmin");
const btnConfirmar = document.getElementById("btnConfirmar");
const btnCancelar = document.getElementById("btnCancelar");

let usuarioAEliminar = null; // guardará el índice del usuario a borrar

function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  tablaBody.innerHTML = "";

  usuarios.forEach((user, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.nombre}</td>
      <td>${user.apellido}</td>
      <td><button onclick="mostrarConfirmacion(${index})">Eliminar</button></td>
    `;
    tablaBody.appendChild(fila);
  });
}

// Mostrar la sección de confirmación
function mostrarConfirmacion(index) {
  usuarioAEliminar = index;
  confirmacionDiv.style.display = "block";
  claveInput.value = "";
  claveInput.focus();
}

// Confirmar eliminación
btnConfirmar.addEventListener("click", () => {
  const clave = claveInput.value.trim();

  if (clave === "123") {
    eliminarUsuario(usuarioAEliminar);
    confirmacionDiv.style.display = "none";
  } else {
    alert("❌ Contraseña de administrador incorrecta");
  }
});

// Cancelar eliminación
btnCancelar.addEventListener("click", () => {
  confirmacionDiv.style.display = "none";
  usuarioAEliminar = null;
});

// Eliminar usuario del localStorage
function eliminarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cargarUsuarios();
  alert("✅ Usuario eliminado correctamente");
}

// Volver al inicio
function volverIndex() {
  window.location.href = "index.html";
}

// Inicializar
cargarUsuarios();
