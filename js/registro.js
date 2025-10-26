// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "loginwed-975b4.firebaseapp.com",
  projectId: "loginwed-975b4",
  storageBucket: "loginwed-975b4.firebasestorage.app",
  messagingSenderId: "917659536943",
  appId: "1:917659536943:web:603a36379d166062d740da"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Mostrar/ocultar campo de contraseña admin
const checkbox = document.getElementById("reg-es-admin");
const passAdminField = document.getElementById("reg-pass-admin");
checkbox.addEventListener("change", () => {
  passAdminField.style.display = checkbox.checked ? "block" : "none";
});

// Escuchar envío del formulario
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("reg-nombre").value.trim();
  const apellido = document.getElementById("reg-apellido").value.trim();
  const pass = document.getElementById("reg-pass").value.trim();
  const esAdmin = checkbox.checked;
  const passAdmin = passAdminField.value.trim();

  if (!nombre || !apellido || !pass) {
    document.getElementById("reg-msg").innerText = "⚠️ Todos los campos son obligatorios";
    return;
  }

  // Determinar rol
  let rol = "usuario";
  if (esAdmin && passAdmin === "traxx200") {
    rol = "admin";
  } else if (esAdmin && passAdmin !== "traxx200") {
    alert("Contraseña de admin incorrecta. Se registrará como usuario normal.");
  }

  try {
    // Crear usuario en Firebase Auth con correo temporal
    const fakeEmail = `${nombre}.${apellido}@fake.com`;
    const userCredential = await createUserWithEmailAndPassword(auth, fakeEmail, pass);
    const user = userCredential.user;

    // Guardar info en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre,
      apellido,
      pass,
      rol
    });

    document.getElementById("reg-msg").innerText = `✅ Usuario registrado como ${rol}`;
    document.getElementById("registroForm").reset();
    passAdminField.style.display = "none";

  } catch (error) {
    document.getElementById("reg-msg").innerText = "❌ Error: " + error.message;
  }
});
