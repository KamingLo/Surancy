document.getElementById("logoutBtn").addEventListener("click", () => {
      sessionStorage.removeItem("authenticated");
      window.location.href = "index.html";
    });
