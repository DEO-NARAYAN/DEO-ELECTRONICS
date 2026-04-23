/**
 * script.js – Deo Electronics
 * Main application logic:
 *  - Product data & rendering
 *  - Cart management
 *  - Authentication modal
 *  - Toast notifications
 *  - Real-time search filtering
 *  - 3D card tilt effect
 *  - Scroll-aware navbar
 */

'use strict';

/* ══════════════════════════════════════════════════════════════
   INLINE SVG ICONS (Custom per category)
══════════════════════════════════════════════════════════════ */

/**
 * Returns an SVG string for each product category.
 * All graphics are built with simple shapes — no external images.
 */
const SVG_ICONS = {
  /* ── Microcontroller Chip ── */
  Microcontrollers: `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="22" width="46" height="46" rx="5" fill="none" stroke="#4f46e5" stroke-width="2"/>
      <rect x="30" y="30" width="30" height="30" rx="3" fill="rgba(188,19,254,0.15)" stroke="#06b6d4" stroke-width="1.5"/>
      <!-- Pins top -->
      <line x1="32" y1="16" x2="32" y2="22" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="16" x2="40" y2="22" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="48" y1="16" x2="48" y2="22" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="56" y1="16" x2="56" y2="22" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <!-- Pins bottom -->
      <line x1="32" y1="68" x2="32" y2="74" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="68" x2="40" y2="74" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="48" y1="68" x2="48" y2="74" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="56" y1="68" x2="56" y2="74" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <!-- Pins left -->
      <line x1="16" y1="32" x2="22" y2="32" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="40" x2="22" y2="40" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="48" x2="22" y2="48" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="56" x2="22" y2="56" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <!-- Pins right -->
      <line x1="68" y1="32" x2="74" y2="32" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="40" x2="74" y2="40" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="48" x2="74" y2="48" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="56" x2="74" y2="56" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <!-- Center label -->
      <text x="45" y="48" text-anchor="middle" fill="#4f46e5" font-size="8" font-family="Orbitron,monospace" letter-spacing="1">MCU</text>
    </svg>`,

  /* ── LED Bulb ── */
  LEDs: `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Bulb body -->
      <path d="M45 18 C30 18 22 30 22 40 C22 50 28 56 34 62 L34 70 L56 70 L56 62 C62 56 68 50 68 40 C68 30 60 18 45 18Z"
            fill="rgba(0,243,255,0.08)" stroke="#4f46e5" stroke-width="1.8"/>
      <!-- Base stripes -->
      <rect x="34" y="70" width="22" height="5" rx="2" fill="none" stroke="#06b6d4" stroke-width="1.5"/>
      <rect x="36" y="75" width="18" height="4" rx="2" fill="none" stroke="#06b6d4" stroke-width="1.5"/>
      <!-- Filament -->
      <path d="M38 52 L38 44 L42 38 L48 38 L52 44 L52 52" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Glow point -->
      <circle cx="45" cy="38" r="3" fill="#4f46e5" opacity="0.9"/>
      <!-- Rays -->
      <line x1="45" y1="10" x2="45" y2="14" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="58" y1="14" x2="56" y2="17" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="32" y1="14" x2="34" y2="17" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="68" y1="26" x2="65" y2="27" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="22" y1="26" x2="25" y2="27" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

  /* ── Resistor ── */
  Resistors: `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Leads -->
      <line x1="10" y1="45" x2="25" y2="45" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="65" y1="45" x2="80" y2="45" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <!-- Body -->
      <rect x="25" y="34" width="40" height="22" rx="6" fill="rgba(188,19,254,0.1)" stroke="#06b6d4" stroke-width="1.8"/>
      <!-- Colour bands -->
      <rect x="32" y="34" width="4" height="22" rx="0" fill="#ff4d6d" opacity="0.8"/>
      <rect x="40" y="34" width="4" height="22" rx="0" fill="#ffd166" opacity="0.8"/>
      <rect x="48" y="34" width="4" height="22" rx="0" fill="#4f46e5" opacity="0.8"/>
      <rect x="56" y="34" width="4" height="22" rx="0" fill="#06b6d4" opacity="0.8"/>
      <!-- Omega symbol -->
      <text x="45" y="50" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" opacity="0.4" font-family="serif">Ω</text>
    </svg>`,

  /* ── Sensor Radar ── */
  Sensors: `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Sensor housing -->
      <rect x="28" y="36" width="34" height="28" rx="5" fill="rgba(0,243,255,0.07)" stroke="#4f46e5" stroke-width="1.8"/>
      <!-- Lens rings -->
      <circle cx="45" cy="50" r="10" fill="none" stroke="#06b6d4" stroke-width="1.4"/>
      <circle cx="45" cy="50" r="6"  fill="none" stroke="#4f46e5" stroke-width="1.4"/>
      <circle cx="45" cy="50" r="2.5" fill="#4f46e5" opacity="0.9"/>
      <!-- Pins bottom -->
      <line x1="35" y1="64" x2="35" y2="74" stroke="#4f46e5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="45" y1="64" x2="45" y2="74" stroke="#4f46e5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="55" y1="64" x2="55" y2="74" stroke="#4f46e5" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Detection arcs -->
      <path d="M22 20 Q22 36 35 36" stroke="#06b6d4" stroke-width="1.2" stroke-dasharray="3 3" fill="none" opacity="0.5"/>
      <path d="M68 20 Q68 36 55 36" stroke="#06b6d4" stroke-width="1.2" stroke-dasharray="3 3" fill="none" opacity="0.5"/>
      <path d="M16 14 Q16 38 30 38" stroke="#4f46e5" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.35"/>
      <path d="M74 14 Q74 38 60 38" stroke="#4f46e5" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.35"/>
    </svg>`,

  /* ── Capacitor ── (for variety) */
  Capacitors: `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Body cylinder -->
      <rect x="32" y="22" width="26" height="46" rx="8" fill="rgba(0,243,255,0.07)" stroke="#4f46e5" stroke-width="1.8"/>
      <!-- Polarity stripe -->
      <rect x="32" y="22" width="26" height="12" rx="8" fill="rgba(188,19,254,0.25)"/>
      <text x="45" y="32" text-anchor="middle" fill="#06b6d4" font-size="9" font-weight="bold" font-family="Inter,sans-serif">+</text>
      <!-- Plates (internal lines) -->
      <line x1="36" y1="50" x2="54" y2="50" stroke="#4f46e5" stroke-width="1.2" opacity="0.5"/>
      <line x1="36" y1="55" x2="54" y2="55" stroke="#4f46e5" stroke-width="1.2" opacity="0.5"/>
      <!-- Leads -->
      <line x1="40" y1="68" x2="40" y2="78" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="50" y1="68" x2="50" y2="78" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

  /* ── Inductor / Coil ── (for variety) */
  Inductors: `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" class="product-card-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Leads -->
      <line x1="10" y1="45" x2="22" y2="45" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <line x1="68" y1="45" x2="80" y2="45" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
      <!-- Core -->
      <line x1="22" y1="38" x2="68" y2="38" stroke="#06b6d4" stroke-width="1.2" opacity="0.5"/>
      <line x1="22" y1="52" x2="68" y2="52" stroke="#06b6d4" stroke-width="1.2" opacity="0.5"/>
      <!-- Coil loops -->
      <path d="M22 45 C22 37 30 37 30 45 C30 37 38 37 38 45 C38 37 46 37 46 45 C46 37 54 37 54 45 C54 37 62 37 62 45 C62 37 68 37 68 45"
            stroke="#4f46e5" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,
};

/* ══════════════════════════════════════════════════════════════
   PRODUCT DATA
══════════════════════════════════════════════════════════════ */

const PRODUCTS = [
  // ── Microcontrollers ──
  {
    id: 1,
    name: 'Arduino Nano v3',
    category: 'Microcontrollers',
    description: 'Compact ATmega328P board with USB-C. Perfect for embedded projects requiring minimal footprint.',
    price: 320,
    iconKey: 'Microcontrollers',
  },
  {
    id: 2,
    name: 'ESP32 Dev Board',
    category: 'Microcontrollers',
    description: 'Dual-core 240 MHz with built-in Wi-Fi & Bluetooth. Ideal for IoT applications.',
    price: 480,
    iconKey: 'Microcontrollers',
  },
  {
    id: 3,
    name: 'Raspberry Pi Pico',
    category: 'Microcontrollers',
    description: 'RP2040 dual-core ARM Cortex-M0+ microcontroller. Programmable in MicroPython.',
    price: 390,
    iconKey: 'Microcontrollers',
  },

  // ── LEDs ──
  {
    id: 4,
    name: 'RGB LED 5mm (Pack of 20)',
    category: 'LEDs',
    description: 'Common-cathode RGB LED with clear lens. Wide viewing angle, low power consumption.',
    price: 85,
    iconKey: 'LEDs',
  },
  {
    id: 5,
    name: 'WS2812B Neopixel Strip 1m',
    category: 'LEDs',
    description: 'Addressable RGB LED strip, 60 LEDs/m, 5V. Controllable with single data line.',
    price: 650,
    iconKey: 'LEDs',
  },
  {
    id: 6,
    name: 'IR LED 940nm (Pack of 10)',
    category: 'LEDs',
    description: 'Infrared emitter LEDs for remote control and obstacle detection circuits.',
    price: 45,
    iconKey: 'LEDs',
  },

  // ── Resistors ──
  {
    id: 7,
    name: '1/4W Resistor Kit (600pcs)',
    category: 'Resistors',
    description: 'Assorted pack covering 30 common values from 10Ω to 1MΩ. ±5% tolerance.',
    price: 179,
    iconKey: 'Resistors',
  },
  {
    id: 8,
    name: 'SMD Resistor 0402 Kit',
    category: 'Resistors',
    description: '0402 SMD resistors, 170 values × 25pcs each. Essential for PCB prototyping.',
    price: 420,
    iconKey: 'Resistors',
  },

  // ── Sensors ──
  {
    id: 9,
    name: 'DHT22 Temp & Humidity Sensor',
    category: 'Sensors',
    description: 'Calibrated digital sensor with ±0.5°C accuracy. Long cable length support.',
    price: 210,
    iconKey: 'Sensors',
  },
  {
    id: 10,
    name: 'HC-SR04 Ultrasonic Module',
    category: 'Sensors',
    description: 'Distance sensing 2cm–400cm range with 3mm accuracy. 5V logic, 15° beam angle.',
    price: 95,
    iconKey: 'Sensors',
  },
  {
    id: 11,
    name: 'MPU6050 IMU Module',
    category: 'Sensors',
    description: '6-axis accelerometer + gyroscope over I2C. Gyro range ±2000°/s.',
    price: 135,
    iconKey: 'Sensors',
  },
  {
    id: 12,
    name: 'MQ-135 Air Quality Sensor',
    category: 'Sensors',
    description: 'Detects CO2, NH3, NOx and other air pollutants. Analog & digital output.',
    price: 165,
    iconKey: 'Sensors',
  },
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */

let cart = [];          // { product, quantity }
let activeFilter = 'all';
let searchQuery = '';

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
══════════════════════════════════════════════════════════════ */

/**
 * Shows an animated toast notification.
 * @param {string} message  – Text to display
 * @param {'success'|'error'|'info'} type – Colour variant
 * @param {number} duration – Auto-dismiss in ms
 */
function showToast(message, type = 'success', duration = 3200) {
  const container = document.getElementById('toast-container');

  // Icon SVG per type
  const icons = {
    success: `<svg class="toast-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" stroke="#4f46e5" stroke-width="1.5"/>
                <path d="M6 10l3 3 5-5" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
    error: `<svg class="toast-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" stroke="#ff4d6d" stroke-width="1.5"/>
                <line x1="7" y1="7" x2="13" y2="13" stroke="#ff4d6d" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="13" y1="7" x2="7" y2="13" stroke="#ff4d6d" stroke-width="1.5" stroke-linecap="round"/>
              </svg>`,
    info: `<svg class="toast-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" stroke="#06b6d4" stroke-width="1.5"/>
                <line x1="10" y1="9" x2="10" y2="14" stroke="#06b6d4" stroke-width="2" stroke-linecap="round"/>
                <circle cx="10" cy="6.5" r="1" fill="#06b6d4"/>
              </svg>`,
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
  container.appendChild(toast);

  // Auto dismiss
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

/** Returns the total number of items in the cart (summed quantity). */
function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/** Returns the total price of the cart. */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/** Adds a product to the cart or increments quantity. */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCartUI();
  showToast(`${product.name} added to cart!`, 'success');
}

