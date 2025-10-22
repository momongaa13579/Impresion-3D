document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("registroForm");
  const msg = document.getElementById("reg-msg");

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const nombre = document.getElementById("reg-nombre").value.trim();
    const apellido = document.getElementById("reg-apellido").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();

    if(!nombre || !apellido || !pass){
      msg.textContent = "⚠️ Completa todos los campos";
      msg.style.color = "orange";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some(u=> u.nombre.toLowerCase()===nombre.toLowerCase() && u.apellido.toLowerCase()===apellido.toLowerCase());
    if(existe){
      msg.textContent = "❌ Usuario ya registrado";
      msg.style.color = "red";
      return;
    }

    usuarios.push({nombre, apellido, pass});
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    msg.textContent = "✅ Registro exitoso, redirigiendo al login...";
    msg.style.color = "lightgreen";

    setTimeout(()=>{ window.location.href="login.html"; }, 1500);
  });
});
