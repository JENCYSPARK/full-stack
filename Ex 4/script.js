let cart = [];

// Function to add items to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    // Loop through cart items and display them
    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - ₹${cartItem.price}`; // Change to ₹
        cartItems.appendChild(li);
        totalPrice += cartItem.price; // Calculate total price
    });

    document.getElementById('total-price').textContent = `Total: ₹${totalPrice}`; // Change to ₹
}

// Function to toggle cart visibility
function toggleCart() {
    const dropdown = document.getElementById('cart-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Function to place the order
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart = []; // Clear the cart
    updateCart(); // Update cart display
}