/** Increases quantity of a cart item. */
function increaseQty(productId) {
  const item = cart.find(i => i.product.id === productId);
  if (item) { item.quantity++; updateCartUI(); }
}

/** Decreases quantity of a cart item; removes if reaches 0. */
function decreaseQty(productId) {
  const idx = cart.findIndex(i => i.product.id === productId);
  if (idx === -1) return;
  cart[idx].quantity--;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  updateCartUI();
}

/** Removes a cart item entirely. */
function removeFromCart(productId) {
  cart = cart.filter(i => i.product.id !== productId);
  updateCartUI();
}

/** Re-renders the entire cart sidebar and badge. */
function updateCartUI() {
  // Badge
  const badge = document.getElementById('cart-count');
  const count = getCartItemCount();
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);

  // Sidebar items
  const container = document.getElementById('cart-items-container');
  const emptyMsg = document.getElementById('cart-empty-msg');

  if (cart.length === 0) {
    emptyMsg.style.display = 'flex';
    // Remove any rendered items except the empty msg
    Array.from(container.querySelectorAll('.cart-item')).forEach(el => el.remove());
  } else {
    emptyMsg.style.display = 'none';

    // Remove old items
    Array.from(container.querySelectorAll('.cart-item')).forEach(el => el.remove());

    // Re-render
    cart.forEach(({ product, quantity }) => {
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.dataset.id = product.id;
      item.innerHTML = `
        <div class="cart-item-icon">
          ${SVG_ICONS[product.iconKey] || SVG_ICONS['Sensors']}
        </div>
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">₹${(product.price * quantity).toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="dec" data-id="${product.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${quantity}</span>
          <button class="qty-btn" data-action="inc" data-id="${product.id}" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-item-btn" data-id="${product.id}" aria-label="Remove ${product.name} from cart">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;
      container.appendChild(item);
    });
  }

  // Total
  document.getElementById('cart-total').textContent = `₹${getCartTotal().toFixed(2)}`;
}

/* ── Cart sidebar open/close ── */
function openCart() {
  document.getElementById('cart-sidebar').classList.add('is-open');
  document.getElementById('cart-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('is-open');
  document.getElementById('cart-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════════
   PRODUCT RENDERING & FILTERING
══════════════════════════════════════════════════════════════ */

/**
 * Returns filtered product list based on active category and search query.
 */
function getFilteredProducts() {
  const q = searchQuery.trim().toLowerCase();
  return PRODUCTS.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = !q ||
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

/** Renders the product grid with 3D tilt cards. */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  const noResultsMsg = document.getElementById('no-results-msg');
  const filtered = getFilteredProducts();

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResultsMsg.classList.remove('hidden');
    return;
  }

  noResultsMsg.classList.add('hidden');

  filtered.forEach((product, idx) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.style.animationDelay = `${idx * 0.07}s`;
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="product-card-img">
        ${SVG_ICONS[product.iconKey] || SVG_ICONS['Sensors']}
      </div>
      <span class="product-category-badge">${product.category}</span>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">₹${product.price.toFixed(2)}</span>
        <button
          class="add-to-cart-btn"
          data-product-id="${product.id}"
          id="add-cart-${product.id}"
          aria-label="Add ${product.name} to cart"
        >Add to Cart</button>
      </div>
    `;

    // Attach 3D tilt listeners
    attach3DTilt(card);
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════════════
   3D CARD TILT EFFECT
══════════════════════════════════════════════════════════════ */

/**
 * Attaches mousemove-based CSS 3D transform tilt to a card element.
 * @param {HTMLElement} card
 */
function attach3DTilt(card) {
  const MAX_TILT = 14; // degrees
  const SHINE = true;

  // Create shine overlay
  let shine = null;
  if (SHINE) {
    shine = document.createElement('div');
    shine.style.cssText = `
      position: absolute; inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 70%);
      opacity: 0;
      transition: opacity 0.2s;
    `;
    card.appendChild(shine);
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2); // -1 to +1
    const dy = (e.clientY - centerY) / (rect.height / 2);

    const rotateX = -dy * MAX_TILT;
    const rotateY = dx * MAX_TILT;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;

    if (shine) {
      const shineX = ((e.clientX - rect.left) / rect.width) * 100;
      const shineY = ((e.clientY - rect.top) / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.1), transparent 65%)`;
      shine.style.opacity = '1';
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    if (shine) shine.style.opacity = '0';
  });
}

/* ══════════════════════════════════════════════════════════════
   AUTHENTICATION MODAL
══════════════════════════════════════════════════════════════ */

function openAuthModal() {
  document.getElementById('auth-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('auth-email').focus(), 100);
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION & SCROLL
══════════════════════════════════════════════════════════════ */

/** Adds 'scrolled' class to navbar when page is scrolled down. */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════════════════ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════════════════════════════════ */

function initEventListeners() {
  /* ── Auth Modal ── */
  document.getElementById('signin-btn').addEventListener('click', openAuthModal);

  document.getElementById('close-modal-btn').addEventListener('click', closeAuthModal);

  // Close modal if clicking outside the box
  document.getElementById('auth-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('auth-modal')) closeAuthModal();
  });

  // Auth form submit
  document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!email || !password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    closeAuthModal();
    document.getElementById('auth-form').reset();
    showToast('Logged in successfully! Welcome back.', 'success');
  });

  /* ── Keyboard: Escape closes modals ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
      closeCart();
    }
  });

  /* ── Cart ── */
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('close-cart-btn').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);

  // Cart item interactions (event delegation)
  document.getElementById('cart-items-container').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    const removeBtn = e.target.closest('.remove-item-btn');

    if (btn) {
      const id = parseInt(btn.dataset.id, 10);
      if (btn.dataset.action === 'inc') increaseQty(id);
      if (btn.dataset.action === 'dec') decreaseQty(id);
    }

    if (removeBtn) {
      const id = parseInt(removeBtn.dataset.id, 10);
      removeFromCart(id);
    }
  });

  // Checkout
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }
    cart = [];
    updateCartUI();
    closeCart();
    showToast('Order placed successfully! Thank you for shopping with Deo Electronics. 🎉', 'success', 4500);
  });

  /* ── Product Grid (event delegation for "Add to Cart") ── */
  document.getElementById('product-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      const productId = parseInt(btn.dataset.productId, 10);
      addToCart(productId);

      // Visual feedback on button
      btn.textContent = '✓ Added!';
      btn.style.opacity = '0.85';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.opacity = '';
      }, 1200);
    }
  });

  /* ── Category Filters ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.category;
      renderProducts();
    });
  });

  /* ── Search ── */
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();

    // Auto-scroll to products section if not already there
    if (searchQuery.trim()) {
      const section = document.getElementById('products');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.9) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .feature-card').forEach(el => {
    el.classList.add('reveal-up');
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   INITIALISE
══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initEventListeners();
  handleNavbarScroll();
  initScrollReveal();
  setupSmoothScroll();
  console.log('%c🔬 Deo Electronics loaded!', 'color:#4f46e5;font-weight:bold;font-size:14px;');
});