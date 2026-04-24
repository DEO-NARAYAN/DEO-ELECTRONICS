/**
 * script.js – Deo Electronics (Light Theme Redesign)
 * Main application logic
 */

'use strict';

/* ══════════════════════════════════════════════════════════════
   SVG ICONS (re-colored for light theme)
══════════════════════════════════════════════════════════════ */
const SVG_ICONS = {
  Microcontrollers: `
    <svg width="86" height="86" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="22" width="46" height="46" rx="6" fill="none" stroke="#6366f1" stroke-width="2"/>
      <rect x="30" y="30" width="30" height="30" rx="4" fill="rgba(99,102,241,0.1)" stroke="#8b5cf6" stroke-width="1.5"/>
      <line x1="32" y1="16" x2="32" y2="22" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="16" x2="40" y2="22" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="48" y1="16" x2="48" y2="22" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="56" y1="16" x2="56" y2="22" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="32" y1="68" x2="32" y2="74" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="68" x2="40" y2="74" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="48" y1="68" x2="48" y2="74" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="56" y1="68" x2="56" y2="74" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="32" x2="22" y2="32" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="40" x2="22" y2="40" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="48" x2="22" y2="48" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="56" x2="22" y2="56" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="32" x2="74" y2="32" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="40" x2="74" y2="40" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="48" x2="74" y2="48" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="56" x2="74" y2="56" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <text x="45" y="49" text-anchor="middle" fill="#6366f1" font-size="8" font-family="Syne,monospace" letter-spacing="1" font-weight="700">MCU</text>
    </svg>`,

  LEDs: `
    <svg width="86" height="86" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 18 C30 18 22 30 22 40 C22 50 28 56 34 62 L34 70 L56 70 L56 62 C62 56 68 50 68 40 C68 30 60 18 45 18Z"
            fill="rgba(236,72,153,0.07)" stroke="#ec4899" stroke-width="1.8"/>
      <rect x="34" y="70" width="22" height="5" rx="2" fill="none" stroke="#8b5cf6" stroke-width="1.5"/>
      <rect x="36" y="75" width="18" height="4" rx="2" fill="none" stroke="#8b5cf6" stroke-width="1.5"/>
      <path d="M38 52 L38 44 L42 38 L48 38 L52 44 L52 52" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <circle cx="45" cy="38" r="3.5" fill="#ec4899" opacity="0.9"/>
      <line x1="45" y1="10" x2="45" y2="14" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="58" y1="14" x2="56" y2="17" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="32" y1="14" x2="34" y2="17" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="68" y1="26" x2="65" y2="27" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="22" y1="26" x2="25" y2="27" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

  Resistors: `
    <svg width="86" height="86" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="45" x2="25" y2="45" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="65" y1="45" x2="80" y2="45" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <rect x="25" y="34" width="40" height="22" rx="6" fill="rgba(99,102,241,0.07)" stroke="#6366f1" stroke-width="1.8"/>
      <rect x="32" y="34" width="4" height="22" rx="0" fill="#ef4444" opacity="0.75"/>
      <rect x="40" y="34" width="4" height="22" rx="0" fill="#f59e0b" opacity="0.75"/>
      <rect x="48" y="34" width="4" height="22" rx="0" fill="#06b6d4" opacity="0.75"/>
      <rect x="56" y="34" width="4" height="22" rx="0" fill="#8b5cf6" opacity="0.75"/>
    </svg>`,

  Sensors: `
    <svg width="86" height="86" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="36" width="34" height="28" rx="5" fill="rgba(6,182,212,0.07)" stroke="#06b6d4" stroke-width="1.8"/>
      <circle cx="45" cy="50" r="10" fill="none" stroke="#ec4899" stroke-width="1.4"/>
      <circle cx="45" cy="50" r="6"  fill="none" stroke="#06b6d4" stroke-width="1.4"/>
      <circle cx="45" cy="50" r="3" fill="#06b6d4" opacity="0.9"/>
      <line x1="35" y1="64" x2="35" y2="74" stroke="#06b6d4" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="45" y1="64" x2="45" y2="74" stroke="#06b6d4" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="55" y1="64" x2="55" y2="74" stroke="#06b6d4" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M22 20 Q22 36 35 36" stroke="#ec4899" stroke-width="1.2" stroke-dasharray="3 3" fill="none" opacity="0.5"/>
      <path d="M68 20 Q68 36 55 36" stroke="#ec4899" stroke-width="1.2" stroke-dasharray="3 3" fill="none" opacity="0.5"/>
      <path d="M16 14 Q16 38 30 38" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.35"/>
      <path d="M74 14 Q74 38 60 38" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.35"/>
    </svg>`,
};

/* ══════════════════════════════════════════════════════════════
   PRODUCT DATA
══════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  { id: 1, name: 'Arduino Nano v3', category: 'Microcontrollers', description: 'Compact ATmega328P board with USB-C. Perfect for embedded projects requiring minimal footprint.', price: 320, iconKey: 'Microcontrollers' },
  { id: 2, name: 'ESP32 Dev Board', category: 'Microcontrollers', description: 'Dual-core 240 MHz with built-in Wi-Fi & Bluetooth. Ideal for IoT applications.', price: 480, iconKey: 'Microcontrollers' },
  { id: 3, name: 'Raspberry Pi Pico', category: 'Microcontrollers', description: 'RP2040 dual-core ARM Cortex-M0+ microcontroller. Programmable in MicroPython.', price: 390, iconKey: 'Microcontrollers' },
  { id: 4, name: 'RGB LED 5mm (Pack of 20)', category: 'LEDs', description: 'Common-cathode RGB LED with clear lens. Wide viewing angle, low power consumption.', price: 85, iconKey: 'LEDs' },
  { id: 5, name: 'WS2812B Neopixel Strip 1m', category: 'LEDs', description: 'Addressable RGB LED strip, 60 LEDs/m, 5V. Controllable with single data line.', price: 650, iconKey: 'LEDs' },
  { id: 6, name: 'IR LED 940nm (Pack of 10)', category: 'LEDs', description: 'Infrared emitter LEDs for remote control and obstacle detection circuits.', price: 45, iconKey: 'LEDs' },
  { id: 7, name: '1/4W Resistor Kit (600pcs)', category: 'Resistors', description: 'Assorted pack covering 30 common values from 10Ω to 1MΩ. ±5% tolerance.', price: 179, iconKey: 'Resistors' },
  { id: 8, name: 'SMD Resistor 0402 Kit', category: 'Resistors', description: '0402 SMD resistors, 170 values × 25pcs each. Essential for PCB prototyping.', price: 420, iconKey: 'Resistors' },
  { id: 9, name: 'DHT22 Temp & Humidity Sensor', category: 'Sensors', description: 'Calibrated digital sensor with ±0.5°C accuracy. Long cable length support.', price: 210, iconKey: 'Sensors' },
  { id: 10, name: 'HC-SR04 Ultrasonic Module', category: 'Sensors', description: 'Distance sensing 2cm–400cm range with 3mm accuracy. 5V logic, 15° beam angle.', price: 95, iconKey: 'Sensors' },
  { id: 11, name: 'MPU6050 IMU Module', category: 'Sensors', description: '6-axis accelerometer + gyroscope over I2C. Gyro range ±2000°/s.', price: 135, iconKey: 'Sensors' },
  { id: 12, name: 'MQ-135 Air Quality Sensor', category: 'Sensors', description: 'Detects CO2, NH3, NOx and other air pollutants. Analog & digital output.', price: 165, iconKey: 'Sensors' },
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
let cart = [];
let activeFilter = 'all';
let searchQuery = '';

/* ══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('button, a, .product-card, .filter-btn, .nav-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════════ */
function showToast(message, type = 'success', duration = 3200) {
  const container = document.getElementById('toast-container');

  const icons = {
    success: `<svg class="toast-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#6366f1" stroke-width="1.6"/><path d="M6 10l3 3 5-5" stroke="#6366f1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    error: `<svg class="toast-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" stroke-width="1.6"/><line x1="7" y1="7" x2="13" y2="13" stroke="#ef4444" stroke-width="1.6" stroke-linecap="round"/><line x1="13" y1="7" x2="7" y2="13" stroke="#ef4444" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    info: `<svg class="toast-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ec4899" stroke-width="1.6"/><line x1="10" y1="9" x2="10" y2="14" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="6.5" r="1" fill="#ec4899"/></svg>`,
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
  container.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };
  const timer = setTimeout(dismiss, duration);
  toast.addEventListener('click', () => { clearTimeout(timer); dismiss(); });
}

