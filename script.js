// ============================================
// EDENCORE PROPERTIES — JAVASCRIPT
// ============================================

// Sample Land Listings Data
const listingsData = [
    {
        id: 1,
        title: "Prime Residential Plot — Lekki Phase 2",
        location: "Lekki, Lagos",
        price: "₦15,000,000",
        size: "600 sqm",
        type: "residential",
        status: "Available",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
        description: "Beautiful residential plot in the heart of Lekki Phase 2. Perfect for building your dream home with 24/7 power supply, good road network, and proximity to major landmarks.",
        features: ["Gated Estate", "C of O", "Perimeter Fencing", "Water Supply"]
    },
    {
        id: 2,
        title: "Commercial Land — Ikeja Business District",
        location: "Ikeja, Lagos",
        price: "₦45,000,000",
        size: "1,200 sqm",
        type: "commercial",
        status: "Available",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
        description: "Strategically located commercial land in Ikeja's bustling business district. Ideal for office complex, shopping plaza, or mixed-use development.",
        features: ["Strategic Location", "Governor's Consent", "Main Road Frontage", "High ROI"]
    },
    {
        id: 3,
        title: "Agricultural Farmland — Ogun State",
        location: "Abeokuta, Ogun",
        price: "₦3,500,000",
        size: "5 Acres",
        type: "agricultural",
        status: "Available",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
        description: "Fertile agricultural land with access to water source. Suitable for crop farming, poultry, or fish farming. Located in a peaceful rural setting with good access road.",
        features: ["Water Access", "Survey Plan", "Fertile Soil", "Accessible Road"]
    },
    {
        id: 4,
        title: "Estate Plot — Epe New Town",
        location: "Epe, Lagos",
        price: "₦8,000,000",
        size: "500 sqm",
        type: "residential",
        status: "Available",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop",
        description: "Premium estate plot in the fast-developing Epe axis. Close to the proposed Lekki-Epe International Airport and Dangote Refinery. High appreciation potential.",
        features: ["Estate Layout", "Deed of Assignment", "Street Light", "Drainage"]
    },
    {
        id: 5,
        title: "Beachfront Land — Badagry",
        location: "Badagry, Lagos",
        price: "₦25,000,000",
        size: "2,000 sqm",
        type: "commercial",
        status: "Available",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        description: "Exclusive beachfront land with breathtaking ocean views. Perfect for resort development, beach houses, or tourism-related projects.",
        features: ["Ocean View", "Excision", "Beach Access", "Tourism Zone"]
    },
    {
        id: 6,
        title: "Mixed-Use Land — Ibadan Expressway",
        location: "Ibadan, Oyo",
        price: "₦12,000,000",
        size: "1,000 sqm",
        type: "residential",
        status: "Available",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop",
        description: "Versatile mixed-use land along the Lagos-Ibadan Expressway. Suitable for residential, commercial, or industrial development. Excellent road access.",
        features: ["Expressway Frontage", "C of O", "Flat Terrain", "Developed Area"]
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const listingsGrid = document.getElementById('listingsGrid');
const searchBtn = document.getElementById('searchBtn');
const searchLocation = document.getElementById('searchLocation');
const searchType = document.getElementById('searchType');
const searchPrice = document.getElementById('searchPrice');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const listingModal = document.getElementById('listingModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL + ACTIVE NAV LINK
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offset = 80;
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// RENDER LISTINGS
// ============================================
function renderListings(listings) {
    listingsGrid.innerHTML = listings.map(listing => `
        <div class="listing-card" data-id="${listing.id}" onclick="openModal(${listing.id})">
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.title}" loading="lazy">
                <span class="listing-badge badge-${listing.type}">${listing.type}</span>
                <span class="listing-price">${listing.price}</span>
            </div>
            <div class="listing-content">
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${listing.location}</span>
                </div>
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-meta">
                    <div class="meta-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${listing.size}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-file-shield"></i>
                        <span>${listing.features[0]}</span>
                    </div>
                </div>
                <div class="listing-footer">
                    <div class="listing-status">
                        <span class="status-dot"></span>
                        <span>${listing.status}</span>
                    </div>
                    <span class="listing-btn">
                        View Details <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Initial render
renderListings(listingsData);

// ============================================
// SEARCH / FILTER
// ============================================
function filterListings() {
    const locationQuery = searchLocation.value.toLowerCase();
    const typeQuery = searchType.value;
    const priceQuery = searchPrice.value;

    let filtered = listingsData.filter(listing => {
        // Location filter
        const matchLocation = !locationQuery || 
            listing.location.toLowerCase().includes(locationQuery) ||
            listing.title.toLowerCase().includes(locationQuery);

        // Type filter
        const matchType = typeQuery === 'all' || listing.type === typeQuery;

        // Price filter
        let matchPrice = true;
        const priceNum = parseInt(listing.price.replace(/[^0-9]/g, ''));
        if (priceQuery === 'low') matchPrice = priceNum < 5000000;
        else if (priceQuery === 'mid') matchPrice = priceNum >= 5000000 && priceNum < 20000000;
        else if (priceQuery === 'high') matchPrice = priceNum >= 20000000;

        return matchLocation && matchType && matchPrice;
    });

    renderListings(filtered);

    // Show toast if no results
    if (filtered.length === 0) {
        showToast('No listings match your search. Try different filters.');
    }
}

searchBtn.addEventListener('click', filterListings);
searchLocation.addEventListener('input', debounce(filterListings, 300));
searchType.addEventListener('change', filterListings);
searchPrice.addEventListener('change', filterListings);

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// MODAL
// ============================================
window.openModal = function(id) {
    const listing = listingsData.find(l => l.id === id);
    if (!listing) return;

    modalBody.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}" class="modal-image">
        <div class="modal-details">
            <span class="listing-badge badge-${listing.type}" style="margin-bottom:12px;display:inline-block;">${listing.type}</span>
            <h2>${listing.title}</h2>
            <div class="modal-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${listing.location}</span>
            </div>
            <div class="modal-price">${listing.price}</div>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <span>Size</span>
                    <strong>${listing.size}</strong>
                </div>
                <div class="modal-meta-item">
                    <span>Type</span>
                    <strong style="text-transform:capitalize;">${listing.type}</strong>
                </div>
                <div class="modal-meta-item">
                    <span>Status</span>
                    <strong style="color:var(--light-green);">${listing.status}</strong>
                </div>
            </div>
            <p class="modal-description">${listing.description}</p>
            <div style="margin-bottom:24px;">
                <h4 style="font-size:1rem;margin-bottom:12px;color:var(--gray-800);">Key Features</h4>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    ${listing.features.map(f => `<span style="background:var(--gray-50);padding:8px 16px;border-radius:50px;font-size:0.85rem;color:var(--gray-600);border:1px solid var(--gray-100);">${f}</span>`).join('')}
                </div>
            </div>
            <div class="modal-actions">
                <a href="tel:08149904981" class="btn btn-primary">
                    <i class="fas fa-phone"></i> Call Now
                </a>
                <a href="https://wa.me/2348149904981?text=Hi%20EdenCore,%20I'm%20interested%20in%20the%20${encodeURIComponent(listing.title)}" target="_blank" class="btn btn-outline">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="mailto:info@edencoreproperties.com?subject=Inquiry%20about%20${encodeURIComponent(listing.title)}" class="btn btn-outline">
                    <i class="fas fa-envelope"></i> Email
                </a>
            </div>
        </div>
    `;

    listingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

modalClose.addEventListener('click', closeModal);
listingModal.addEventListener('click', (e) => {
    if (e.target === listingModal) closeModal();
});

function closeModal() {
    listingModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ============================================
// CONTACT FORM
// ============================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Message sent! We will contact you shortly.');
    }, 1500);
});

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.listing-card, .feature-card, .section-header, .contact-wrapper, .cta-content');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// LOAD MORE BUTTON
// ============================================
loadMoreBtn.addEventListener('click', () => {
    showToast('More listings coming soon! Contact us for exclusive off-market plots.');
});

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

// ============================================
// UTILITY: Format Currency
// ============================================
function formatCurrency(amount) {
    return '₦' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================
// UTILITY: Copy to Clipboard
// ============================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy. Please try manually.');
    });
}