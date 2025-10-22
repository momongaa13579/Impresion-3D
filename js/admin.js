const tabla = document.getElementById('tablaUsuarios').querySelector('tbody');

// Cargar usuarios desde localStorage
function cargarUsuarios() {
  tabla.innerHTML = ''; // limpiar tabla
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach((usuario, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  });
}

// Eliminar usuario
function eliminarUsuario(indice) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.splice(indice, 1); // eliminar usuario
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  cargarUsuarios(); // recargar tabla
}

  function volverIndex() {
    window.location.href = 'index.html'; // Redirige al index
  }

// Cargar usuarios al iniciar la página
cargarUsuarios();