/* ══════════════════════════════════════════════════════════════
   CART MANAGEMENT
══════════════════════════════════════════════════════════════ */
function getCartItemCount() { return cart.reduce((s, i) => s + i.quantity, 0); }
function getCartTotal() { return cart.reduce((s, i) => s + i.product.price * i.quantity, 0); }

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.product.id === productId);
  if (existing) existing.quantity++;
  else cart.push({ product, quantity: 1 });
  updateCartUI();
  showToast(`${product.name} added to cart!`, 'success');
}

function increaseQty(productId) {
  const item = cart.find(i => i.product.id === productId);
  if (item) { item.quantity++; updateCartUI(); }
}

function decreaseQty(productId) {
  const idx = cart.findIndex(i => i.product.id === productId);
  if (idx === -1) return;
  cart[idx].quantity--;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.product.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const count = getCartItemCount();
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);

  const container = document.getElementById('cart-items-container');
  const emptyMsg = document.getElementById('cart-empty-msg');

  Array.from(container.querySelectorAll('.cart-item')).forEach(el => el.remove());

  if (cart.length === 0) {
    emptyMsg.style.display = 'flex';
  } else {
    emptyMsg.style.display = 'none';
    cart.forEach(({ product, quantity }) => {
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.dataset.id = product.id;
      item.innerHTML = `
        <div class="cart-item-icon">${SVG_ICONS[product.iconKey] || SVG_ICONS['Sensors']}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">₹${(product.price * quantity).toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="dec" data-id="${product.id}" aria-label="Decrease">−</button>
          <span class="qty-display">${quantity}</span>
          <button class="qty-btn" data-action="inc" data-id="${product.id}" aria-label="Increase">+</button>
        </div>
        <button class="remove-item-btn" data-id="${product.id}" aria-label="Remove">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>`;
      container.appendChild(item);
    });
  }

  document.getElementById('cart-total').textContent = `₹${getCartTotal().toFixed(2)}`;
}

