// js/registro.js
const registroForm = document.getElementById("registroForm");
const msg = document.getElementById("reg-msg");
const checkboxAdmin = document.getElementById("reg-es-admin");
const passAdminInput = document.getElementById("reg-pass-admin");

// Mostrar/ocultar campo contraseña admin
passAdminInput.hidden = true;
checkboxAdmin.addEventListener("change", () => {
  passAdminInput.hidden = !checkboxAdmin.checked;
  if (!checkboxAdmin.checked) passAdminInput.value = "";
});

registroForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("reg-nombre").value.trim();
  const apellido = document.getElementById("reg-apellido").value.trim();
  const pass = document.getElementById("reg-pass").value.trim();
  let rol = "usuario";

  if (checkboxAdmin.checked) {
    const passAdmin = passAdminInput.value.trim();
    if (passAdmin === "traxx200") {
      rol = "admin";
    } else {
      msg.textContent = "Contraseña de admin incorrecta";
      return;
    }
  }

  // Guardamos en LocalStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push({ nombre, apellido, pass, rol });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  msg.textContent = "✅ Registrado correctamente";
  registroForm.reset();
  passAdminInput.hidden = true;
});
