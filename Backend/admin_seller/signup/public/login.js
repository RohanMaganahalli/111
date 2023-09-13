document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    
    loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    // Send a POST request to the server for user login
    fetch('/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
    .then(response => response.text())
    .then(data => {
    loginMessage.textContent = data;
    loginForm.reset();
    })
    .catch(error => {
    console.error('Error:', error);
    loginMessage.textContent = 'Login failed. Please try again later.';
    });
    });
    });