// ============================================
// MADHU HOMEMADE MASALA - E-COMMERCE JS
// Premium Mobile-First E-Commerce Platform
// ============================================

// === DATA ===
const categories = [
  { id: 1, name: 'Masala Powders', img: 'assets/images/category-masala.jpg', desc: 'Authentic homemade masala blends' },
  { id: 2, name: 'Whole Spices', img: 'assets/images/category-whole-spices.jpg', desc: 'Pure and premium whole spices' },
  { id: 3, name: 'Dry Fruits', img: 'assets/images/category-dry-fruits.jpg', desc: 'Nutritious and fresh dry fruits' },
  { id: 4, name: 'Gift Boxes', img: 'assets/images/category-gift-boxes.jpg', desc: 'Premium curated gift collections' }
];

const products = [
  {
    id: 1,
    name: 'Garam Masala Premium',
    price: 180,
    image: 'assets/images/product-garam-masala.jpg',
    description: 'Aromatic blend of premium spices',
    badge: 'Bestseller',
    category: 1
  },
  {
    id: 2,
    name: 'Turmeric Powder',
    price: 120,
    image: 'assets/images/product-turmeric.jpg',
    description: 'Pure organic turmeric powder',
    badge: '',
    category: 1
  },
  {
    id: 3,
    name: 'Coriander Powder',
    price: 100,
    image: 'assets/images/product-coriander.jpg',
    description: 'Freshly ground coriander',
    badge: '',
    category: 1
  },
  {
    id: 4,
    name: 'Kashmiri Red Chilli',
    price: 150,
    image: 'assets/images/product-red-chilli.jpg',
    description: 'Premium Kashmiri red chilli',
    badge: 'Hot Sale',
    category: 2
  },
  {
    id: 5,
    name: 'Whole Black Pepper',
    price: 280,
    image: 'assets/images/product-black-pepper.jpg',
    description: 'Premium Tellicherry black pepper',
    badge: 'Premium',
    category: 2
  },
  {
    id: 6,
    name: 'Cardamom Green',
    price: 450,
    image: 'assets/images/product-cardamom.jpg',
    description: 'Aromatic green cardamom pods',
    badge: 'Premium',
    category: 2
  },
  {
    id: 7,
    name: 'Premium Almonds',
    price: 550,
    image: 'assets/images/product-almonds.jpg',
    description: 'Organic California almonds',
    badge: '',
    category: 3
  },
  {
    id: 8,
    name: 'Cashew Nuts',
    price: 480,
    image: 'assets/images/product-cashew.jpg',
    description: 'Premium whole cashew nuts',
    badge: 'Bestseller',
    category: 3
  },
  {
    id: 9,
    name: 'Festive Spice Gift Box',
    price: 1200,
    image: 'assets/images/product-gift-box.jpg',
    description: 'Premium spice collection',
    badge: 'New',
    category: 4
  }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'The quality of spices is outstanding! I can taste the authenticity in every dish. Madhu Homemade Masala has become our family favorite.',
    rating: 5
  },
  {
    name: 'Rajesh Kumar',
    text: 'Fresh, aromatic, and pure! The garam masala is the best I have ever used. Highly recommended for authentic flavors.',
    rating: 5
  },
  {
    name: 'Anita Desai',
    text: 'I love the packaging and the quality. The dry fruits are fresh and the spices are so flavorful. Thank you for bringing tradition to our kitchen!',
    rating: 5
  },
  {
    name: 'Vikram Singh',
    text: 'Been ordering for 6 months now. Consistent quality and fast delivery. The customer service is also excellent. Will continue buying!',
    rating: 5
  },
  {
    name: 'Meera Pillai',
    text: 'The spice blends are so fresh and aromatic. My family loves the taste! Fast delivery too.',
    rating: 5
  },
  {
    name: 'Suresh Rao',
    text: 'Excellent quality and packaging. The masalas remind me of my childhood in Kerala.',
    rating: 5
  },
  {
    name: 'Fatima Noor',
    text: 'I ordered the gift box for Diwali and everyone loved it. Will order again!',
    rating: 5
  }
];

