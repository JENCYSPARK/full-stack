const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const orderModal = document.getElementById("order-modal");
const orderProductDetails = document.getElementById("order-product-details");

let products = [
  { 
    name: "Laptop", 
    price: 250, 
    description: "2-year-old laptop, 8GB RAM, 256GB SSD,", 
    contact: "John@gmail.com", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGxwrtYeMGFwDf6fLSMvFzUUxM-v92-UuYg&s"
  },
  { 
    name: "Bike", 
    price: 150, 
    description: "Well-maintained, perfect for outdoor.", 
    contact: "Alex@gmail.com", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHOC0Aim7FjHL3QkpbESR-ykbBaZNTo-lnWA&s"
  },
  { 
    name: "Coffee Table", 
    price: 50, 
    description: "Wooden table with glass top,minor scratches.", 
    contact: "Joe@gmail.com", 
    image: "data:image/jpeg;base64,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"
  }
];

let cart = [];
let selectedProduct = null;

// Show the selected section
function showSection(section) {
  document.getElementById("home-section").style.display = section === "home" ? "block" : "none";
  document.getElementById("cart-section").style.display = section === "cart" ? "block" : "none";
  document.getElementById("profile-section").style.display = section === "profile" ? "block" : "none";
}

// Display products in Home
function displayProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p>${product.description}</p>
      <p><strong>Contact Seller:</strong> ${product.contact}</p>
      <button onclick="addToCart(${index})"><i class="fas fa-cart-plus"></i> Add to Cart</button>
      <button onclick="orderNow(${index})"><i class="fas fa-credit-card"></i> Place Order</button>
    `;
    productList.appendChild(productElement);
  });
}

// Add a product to the cart
function addToCart(index) {
  const product = products[index];
  cart.push(product);
  displayCart();
}

// Show the order modal
function showOrderModal(product) {
  selectedProduct = product;
  orderProductDetails.innerHTML = `
    <strong>Product:</strong> ${product.name}<br>
    <strong>Price:</strong> $${product.price}
  `;
  orderModal.style.display = "flex"; // Show modal as a pop-up
}

// Close the order modal
function closeOrderModal() {
  orderModal.style.display = "none";
  selectedProduct = null;
}

// Place the order
function placeOrder() {
  const shippingAddress = document.getElementById("shipping-address").value;
  const contactNumber = document.getElementById("contact-number").value;

  if (!shippingAddress || !contactNumber) {
    alert("Please provide all the order details.");
    return;
  }

  alert(`Order placed successfully for ${selectedProduct.name}!\nShipping to: ${shippingAddress}`);
  
  cart = [];
  displayCart();
  closeOrderModal();
}

// Display cart items with Place Order option
function displayCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<p><i class='fas fa-info-circle'></i> No items in the cart.</p>";
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("product");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> $${item.price}</p>
        <p>${item.description}</p>
        <p><strong>Contact Seller:</strong> ${item.contact}</p>
        <button onclick="orderProduct(${index})"><i class="fas fa-credit-card"></i> Place Order</button>
      `;
      cartList.appendChild(cartItem);
    });
  }
}

// Place order directly from Home
function orderNow(index) {
  const product = products[index];
  showOrderModal(product);
}

// Place order from the cart
function orderProduct(cartIndex) {
  const product = cart[cartIndex];
  showOrderModal(product);
}

// Add a new product in Profile section
function addProduct(event) {
  event.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const description = document.getElementById("product-description").value;
  const contact = "you@example.com";
  const image = document.getElementById("product-image").value;

  const newProduct = { name, price, description, contact, image };
  products.push(newProduct);

  displayProducts();
  document.getElementById("product-form").reset();
}

// Initialize
displayProducts();
showSection('home');
