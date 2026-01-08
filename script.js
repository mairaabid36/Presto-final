// Drink data
const drinks = {
    'milk-tea': {
        name: 'Milk Bubble Tea',
        basePrice: 650
    },
    'mango-bubble-tea': {
        name: 'Mango Bubble Tea',
        basePrice: 750
    },
    'chocolate-bubble-tea': {
        name: 'Chocolate Bubble Tea',
        basePrice: 750
    },
    'strawberry-bubble-tea': {
        name: 'Strawberry Bubble Tea',
        basePrice: 750
    }
};

// Add-ons data
const addons = {
    'ice-topping': { name: 'Ice Topping', price: 50 },
    'extra-sugar': { name: 'Extra Sugar', price: 20 },
    'extra-milk': { name: 'Extra Milk', price: 50 }
};

// State management
let selectedDrink = null;
let selectedAddons = {
    'ice-topping': false,
    'extra-sugar': false,
    'extra-milk': false
};

// Google Apps Script Web App URL (User will update this)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzS9fvFfBbJvB_8GMq-uQR099cgpvHxY0d7-BWCKBPGEab1DAHn70MUm-N3n-GsQl1w/exec';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    initializeAnimations();
    initializeAddons();
    initializeNavigation();
    createSectionBubbles();
    initializeCheckout();
    initializeDrinkModal();
    initializeOrderForm();
});

// Create floating bubbles
function createBubbles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const colors = [
        'rgba(255, 107, 157, 0.3)',
        'rgba(255, 179, 71, 0.3)',
        'rgba(255, 230, 109, 0.3)',
        'rgba(168, 230, 207, 0.3)'
    ];

    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 10 + 10) + 's';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
        hero.appendChild(bubble);
    }
}

// Create sparkles
function createSparkles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        hero.appendChild(sparkle);
    }
}

// Create bubbles for sections
function createSectionBubbles() {
    const sections = document.querySelectorAll('.section-bubbles, .footer-bubbles');
    const colors = [
        'rgba(255, 255, 255, 0.15)',
        'rgba(255, 107, 157, 0.2)',
        'rgba(255, 179, 71, 0.2)',
        'rgba(255, 230, 109, 0.2)',
        'rgba(168, 230, 207, 0.2)',
        'rgba(199, 206, 234, 0.2)'
    ];

    sections.forEach(section => {
        // Create fewer bubbles for performance
        const bubbleCount = section.classList.contains('footer-bubbles') ? 15 : 20;

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'section-bubble';
            const size = Math.random() * 40 + 15;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = (Math.random() * 15 + 20) + 's';
            bubble.style.animationDelay = Math.random() * 5 + 's';
            bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
            section.appendChild(bubble);
        }
    });
}

// Initialize animations
function initializeAnimations() {
    createBubbles();
    createSparkles();

    // Scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe drink cards with stagger
    const drinkCards = document.querySelectorAll('.drink-card');
    drinkCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    // Observe location container
    const locationContainer = document.querySelector('.location-container');
    if (locationContainer) {
        observer.observe(locationContainer);
    }

    // Observe addons container
    const addonsContainer = document.querySelector('.addons-container');
    if (addonsContainer) {
        observer.observe(addonsContainer);
    }

    // Smooth scroll on arrow click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('drinks').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Initialize add-ons functionality
function initializeAddons() {
    const drinkSelect = document.getElementById('drink-select');
    const addonsOptions = document.getElementById('addons-options');
    const priceSummary = document.getElementById('price-summary');
    const checkboxes = document.querySelectorAll('.addon-checkbox input[type="checkbox"]');

    // Handle drink selection
    if (drinkSelect) {
        drinkSelect.addEventListener('change', (e) => {
            const selectedValue = e.target.value;

            if (selectedValue) {
                selectedDrink = selectedValue;
                const option = e.target.options[e.target.selectedIndex];
                const basePrice = parseInt(option.getAttribute('data-base-price'));

                // Show add-ons options
                if (addonsOptions) {
                    addonsOptions.style.display = 'block';
                    addonsOptions.style.animation = 'slideUp 0.5s ease';
                }

                // Reset add-ons
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    selectedAddons[checkbox.id] = false;
                });

                // Update price summary
                updatePriceSummary();
            } else {
                selectedDrink = null;
                if (addonsOptions) {
                    addonsOptions.style.display = 'none';
                }
                if (priceSummary) {
                    priceSummary.style.display = 'none';
                }
            }
        });
    }

    // Handle add-on checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const addonId = e.target.id;
            selectedAddons[addonId] = e.target.checked;
            updatePriceSummary();
        });
    });
}

