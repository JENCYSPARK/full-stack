const users = [
    { username: "user1", password: "pass1", products: [], purchaseHistory: [] },
    { username: "user2", password: "pass2", products: [], purchaseHistory: [] },
    { username: "user3", password: "pass3", products: [], purchaseHistory: [] },
];

// Adding fake products to existing users with image URLs, descriptions, and contact details
users[0].products.push({ 
    name: "Bike", 
    price: 10000, 
    seller: "user1", 
    image: "https://via.placeholder.com/150?text=Bike", 
    description: "A sturdy mountain bike.", 
    contact: "user1@example.com" 
});
users[0].products.push({ 
    name: "Laptop", 
    price: 70000, 
    seller: "user1", 
    image: "https://via.placeholder.com/150?text=Laptop", 
    description: "A powerful gaming laptop.", 
    contact: "user1@example.com" 
});
users[1].products.push({ 
    name: "Phone", 
    price: 30000, 
    seller: "user2", 
    image: "https://via.placeholder.com/150?text=Phone", 
    description: "Latest smartphone with great features.", 
    contact: "user2@example.com" 
});
users[1].products.push({ 
    name: "Watch", 
    price: 1500, 
    seller: "user2", 
    image: "https://via.placeholder.com/150?text=Watch", 
    description: "Stylish wristwatch.", 
    contact: "user2@example.com" 
});
users[2].products.push({ 
    name: "Tablet", 
    price: 40000, 
    seller: "user3", 
    image: "https://via.placeholder.com/150?text=Tablet", 
    description: "Lightweight tablet for on-the-go.", 
    contact: "user3@example.com" 
});

let isAuthenticated = false;
let currentUser = null;

const productList = document.getElementById('productList');
const userProductsList = document.getElementById('userProductsList');
const purchaseHistoryList = document.getElementById('purchaseHistoryList');
const addProductModal = document.getElementById('addProductModal');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeModal = document.querySelector('.close');
const closeLoginModal = document.querySelector('.close-login');
const closeSignupModal = document.querySelector('.close-signup');
const addProductBtn = document.getElementById('addProductBtn');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const dashboardBtn = document.getElementById('dashboardBtn');
const logoutBtn = document.getElementById('logoutBtn');
const submitProductBtn = document.getElementById('submitProductBtn');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const searchInput = document.getElementById('searchInput');

// Display all products
function displayProducts(productArray) {
    productList.innerHTML = '';
    productArray.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}"><br>
            <strong>${product.name}</strong><br>
            Price: ₹${product.price}<br>  <!-- Changed to ₹ -->
            Seller: ${product.seller}<br>
            Description: ${product.description}<br>
            Contact: ${product.contact}<br>
            <button onclick="purchaseProduct('${product.name}', '${product.seller}')">Buy</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Display user products