function openCart() { document.getElementById('cart-sidebar').classList.add('is-open'); document.getElementById('cart-overlay').classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeCart() { document.getElementById('cart-sidebar').classList.remove('is-open'); document.getElementById('cart-overlay').classList.add('hidden'); document.body.style.overflow = ''; }

/* ══════════════════════════════════════════════════════════════
   PRODUCT RENDERING & FILTERING
══════════════════════════════════════════════════════════════ */
function getFilteredProducts() {
  const q = searchQuery.trim().toLowerCase();
  return PRODUCTS.filter(p => {
    const matchCat = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const noMsg = document.getElementById('no-results-msg');
  const filtered = getFilteredProducts();

  grid.innerHTML = '';

  if (filtered.length === 0) { noMsg.classList.remove('hidden'); return; }
  noMsg.classList.add('hidden');

  filtered.forEach((product, idx) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.style.animationDelay = `${idx * 0.06}s`;
    card.dataset.id = product.id;
    card.innerHTML = `
      <div class="product-card-img">${SVG_ICONS[product.iconKey] || SVG_ICONS['Sensors']}</div>
      <span class="product-category-badge">${product.category}</span>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">₹${product.price.toFixed(2)}</span>
        <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
      </div>`;
    attach3DTilt(card);
    grid.appendChild(card);
  });

  // Rebind cursor hover for new cards
  document.querySelectorAll('.product-card, .add-to-cart-btn').forEach(el => {
    const ring = document.getElementById('cursor-ring');
    if (!ring) return;
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

/* ══════════════════════════════════════════════════════════════
   3D CARD TILT
══════════════════════════════════════════════════════════════ */
function attach3DTilt(card) {
  const MAX = 12;

  let shine = document.createElement('div');
  shine.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,0.55),transparent 68%);opacity:0;transition:opacity 0.2s;';
  card.appendChild(shine);

  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    card.style.transform = `perspective(900px) rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg) scale3d(1.025,1.025,1.025)`;
    const sx = ((e.clientX - r.left) / r.width) * 100;
    const sy = ((e.clientY - r.top) / r.height) * 100;
    shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.55), transparent 68%)`;
    shine.style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    shine.style.opacity = '0';
  });
}

/* ══════════════════════════════════════════════════════════════
   AUTH MODAL
══════════════════════════════════════════════════════════════ */
function openAuthModal() { document.getElementById('auth-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; setTimeout(() => document.getElementById('auth-email').focus(), 100); }
function closeAuthModal() { document.getElementById('auth-modal').classList.add('hidden'); document.body.style.overflow = ''; }

/* ══════════════════════════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════════════════════════ */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   PARALLAX HERO DECORATION
══════════════════════════════════════════════════════════════ */
function initParallax() {
  const inner = document.querySelector('.hero-3d-inner');
  if (!inner) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    inner.style.transform = `perspective(900px) rotateY(${-8 + scrolled * 0.015}deg) rotateX(${4 - scrolled * 0.008}deg) translateY(${scrolled * 0.12}px)`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════════════════ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════════════════════════════════ */
function initEventListeners() {
  // Auth
  document.getElementById('signin-btn').addEventListener('click', openAuthModal);
  document.getElementById('close-modal-btn').addEventListener('click', closeAuthModal);
  document.getElementById('auth-modal').addEventListener('click', e => { if (e.target === document.getElementById('auth-modal')) closeAuthModal(); });
  document.getElementById('auth-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-password').value;
    if (!email || !pass) { showToast('Please fill in all fields.', 'error'); return; }
    closeAuthModal();
    document.getElementById('auth-form').reset();
    showToast('Logged in successfully! Welcome back.', 'success');
  });

  // Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeAuthModal(); closeCart(); } });

  // Cart
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('close-cart-btn').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);

  document.getElementById('cart-items-container').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    const rmBtn = e.target.closest('.remove-item-btn');
    if (btn) { const id = parseInt(btn.dataset.id, 10); btn.dataset.action === 'inc' ? increaseQty(id) : decreaseQty(id); }
    if (rmBtn) removeFromCart(parseInt(rmBtn.dataset.id, 10));
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
    cart = [];
    updateCartUI();
    closeCart();
    showToast('Order placed! Thank you for shopping with Deo Electronics 🎉', 'success', 4500);
  });

  // Product grid
  document.getElementById('product-grid').addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      addToCart(parseInt(btn.dataset.productId, 10));
      btn.textContent = '✓ Added!';
      btn.style.opacity = '0.8';
      setTimeout(() => { btn.textContent = 'Add to Cart'; btn.style.opacity = ''; }, 1200);
    }
  });

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.category;
      renderProducts();
    });
  });

  // Search
  document.getElementById('search-input').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderProducts();
    if (searchQuery.trim()) {
      const s = document.getElementById('products');
      if (s && s.getBoundingClientRect().top > window.innerHeight * 0.9)
        s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initEventListeners();
  handleNavbarScroll();
  setupSmoothScroll();
  initScrollReveal();
  initCursor();
  initParallax();
  console.log('%c✦ Deo Electronics – Light Theme loaded!', 'color:#6366f1;font-weight:bold;font-size:13px;');
});
