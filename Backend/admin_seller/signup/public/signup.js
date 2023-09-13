document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const loginButton = document.getElementById('loginButton');
    const signupMessage = document.getElementById('signupMessage');
    
    signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Send a POST request to the server for user registration
    fetch('/register', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
    })
    .then(response => response.text())
    .then(data => {
    signupMessage.textContent = data;
    signupForm.reset();
    })
    .catch(error => {
    console.error('Error:', error);
    signupMessage.textContent = 'Registration failed. Please try again later.';
    });
    });
    
    loginButton.addEventListener('click', function () {
    window.location.href = '/login.html';
    });
    });