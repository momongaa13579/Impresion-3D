// js/login.js
const loginForm = document.getElementById("loginForm");
const msg = document.getElementById("login-msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("login-nombre").value.trim();
  const apellido = document.getElementById("login-apellido").value.trim();
  const pass = document.getElementById("login-pass").value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const user = usuarios.find(u => u.nombre === nombre && u.apellido === apellido && u.pass === pass);

  if (!user) {
    msg.textContent = "Usuario o contraseña incorrectos";
    return;
  }

  if (user.rol === "admin") {
    // Redirige al admin
    window.location.href = "admin.html";
  } else {
    // Usuario normal → redirige al home
    window.location.href = "home.html";
  }

  loginForm.reset();
});
