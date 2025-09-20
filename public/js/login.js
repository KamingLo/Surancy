document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  errorMsg.style.display = "none";
  successMsg.style.display = "none";

  if (!email || !password) {
    errorMsg.textContent = "Email dan kata sandi harus diisi.";
    errorMsg.style.display = "block";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Format email tidak valid";
    errorMsg.style.display = "block";
    return;
  }

  if(password.length < 8){
    errorMsg.textContent = "Kata sandi minimal 8 karakter";
    errorMsg.style.display = "block";
    return;
  }

  const storedUserData = JSON.parse(sessionStorage.getItem("user"));

  if((email == "admin@surancy.com") && (password == '12345678')){
  sessionStorage.setItem("authenticated", "true");
  successMsg.textContent = "Berhasil masuk! Mengalihkan...";
  successMsg.style.display = "block";

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1500);}
  else if ((email == storedUserData.email ||"admin@surancy.com") && (password == storedUserData.password || '12345678')) {
    sessionStorage.setItem("authenticated", "true");
    successMsg.textContent = "Login success! Redirecting...";
    successMsg.style.display = "block";

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1500);
  }else {
    errorMsg.textContent = "Your Email or password is wrong.";
    errorMsg.style.display = "block";
  }
});
