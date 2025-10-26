import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("login-nombre").value.trim();
  const apellido = document.getElementById("login-apellido").value.trim();
  const pass = document.getElementById("login-pass").value.trim();
  const fakeEmail = `${nombre}.${apellido}@fake.com`;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, fakeEmail, pass);
    const user = userCredential.user;

    // Verificar rol desde Firestore
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);
    const rol = docSnap.exists() ? docSnap.data().rol : "usuario";

    if (rol === "admin") {
      document.getElementById("login-msg").innerText = "🔓 Inicio sesión admin";
      setTimeout(() => window.location.href = "admin.html", 1000);
    } else {
      document.getElementById("login-msg").innerText = "🔓 Inicio sesión usuario normal";
      // Aquí puedes redirigir a otra página para usuarios normales
    }

  } catch (error) {
    document.getElementById("login-msg").innerText = "❌ Usuario o contraseña incorrectos";
  }
});