// === CART STATE ===
let cart = JSON.parse(localStorage.getItem('madhucart')) || [];
let productQuantities = {};

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderCategories();
  renderProducts();
  renderTestimonials();
  setupEventListeners();
  updateCartUI();
  // Removed sticky navbar JS for performance
}

// === NAVIGATION ===
function setupEventListeners() {
  // Mobile Menu
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Cart Sidebar
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');

  cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
  });
  
  // Mobile Cart Bar
  const viewCartMobile = document.getElementById('view-cart-mobile');
  if (viewCartMobile) {
    viewCartMobile.addEventListener('click', () => {
      cartSidebar.classList.add('open');
    });
  }

  // Checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', handleCheckout);

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', handleContactSubmit);

  // Testimonial Slider
  setupTestimonialSlider();

  // Removed JS smooth scroll for performance; use CSS scroll-behavior instead
}

// === STICKY NAVBAR ===
function setupStickyNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

// === RENDER CATEGORIES ===
function renderCategories() {
  const grid = document.getElementById('category-grid');
  grid.innerHTML = '';

  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <img src="${category.img}" alt="${category.name}">
      <h3 class="category-name">${category.name}</h3>
    `;
    card.addEventListener('click', () => filterProductsByCategory(category.id));
    grid.appendChild(card);
  });
}

// === RENDER PRODUCTS ===
function renderProducts(categoryId = null) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  const filteredProducts = categoryId 
    ? products.filter(p => p.category === categoryId)
    : products;

  filteredProducts.forEach(product => {
    if (!productQuantities[product.id]) {
      productQuantities[product.id] = 1;
    }

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">₹${product.price}</div>
          <div class="product-actions">
            <div class="qty-selector">
              <button onclick="updateQuantity(${product.id}, -1)">-</button>
              <span class="qty-display" id="qty-${product.id}">${productQuantities[product.id]}</span>
              <button onclick="updateQuantity(${product.id}, 1)">+</button>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// === QUANTITY MANAGEMENT ===
function updateQuantity(productId, change) {
  productQuantities[productId] = Math.max(1, productQuantities[productId] + change);
  document.getElementById(`qty-${productId}`).textContent = productQuantities[productId];
}

// === CART MANAGEMENT ===
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const quantity = productQuantities[productId];

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart();
  updateCartUI();
  showNotification('✓ Added to cart!');
  document.getElementById('cart-sidebar').classList.add('open');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showNotification('Item removed from cart');
}

function updateCartItemQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, item.quantity + change);
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('madhucart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update mobile cart bar
  updateMobileCartBar();

  // Update cart items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotal.textContent = '0';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = total;
}

function updateMobileCartBar() {
  const mobileCartBar = document.querySelector('.mobile-cart-bar');
  const mobileCartCount = document.getElementById('mobile-cart-count');
  const mobileCartTotal = document.getElementById('mobile-cart-total');
  
  if (!mobileCartBar) return;
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Show/hide mobile cart bar
  if (totalItems > 0) {
    mobileCartBar.style.display = 'flex';
    mobileCartCount.textContent = totalItems;
    mobileCartTotal.textContent = total;
  } else {
    mobileCartBar.style.display = 'none';
  }
}

function handleCheckout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Hi! I'd like to order:\n\n${cart.map(item => `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}\n\nTotal: ₹${total}`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank');
  showNotification('Redirecting to WhatsApp...');
}

// === TESTIMONIALS ===
function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  track.innerHTML = '';

  // Auto-slide vertical testimonials
  let currentIndex = 0;
  function showTestimonial(idx) {
    const t = testimonials[idx];
    track.innerHTML = `
      <div class="testimonial-card" style="transition:all 0.5s;">
        <div class="testimonial-stars">${'⭐'.repeat(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <p class="testimonial-author">— ${t.name}</p>
      </div>
    `;
  }
  showTestimonial(currentIndex);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 3500);
}

function setupTestimonialSlider() {
  // No button logic needed for auto-slide testimonials
}

// === CONTACT FORM ===
function handleContactSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  // Here you would send to your backend
  console.log('Contact form submitted:', data);
  
  showNotification('✓ Message sent successfully!');
  e.target.reset();
}

// === NOTIFICATIONS ===
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// === CATEGORY FILTER ===
function filterProductsByCategory(categoryId) {
  renderProducts(categoryId);
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}