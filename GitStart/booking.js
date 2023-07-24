let users = [
    { username: "rohan_m", password: "password1" },
    { username: "apoorva_m", password: "password2" },
    ];
    
    // Function to display the list of users
    function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    
    users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = user.username;
    userList.appendChild(listItem);
    });
    }
    
    // Function to handle login form submission
    document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
    alert("Login successful!");
    } else {
    alert("Invalid username or password.");
    }
    });
    
    // Function to handle add user form submission
    document.getElementById("addUserForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    
    users.push({ username: newUsername, password: newPassword });
    displayUsers();
    });
    
    // Function to handle delete user button click
    document.getElementById("deleteUserButton").addEventListener("click", function () {
    const userList = document.getElementById("userList");
    const selectedUserIndex = userList.selectedIndex;
    if (selectedUserIndex !== -1) {
    users.splice(selectedUserIndex, 1);
    displayUsers();
    } else {
    alert("Please select a user to delete.");
    }
    });
    
    // Display the initial list of users
    displayUsers();
    