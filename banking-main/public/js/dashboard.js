// Greet the user and display balance after page load
document.addEventListener("DOMContentLoaded", () => {
    // Get stored greeting message and display it
    const welcomeMessage = localStorage.getItem("welcomeMessage"); 
    if (welcomeMessage) {
        document.getElementById("greeting").innerText = welcomeMessage;
    }

    // Display user's balance if available
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve stored user data from localStorage
    if (user && user.balance !== undefined) {
        document.getElementById("balanceDisplay").innerText = `${user.balance}`; // Display balance
    }
});

// Handle money transfer
document.getElementById("transferForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get user email from localStorage (since user should be logged in)
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
        document.getElementById("transferMessage").innerText = "User not logged in";
        return;
    }

    // Get account details and transfer amount from form
    const accountName = document.getElementById("accountName").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const bank = document.getElementById("bank").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const senderEmail = user.email; // Get sender's email from localStorage

    // Send POST request to transfer money
    const res = await fetch("http://localhost:5000/api/user/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountName, accountNumber, bank, amount, senderEmail }),
    });

    const data = await res.json();

    let hideTimer = null;
    if (res.ok) {
        // Update user balance in localStorage
        user.balance = data.senderBalance; // Ensure matching field name
        localStorage.setItem("user", JSON.stringify(user));

        //message disapear function
        function transMessage(){
            if(hideTimer) clearTimeout(hideTimer);
            const message = document.getElementById("transferMessage");
            message.innerText = "Transfer successful, Contact your Bank Manager To Approve Transaction!";
            message.style.display = "block";
            hideTimer = setTimeout(() => {
                message.style.display = "none";
                hideTimer = "none";
            }, 3000);
        };

        // Display success message
        transMessage();
        document.getElementById("balanceDisplay").innerText = `${user.balance}`;
        //clear transfer form
        accountName.textContent = "";
        accountNumber.textContent = "";
        bank.textContent = "";
        amount.textContent = "";

        //history initialization 
        const history = document.getElementById("history");
        const li = document.createElement("li");
        li.innerHTML = `<h6>Transfer to ${accountName} <span id="successful">Successful</span><span>, Status: </span><span  id="status">Pending</span></h6> Amount:<span class="amount"> $ ${amount}</span>`;
        history.appendChild(li);

    } else {
        // Display error message
        const message = document.getElementById("transferMessage");
        message.innerText = data.message;
        message.style.display = "block";
        hideTimer = setTimeout(() => {
            message.style.display = "none";
            hideTimer = "none";
        }, 3000);
    }
});

//logout
document.getElementById("logoutBtn").addEventListener('click', ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('welcomeMessage');

    window.location.href = "login.html";
});

