document.addEventListener("DOMContentLoaded", function() {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const totalValue = document.getElementById("totalValue"); // Add this line
    
    // Initialize total value
    let totalPrice = 0;
    
    productForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const productName = document.getElementById("productName").value;
    const sellingPrice = parseFloat(document.getElementById("sellingPrice").value);
    
    if (!isNaN(sellingPrice)) {
    const productData = { productName, sellingPrice };
    
    try {
    const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
    });
    
    if (response.ok) {
    // Update the total price
    totalPrice += sellingPrice;
    
    // Update the total value display
    totalValue.textContent = `Total Value: $${totalPrice.toFixed(2)}`;
    
    // Create a new list item to display the product
    const listItem = document.createElement("li");
    listItem.textContent = `${productName} - $${sellingPrice.toFixed(2)}`;
    
    // Append the new list item to the product list
    productList.appendChild(listItem);
    
    // Clear the form inputs
    document.getElementById("productName").value = "";
    document.getElementById("sellingPrice").value = "";
    }
    } catch (error) {
    console.error(error);
    }
    }
    });
    
    // Function to fetch and display products from the server
    async function fetchProducts() {
    try {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    // Clear the product list
    productList.innerHTML = '';
    
    // Initialize total price
    totalPrice = 0;
    
    // Display the products on the page
    data.forEach(product => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.productName} - $${product.sellingPrice.toFixed(2)}`;
    productList.appendChild(listItem);
    
    // Update the total price
    totalPrice += product.sellingPrice;
    });
    
    // Update the total value display
    totalValue.textContent = `Total Value: $${totalPrice.toFixed(2)}`;
    } catch (error) {
    console.error(error);
    }
    }
    
    // Fetch and display products when the page loads
    fetchProducts();
    });