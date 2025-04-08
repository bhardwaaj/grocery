// Sample product data
const products = [
    {
        id: 1,
        name: "Fresh Apples",
        category: "fruits",
        price: 2.99,
        description: "Crisp and juicy red apples",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Organic Bananas",
        category: "fruits",
        price: 1.99,
        description: "Sweet and nutritious bananas",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Fresh Carrots",
        category: "vegetables",
        price: 1.49,
        description: "Crunchy and sweet carrots",
        image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Organic Milk",
        category: "dairy",
        price: 3.99,
        description: "Fresh organic milk",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 2.49,
        description: "Juicy and ripe tomatoes",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        name: "Greek Yogurt",
        category: "dairy",
        price: 4.49,
        description: "Creamy and protein-rich yogurt",
        image: "https://images.unsplash.com/photo-1577043552439-4e5b0e5b3025?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        name: "Fresh Strawberries",
        category: "fruits",
        price: 3.99,
        description: "Sweet and juicy strawberries",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        name: "Organic Eggs",
        category: "dairy",
        price: 4.99,
        description: "Farm-fresh organic eggs",
        image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 9,
        name: "Fresh Broccoli",
        category: "vegetables",
        price: 2.99,
        description: "Fresh and nutritious broccoli",
        image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');

// Display products with cart functionality
function displayProducts(category = 'all', searchTerm = '') {
    productsContainer.innerHTML = '';
    
    let filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Show cart modal
function showCart() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    if (document.getElementById('cart-total')) {
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }
    if (cartModal) {
        cartModal.style.display = 'block';
    }
}

// Event Listeners
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProducts(button.dataset.category, searchInput.value);
        });
    });
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        displayProducts(activeCategory, searchInput.value);
    });
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
    });
});

// Cart modal functionality
if (closeCart) {
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

if (window) {
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert("Backend is not developed yet for this app! Please wait, it will be available in the next update.");
    });
}

// Remove item from cart
if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const newCart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            updateCartCount();
            showCart();
        }
    });
}

// Initialize the page
if (productsContainer) {
    displayProducts();
    updateCartCount();
} 