// Update price summary
function updatePriceSummary() {
    if (!selectedDrink) {
        const priceSummary = document.getElementById('price-summary');
        if (priceSummary) {
            priceSummary.style.display = 'none';
        }
        return;
    }

    const drink = drinks[selectedDrink];
    if (!drink) return;

    let total = drink.basePrice;
    const selectedAddonsList = [];
    const summaryDetails = document.getElementById('summary-details');
    const totalAmount = document.getElementById('total-amount');
    const priceSummary = document.getElementById('price-summary');

    // Build summary
    let summaryHTML = `<div>${drink.name} - ${drink.basePrice} PKR</div>`;

    // Add selected add-ons
    Object.keys(selectedAddons).forEach(addonId => {
        if (selectedAddons[addonId]) {
            const addon = addons[addonId];
            total += addon.price;
            selectedAddonsList.push(addon.name);
            summaryHTML += `<div>+ ${addon.name} - ${addon.price} PKR</div>`;
        }
    });

    // Update summary details
    if (summaryDetails) {
        summaryDetails.innerHTML = summaryHTML;
    }

    // Update total
    if (totalAmount) {
        totalAmount.textContent = total;
    }

    // Show price summary
    if (priceSummary) {
        priceSummary.style.display = 'block';
    }
}

// Initialize navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const scrollProgress = document.getElementById('scroll-progress');

    // Navbar scroll effect (transparent to semi-transparent)
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Scroll progress indicator
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }
    }

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state on scroll and handle navbar appearance
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateScrollProgress();

        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar.offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Initial call
    handleNavbarScroll();
    updateScrollProgress();
}

// Initialize Order Form
function initializeOrderForm() {
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            submitOrder(e);
        });
    }
}

// Initialize Checkout
// Initialize Checkout
function initializeCheckout() {
    const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');
    const proceedBtn = document.getElementById('proceed-checkout');
    const checkoutMessage = document.getElementById('checkout-message');

    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.checked) {
                proceedBtn.disabled = false;
            }
        });
    });

    // Proceed to checkout
    if (proceedBtn) {
        proceedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedPayment = document.querySelector('input[name="payment"]:checked');

            // Validation
            if (!selectedPayment) {
                checkoutMessage.textContent = 'Please select a payment method';
                checkoutMessage.className = 'checkout-message error';
                return;
            }

            const drinkSelect = document.getElementById('drink-select');
            if (!drinkSelect || !drinkSelect.value) {
                checkoutMessage.textContent = 'Please select a drink first';
                checkoutMessage.className = 'checkout-message error';
                setTimeout(() => {
                    document.getElementById('drinks').scrollIntoView({ behavior: 'smooth' });
                }, 1500);
                return;
            }

            // If valid, scroll to order form
            checkoutMessage.textContent = '';
            const orderSection = document.getElementById('account');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Observe checkout container for animations
    const checkoutContainer = document.querySelector('.checkout-container');
    if (checkoutContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        observer.observe(checkoutContainer);
    }

    // Observe account container for animations
    const accountContainer = document.querySelector('.account-container');
    if (accountContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        observer.observe(accountContainer);
    }
}

