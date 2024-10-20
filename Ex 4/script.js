let cart = [];
let cartCount = 0;
let users = {}; // Store users in an object
let loggedInUser = null;

function showMenu(restaurant) {
    if (!loggedInUser) {
        alert("Please sign in to view the menu.");
        return;
    }

    document.getElementById('restaurant-list').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('menu-title').innerText = restaurant;

    const menuItems = {
        "Cafe Coffee Day": [
            { name: "Cappuccino", price: 150, image: "images/cappuccino.jpg", description: "Creamy cappuccino topped with frothy milk.", rating: 4.5 },
            { name: "Latte", price: 140, image: "images/latte.jpg", description: "Smooth and creamy latte.", rating: 4.0 },
            { name: "Chocolate Cake", price: 120, image: "images/chocolate_cake.jpg", description: "Decadent chocolate cake with a rich frosting.", rating: 4.7 },
            { name: "Espresso", price: 120, image: "images/espresso.jpg", description: "Rich and bold espresso shot.", rating: 4.8 },
            { name: "Cheese Sandwich", price: 120, image: "images/cheese_sandwich.jpg", description: "Toasted sandwich filled with melted cheese.", rating: 4.2 },
        ],
        "Biryani By Kilo": [
            { name: "Chicken Biryani", price: 300, image: "images/chicken_biryani.jpg", description: "Flavorful chicken biryani cooked with aromatic spices.", rating: 4.6 },
            { name: "Veg Biryani", price: 250, image: "images/veg_biryani.jpg", description: "Delicious vegetable biryani loaded with fresh veggies.", rating: 4.4 },
            { name: "Mutton Biryani", price: 350, image: "images/mutton_biryani.jpg", description: "Rich and savory mutton biryani, a feast for the senses.", rating: 4.8 },
            { name: "Raita", price: 120, image: "images/raita.jpg", description: "Cooling yogurt side dish, perfect with biryani.", rating: 4.2 },
        ],
        // Other restaurants...
    };

    const menuList = document.getElementById('menu-items');
    menuList.innerHTML = '';

    menuItems[restaurant].forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img class="menu-item" src="${item.image}" alt="${item.name}" />
            <strong>${item.name}</strong>
            <p>₹${item.price}</p>
            <p>${item.description}</p>
            <p>Rating: ${item.rating} ★</p>
            <button class="add-to-cart" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        menuList.appendChild(li);
    });
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert(`${itemName} has been added to your cart!`);
}

function viewCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ₹${item.price}`;
        cartItemsList.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.innerText = totalPrice;
    cartModal.style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function placeOrder() {
    const payBillModal = document.getElementById('pay-bill-modal');
    const payBillItemsList = document.getElementById('pay-bill-items');
    const payTotalPriceElement = document.getElementById('pay-total-price');

    payBillItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ₹${item.price}`;
        payBillItemsList.appendChild(li);
        totalPrice += item.price;
    });

    payTotalPriceElement.innerText = totalPrice;
    payBillModal.style.display = 'block';
}

function confirmPayment() {
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.style.display = 'block';
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerText = "Thank you for your order! Your food will be delivered soon.";
    
    cart = []; // Clear cart after order
    cartCount = 0;
    document.getElementById('cart-count').innerText = cartCount;
    closeCart();
    closePayBillModal();
}

function closePayBillModal() {
    document.getElementById('pay-bill-modal').style.display = 'none';
}

function closeConfirmation() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

function goBack() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('restaurant-list').style.display = 'block';
}

function toggleAuth() {
    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');
    const authToggle = document.getElementById('auth-toggle');

    if (authTitle.innerText === "Sign Up") {
        authTitle.innerText = "Sign In";
        authForm.querySelector('button').innerText = "Sign In";
        authToggle.innerText = "Don't have an account? Sign Up";
    } else {
        authTitle.innerText = "Sign Up";
        authForm.querySelector('button').innerText = "Sign Up";
        authToggle.innerText = "Already have an account? Sign In";
    }
}

function handleAuth(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const authTitle = document.getElementById('auth-title');

    if (authTitle.innerText === "Sign Up") {
        if (users[username]) {
            alert("User already exists! Please sign in.");
        } else {
            users[username] = password;
            alert("Sign up successful! You can now sign in.");
            closeAuthModal();
        }
    } else {
        if (users[username] === password) {
            loggedInUser = username;
            alert("Sign in successful!");
            closeAuthModal();
            document.getElementById('restaurant-list').style.display = 'block';
        } else {
            alert("Invalid username or password.");
        }
    }
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

// Function to open the authentication modal
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'block';
}
