document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const errorMsg = document.getElementById("errorMsg");
    const successMsg = document.getElementById("successMsg");

    errorMsg.style.display = "none";
    successMsg.style.display = "none";

    if (!fullname || !email || !phone || !password || !confirmPassword) {
        errorMsg.textContent = "Semua field harus diisi.";
        errorMsg.style.display = "block";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Format email tidak valid.";
        errorMsg.style.display = "block";
        return;
    }

    if(fullname.length < 3 || fullname.length > 32 || fullname.match(/\d/) !== null){
        errorMsg.textContent = "Nama harus antara 3 sampai 32 karakter, dan tidak boleh mengandung angka";
        errorMsg.style.display = "block";
        return;
    }

    if (password.length < 8) {
        errorMsg.textContent = "Kata sandi minimal 8 karakter.";
        errorMsg.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = "Kata sandi tidak cocok.";
        errorMsg.style.display = "block";
        return;
    }
    
    if(!phone.startsWith("08")){
        errorMsg.textContent = "Nomor telepon harus dimulai dengan 08";
        errorMsg.style.display = "block";
        return;
    }else{
        if(phone.length < 10 || phone.length > 16){
            errorMsg.textContent = "Nomor telepon harus antara 10 sampai 16 karakter";
            errorMsg.style.display = "block";
            return;
        }
    }

    const userData = { fullname, email, phone, password };
    sessionStorage.setItem("user", JSON.stringify(userData));

    successMsg.textContent = "Pendaftaran berhasil! Mengalihkan...";
    successMsg.style.display = "block";

    setTimeout(() => {
        window.location.href = "./login.html";
    }, 1500);
});
