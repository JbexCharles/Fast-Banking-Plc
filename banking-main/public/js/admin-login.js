// admin-login.js
document.getElementById("adminLoginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("adminEmail").value.trim().toLowerCase();
    const password = document.getElementById("adminPassword").value;
  
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify({ email }));
      window.location.href = "admin.html";
    } else {
      document.getElementById("adminLoginMessage").innerText = data.message || "Login failed";
    }
  });
  