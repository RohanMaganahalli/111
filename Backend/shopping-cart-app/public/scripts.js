const productListDiv=document.getElementById('product-list');
const cartDiv=document.getElementById('cart');

function fetchProducts(){
    fetch('/products')
    .then(response=>respomse.json())
    .then(products=>{
        products.forEach(product=>{
            const productCard=document.createElement('div');

            productCard.classList.add('product-card');
            productCard.innerHTML=`<h2>${product.name}</h2><p>Price:$${product.price.toFixed(2)}</p><button onclick="addToCart(${product.id})">Add to Cart</button>`;
            productListDiv.appendChild(productCard);
        });
    })
    .catch(error=>console.error('Error fetching products:',error));
}
function addToCart(product_id){
    const user_id=1;
    fetch('/add_to_cart',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({user_id,product_id}),
    })
    .then(response=>response.json())
    .then(data=>{
        alert(data.message);
        updateCart();
    })
    .catch(error=>console.error('Error adding product to cart:',error));
}
function updateCart(){
    fetch('/cart')
    .then(response=>response.json())
    .then(cart_items=>{
        cartDiv.innerHTML='';
        cart_items.forEach(item=>{
            const cartItem=document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML=`<p>${item.name}-$${item.price.toFixed(2)}</p>`;
            cartDiv.appendChild(cartItem);
        });
    })
    .catch(error=>console.error('Error fetching cart:',error));
}
fetchProducts();
updateCart(); 