function displayUserProducts() {
    userProductsList.innerHTML = '';
    const user = users.find(u => u.username === currentUser);
    if (user) {
        user.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 150px;"><br>
                <strong>${product.name}</strong><br>
                Price: ₹${product.price}<br>  <!-- Changed to ₹ -->
                Description: ${product.description}<br>
                Contact: ${product.contact}<br>
                <button onclick="deleteProduct('${product.name}')">Delete</button>
            `;
            userProductsList.appendChild(productDiv);
        });
    }
}

// Display purchase history
function displayPurchaseHistory() {
    purchaseHistoryList.innerHTML = '';
    const user = users.find(u => u.username === currentUser);
    if (user) {
        user.purchaseHistory.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `<strong>${product.name}</strong><br>Purchased from: ${product.seller}`;
            purchaseHistoryList.appendChild(productDiv);
        });
    }
}

// Open add product modal
addProductBtn.onclick = function() {
    if (!isAuthenticated) {
        alert('Please log in to add a product.');
        return;
    }
    addProductModal.style.display = 'block';
};

// Close modals
closeModal.onclick = function() {
    addProductModal.style.display = 'none';
};

closeLoginModal.onclick = function() {
    loginModal.style.display = 'none';
};

closeSignupModal.onclick = function() {
    signupModal.style.display = 'none';
};

// Add product
submitProductBtn.onclick = function() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;
    const productDescription = document.getElementById('productDescription').value;
    const productContact = document.getElementById('productContact').value;

    if (productName && productPrice && productImage && productDescription && productContact) {
        const user = users.find(u => u.username === currentUser);
        if (user) {
            user.products.push({ 
                name: productName, 
                price: productPrice, 
                seller: user.username, 
                image: productImage, 
                description: productDescription, 
                contact: productContact 
            });
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productImage').value = '';
            document.getElementById('productDescription').value = '';
            document.getElementById('productContact').value = '';
            addProductModal.style.display = 'none';
            displayUserProducts();
            displayProducts(users.flatMap(u => u.products)); // Refresh product list
        }
    } else {
        alert('Please fill in all fields');
    }
};

// Show login modal
loginBtn.onclick = function() {
    loginModal.style.display = 'block';
};

// Show signup modal
signupBtn.onclick = function() {
    signupModal.style.display = 'block';
};

// Show dashboard
dashboardBtn.onclick = function() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    displayUserProducts();
    displayPurchaseHistory();
};

// Back to home button functionality
document.getElementById('backToHomeBtn').onclick = function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
};

// Logout
logoutBtn.onclick = function() {
    isAuthenticated = false;
    currentUser = null;
    dashboardBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline';
    signupBtn.style.display = 'inline';
    addProductBtn.style.display = 'none';
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    alert('Logged out successfully.');
};

// Login functionality
loginSubmitBtn.onclick = function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        isAuthenticated = true;
        currentUser = username;
        alert('Login successful!');
        loginModal.style.display = 'none';
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        addProductBtn.style.display = 'inline';
        dashboardBtn.style.display = 'inline';
        
        // Show home page after login
        document.getElementById('homePage').style.display = 'block';
        displayProducts(users.flatMap(u => u.products)); // Display all products
    } else {
        alert('Invalid credentials. Please try again.');
    }
};

// Sign up functionality
signupSubmitBtn.onclick = function() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        if (users.some(u => u.username === username)) {
            alert('Username already exists.');
        } else {
            users.push({ username: username, password: password, products: [], purchaseHistory: [] });
            alert('Sign up successful! You can now log in.');
            signupModal.style.display = 'none';
        }
    } else {
        alert('Please fill in all fields');
    }
};

// Purchase product function
function purchaseProduct(productName, seller) {
    const user = users.find(u => u.username === currentUser);
    if (user) {
        const product = users.flatMap(u => u.products).find(p => p.name === productName && p.seller === seller);
        if (product) {
            user.purchaseHistory.push(product);
            alert(`You have purchased ${productName} from ${seller}.`);
            // Optionally, you could delete the product from the seller's list after purchase
            deleteProduct(productName);
        }
    } else {
        alert('Please log in to make a purchase.');
    }
}

// Delete product function
function deleteProduct(productName) {
    const user = users.find(u => u.username === currentUser);
    if (user) {
        user.products = user.products.filter(product => product.name !== productName);
        displayUserProducts();
        displayProducts(users.flatMap(u => u.products)); // Refresh product list
        alert(`${productName} has been deleted.`);
    }
}

// Search products
function searchProducts() {
    const filter = searchInput.value.toLowerCase();
    const filteredProducts = users.flatMap(user => user.products)
                                   .filter(product => product.name.toLowerCase().includes(filter));
    
    if (filter) {
        displayProducts(filteredProducts); // Show filtered products
    } else {
        productList.innerHTML = ''; // Clear product list if no search term
    }
}

// Initial setup
document.getElementById('homePage').style.display = 'none'; // Hide home page initially
