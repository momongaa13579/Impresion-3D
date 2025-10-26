// Importar módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Configuración de Firebase (usa la tuya)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "loginwed-975b4.firebaseapp.com",
  projectId: "loginwed-975b4",
  storageBucket: "loginwed-975b4.firebasestorage.app",
  messagingSenderId: "917659536943",
  appId: "1:917659536943:web:603a36379d166062d740da"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Escuchar envío del formulario
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("reg-nombre").value.trim();
  const apellido = document.getElementById("reg-apellido").value.trim();
  const pass = document.getElementById("reg-pass").value.trim();

  if (!nombre || !apellido || !pass) {
    document.getElementById("reg-msg").innerText = "⚠️ Todos los campos son obligatorios";
    return;
  }

  try {
    // Crear usuario en Firebase Authentication (usando nombre+apellido como correo temporal)
    const fakeEmail = `${nombre}.${apellido}@fake.com`; 
    const userCredential = await createUserWithEmailAndPassword(auth, fakeEmail, pass);
    const user = userCredential.user;

    // Guardar info en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre,
      apellido,
      pass
    });

    document.getElementById("reg-msg").innerText = "✅ Usuario registrado correctamente";
    document.getElementById("registroForm").reset();

  } catch (error) {
    document.getElementById("reg-msg").innerText = "❌ Error: " + error.message;
  }
});
