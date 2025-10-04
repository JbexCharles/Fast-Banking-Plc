// Handle user creation (Admin)
document.getElementById("createUserForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("userEmail").value,
        password: document.getElementById("userPassword").value,
        governmentID: document.getElementById("governmentID").value,
        address: document.getElementById("address").value,
    };

    // Fetch authorization token from localStorage (if any)
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/admin/create-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in the request headers
        },
        body: JSON.stringify(user),
    });

    if (res.ok) {
        alert("User created successfully!");
        // Optionally clear the form after submission
        document.getElementById("createUserForm").reset();
    } else {
        const data = await res.json();
        alert(`Error: ${data.message}`);
    }
});

// Load users in Admin panel
document.addEventListener("DOMContentLoaded", async () => {
    if (document.getElementById("usersList")) {
        // Fetch authorization token from localStorage (if any)
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Include token in the request headers
            },
        });

        if (res.ok) {
            const users = await res.json();
            document.getElementById("userCount").innerText = `${users.length}`;
            let num = 0;
            users.forEach((user) => {
              num ++;
              const tr = document.createElement("tr");
              tr.innerHTML = `<tr>
                <td>${num}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.governmentID}</td>
                <td>${user._id}</td>
                <td>$ ${user.balance}</td>
                <td><span class="badge bg-success">Active</span></td>
                <td><button onclick="copyUserId('${user._id}')" class="copy-id-btn">CopyId</button></td>
                <td class="table-actions">
                  <i class="fa fa-check text-success" title="Approve"></i>
                  <i class="fa fa-ban text-danger" title="Block"></i>
                  <i class="fa fa-pen text-primary" title="Edit"></i>
                  <i class="fa fa-key text-warning" title="Reset Password"></i>
                </td>
              </tr>`;
              // Table row appendment
              document.getElementById("usersList").appendChild(tr);
            });
        } else {
            const data = await res.json();
            alert(`Error: ${data.message}`);
        }
    }
});

// ========== Copy User ID Function ==========
function copyUserId(userId) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(userId)
      .then(() => {
        alert(`User ID copied to clipboard: ${userId}`);
        const userIdField = document.getElementById("balanceUserId");
        if (userIdField) userIdField.value = userId;
      })
      .catch(err => {
        console.error("Clipboard API failed:", err);
        fallbackCopy(userId);
      });
  } else {
    // Fallback for browsers without navigator.clipboard
    fallbackCopy(userId);
  }
}

// Fallback using execCommand
function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    const userIdField = document.getElementById('balanceUserId');
    userIdField.value = text;
    alert(`User ID copied (fallback): ${text}`);
  } catch (err) {
    alert("Failed to copy User ID.");
    console.error(err);
  }
  document.body.removeChild(textarea);
}

// ========== Handle Balance Update ==========
document.getElementById("updateUserBalance")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("balanceUserId").value;
  const newBalance = document.getElementById("updatedAmount").value;

  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/admin/update-balance/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ balance: newBalance }),
  });

  if (res.ok) {
    alert("Balance updated!");
    location.reload();
  } else {
    const data = await res.json();
    alert(`Error: ${data.message}`);
  }
});

// ========== Redirect if No Token ==========
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "admin-login.html";
}

