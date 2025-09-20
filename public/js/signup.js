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
        errorMsg.textContent = "All fields are required.";
        errorMsg.style.display = "block";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Invalid email format.";
        errorMsg.style.display = "block";
        return;
    }

    if(fullname.length < 3 || fullname.length > 32 || fullname.match(/\d/) !== null){
        errorMsg.textContent = "Username must be between 3 to 32 characters, and must not contain numbers";
        errorMsg.style.display = "block";
        return;
    }

    if (password.length < 8) {
        errorMsg.textContent = "Password must be at least 8 characters.";
        errorMsg.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match.";
        errorMsg.style.display = "block";
        return;
    }
    
    if(!phone.startsWith("08")){
        errorMsg.textContent = "Phone number must start from 08";
        errorMsg.style.display = "block";
        return;
    }else{
        if(phone.length < 10 || phone.length > 16){
            errorMsg.textContent = "Phone number must be between 10 or 16 characters";
            errorMsg.style.display = "block";
            return;
        }
    }

    const userData = { fullname, email, phone, password };
    sessionStorage.setItem("user", JSON.stringify(userData));

    successMsg.textContent = "Sign Up successful! Redirecting...";
    successMsg.style.display = "block";

    setTimeout(() => {
        window.location.href = "./login.html";
    }, 1500);
});
