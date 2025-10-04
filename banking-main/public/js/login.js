document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
  
    // User login endpoint
    const endpoint = "http://localhost:5000/api/user/login";
  
    // Send POST request to user login endpoint
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      // Store the token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("welcomeMessage", data.message);
  
      // Redirect to user dashboard
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").innerText = data.message || "Login failed";
    }
  });
  