// Submit Order Function
function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const city = document.getElementById('custCity').value;
    const messageEl = document.getElementById('order-message');

    // Get Order Details
    const drinkSelect = document.getElementById('drink-select');
    if (!drinkSelect || !drinkSelect.value) {
        messageEl.textContent = 'Please select a drink first.';
        messageEl.className = 'auth-message error';
        return;
    }

    const drink = drinks[drinkSelect.value];
    const selectedAddonsList = [];
    let total = drink.basePrice;

    Object.keys(selectedAddons).forEach(addonId => {
        if (selectedAddons[addonId]) {
            const addon = addons[addonId];
            total += addon.price;
            selectedAddonsList.push(addon.name);
        }
    });

    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'Cash';

    // 1. WhatsApp Integration
    let msg = `*--- NEW ORDER ---*%0A%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*City:* ${city}%0A%0A*--- ORDER DETAILS ---*%0A`;
    msg += `▫ ${drink.name} (Rs. ${drink.basePrice})%0A`;

    if (selectedAddonsList.length > 0) {
        msg += `▫ Add-ons: ${selectedAddonsList.join(', ')}%0A`;
    }

    msg += `%0A*Payment:* ${paymentMethod}%0A`;
    msg += `*TOTAL AMOUNT: Rs. ${total.toLocaleString()}*`;
    msg += `%0A%0A📞 Please receive your order or call before receiving the order at this number: 03079960702`;

    window.open(`https://wa.me/923079960702?text=${msg}`, '_blank');

    // 2. Google Sheets Integration
    messageEl.textContent = 'Order placed! Sending details...';
    messageEl.className = 'auth-message success';

    const orderData = {
        date: new Date().toLocaleString(),
        name: name,
        phone: phone,
        city: city,
        items: [drink.name, ...selectedAddonsList],
        total: total,
        payment: paymentMethod
    };

    if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'REPLACE_WITH_YOUR_GOOGLE_SCRIPT_URL') {
        // Using simple fetch with JSON body
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(() => {
                console.log('Order sent to Google Sheets');
            })
            .catch(err => console.error('Error sending to Sheets:', err));
    } else {
        console.warn('Google Script URL not set. Data not saved to Sheets.');
    }

    // Clear form and reset
    setTimeout(() => {
        document.getElementById('orderForm').reset();

        // Reset selections
        drinkSelect.value = '';
        document.getElementById('addons-options').style.display = 'none';
        document.getElementById('price-summary').style.display = 'none';
        document.querySelectorAll('.addon-checkbox input').forEach(cb => cb.checked = false);
        Object.keys(selectedAddons).forEach(key => selectedAddons[key] = false);
        selectedDrink = null;
        document.querySelectorAll('input[name="payment"]').forEach(opt => opt.checked = false);
        document.getElementById('proceed-checkout').disabled = true;

        messageEl.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
}

// Initialize Drink Modal
function initializeDrinkModal() {
    const modal = document.getElementById('drink-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const drinkCards = document.querySelectorAll('.drink-card');
    const drinkInfoBtns = document.querySelectorAll('.drink-info-btn');

    if (!modal) return;

    // Open modal function
    function openModal(card) {
        const drinkName = card.querySelector('.drink-name').textContent;
        const drinkPrice = card.querySelector('.drink-price').textContent;
        const drinkDescription = card.querySelector('.drink-description').textContent;
        const drinkDetail = card.getAttribute('data-detail');
        const drinkImage = card.querySelector('.drink-image').src;

        // Populate modal
        document.getElementById('modal-title').textContent = drinkName;
        document.getElementById('modal-price').textContent = drinkPrice;
        document.getElementById('modal-description').textContent = drinkDescription;
        document.getElementById('modal-detail').textContent = drinkDetail;
        document.getElementById('modal-image').src = drinkImage;
        document.getElementById('modal-image').alt = drinkName;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open modal on card click
    drinkCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open if clicking the button (button has its own handler)
            if (!e.target.classList.contains('drink-info-btn')) {
                openModal(card);
            }
        });
    });

    // Open modal on button click
    drinkInfoBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            const card = btn.closest('.drink-card');
            if (card) {
                openModal(card);
            }
        });
    });

    // Close modal on close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

