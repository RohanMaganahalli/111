// Function to handle form submission
const save = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Create an object with the form data
    const formData = {
    name: name,
    email: email,
    password: password
    };
    
    try {
    // Send a POST request to your server (adjust the URL accordingly)
    const response = await axios.post('/signup', formData);
    
    // Handle the response from the server
    if (response.data.success) {
    // If the signup was successful, you can redirect or show a success message
    alert('Signup successful!'); // Modify this as needed
    window.location.href = '/login.html'; // Redirect to login page
    } else {
    // Handle any errors or display error messages
    alert('Signup failed. Please try again.'); // Modify this as needed
    }
    } catch (error) {
    // Handle network errors or server errors
    console.error('Error:', error);
    alert('An error occurred. Please try again later.'); // Modify this as needed
    }
    };
    
    // Attach the save function to the form's submit event
    const form = document.getElementById('formdiv');
    form.addEventListener('submit', save);
