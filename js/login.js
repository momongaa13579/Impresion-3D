document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("login-msg");

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const nombre = document.getElementById("login-nombre").value.trim().toLowerCase();
    const apellido = document.getElementById("login-apellido").value.trim().toLowerCase();
    const pass = document.getElementById("login-pass").value.trim();

    // Admin secreto
    if(nombre==="z" && apellido==="z" && pass==="12"){
      localStorage.setItem("usuarioActivo", JSON.stringify({nombre, apellido, admin:true}));
      msg.textContent = "✅ Bienvenido Admin, redirigiendo...";
      msg.style.color = "lightgreen";
      setTimeout(()=>{ window.location.href="admin.html"; }, 1000);
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(u=> u.nombre.toLowerCase()===nombre && u.apellido.toLowerCase()===apellido && u.pass===pass);

    if(user){
      localStorage.setItem("usuarioActivo", JSON.stringify({...user, admin:false}));
      msg.textContent = "✅ Inicio de sesión correcto, redirigiendo...";
      msg.style.color = "lightgreen";
      setTimeout(()=>{ window.location.href="home.html"; }, 1000);
    } else {
      msg.textContent = "❌ Usuario o contraseña incorrectos";
      msg.style.color = "red";
    }
  });
});
