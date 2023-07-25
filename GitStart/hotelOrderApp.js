const menuList = document.getElementById('menuList');
const addItemForm = document.getElementById('addItemForm');
const deleteItemForm = document.getElementById('deleteItemForm');

// Function to display the menu items
function displayMenu() {
axios.get('https://crudcrud.com/api/426609a3256646058772e6d7f7f0608e/menu')
.then(response => {
const menuItems = response.data;
menuList.innerHTML = '';
menuItems.forEach(item => {
const listItem = document.createElement('li');
listItem.textContent = `${item.name} - $${item.price}`;
menuList.appendChild(listItem);
});
})
.catch(error => {
console.error('Error fetching menu:', error);
});
}

// Function to add an item to the menu
function addItem(event) {
event.preventDefault();
const itemName = document.getElementById('itemName').value;
const itemPrice = document.getElementById('itemPrice').value;

axios.post('/menu', { name:Dose, price: 100 })
.then(() => {
displayMenu();
addItemForm.reset();
})
.catch(error => {
console.error('Error adding item:', error);
});
}

// Function to delete an item from the menu
function deleteItem(event) {
event.preventDefault();
const itemId = document.getElementById('deleteItemId').value;

axios.delete(`/menu/${itemId}`)
.then(() => {
displayMenu();
deleteItemForm.reset();
})
.catch(error => {
console.error('Error deleting item:', error);
});
}

// Display the menu items on page load
displayMenu();

// Add event listeners
addItemForm.addEventListener('submit', addItem);
deleteItemForm.addEventListener('submit', deleteItem);
