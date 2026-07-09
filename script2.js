// ============================================
// EDENCORE REAL ESTATE CASHBACK — JAVASCRIPT
// ============================================

// ============================================
// DATA
// ============================================

// Standard Tier (35%): 28 SQM per ₦1M
const standardTier = [
    { size: "28 SQM", equity: 1000000, cashback: 1350000 },
    { size: "56 SQM", equity: 2000000, cashback: 2700000 },
    { size: "83 SQM", equity: 3000000, cashback: 4050000 },
    { size: "111 SQM", equity: 4000000, cashback: 5400000 },
    { size: "139 SQM", equity: 5000000, cashback: 6750000 },
    { size: "194 SQM", equity: 7000000, cashback: 9450000 },
    { size: "333 SQM", equity: 12000000, cashback: 16200000 },
    { size: "417 SQM", equity: 15000000, cashback: 20250000 },
    { size: "500 SQM", equity: 20000000, cashback: 27000000 },
    { size: "694 SQM", equity: 25000000, cashback: 33750000 },
    { size: "833 SQM", equity: 30000000, cashback: 40500000 },
    { size: "972 SQM", equity: 35000000, cashback: 47250000 },
    { size: "1,111 SQM", equity: 40000000, cashback: 54000000 },
    { size: "1,250 SQM", equity: 45000000, cashback: 60750000 },
    { size: "1,389 SQM", equity: 50000000, cashback: 67500000 },
    { size: "1,528 SQM", equity: 55000000, cashback: 74250000 },
    { size: "1,667 SQM", equity: 60000000, cashback: 81000000 },
    { size: "1,944 SQM", equity: 70000000, cashback: 94500000 },
    { size: "2,222 SQM", equity: 80000000, cashback: 108000000 },
    { size: "2,500 SQM", equity: 90000000, cashback: 121500000 },
    { size: "2,778 SQM", equity: 100000000, cashback: 135000000 }
];

// Premium Tier (37%): 2,778 SQM per ₦101M
const premiumTier = [
    { size: "2,778 SQM", equity: 101000000, cashback: 138370000 },
    { size: "5,556 SQM", equity: 200000000, cashback: 274000000 },
    { size: "8,334 SQM", equity: 300000000, cashback: 411000000 },
    { size: "11,112 SQM", equity: 400000000, cashback: 548000000 },
    { size: "13,890 SQM", equity: 500000000, cashback: 685000000 },
    { size: "16,668 SQM", equity: 600000000, cashback: 822000000 },
    { size: "19,446 SQM", equity: 700000000, cashback: 959000000 },
    { size: "22,224 SQM", equity: 800000000, cashback: 1096000000 },
    { size: "25,002 SQM", equity: 900000000, cashback: 1233000000 },
    { size: "27,780 SQM", equity: 1000000000, cashback: 1370000000 }
];

// Client Incentives
const incentives = [
    { threshold: 30000000, reward: "Standing Rechargeable Fan", icon: "fa-fan" },
    { threshold: 60000000, reward: "Table Top Fridge", icon: "fa-snowflake" },
    { threshold: 90000000, reward: "45 Inches TV", icon: "fa-tv" },
    { threshold: 120000000, reward: "55 Inches TV", icon: "fa-tv" },
    { threshold: 150000000, reward: "Double Door Fridge", icon: "fa-snowflake" },
    { threshold: 180000000, reward: "Samsung Fold 5", icon: "fa-mobile-screen" },
    { threshold: 230000000, reward: "Samsung Fold 6", icon: "fa-mobile-screen" },
    { threshold: 270000000, reward: "iPhone 15 Pro Max", icon: "fa-mobile-screen-button" },
    { threshold: 300000000, reward: "iPhone 16 Pro Max", icon: "fa-mobile-screen-button" }
];

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// UTILITIES
// ============================================
function formatCurrency(num) {
    return '₦' + num.toLocaleString('en-NG');
}

function formatNumber(num) {
    return num.toLocaleString('en-NG');
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
    const targetDate = new Date('2026-07-31T23:59:59').getTime();

    function update() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ============================================
// NAVBAR SCROLL
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE NAV
// ============================================
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL + ACTIVE LINK
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offset = navbar.offsetHeight + (document.getElementById('countdownBanner')?.offsetHeight || 0);
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

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
// RENDER TIER TABLES
// ============================================
function renderTierTable(data, tbodyId) {
    const tbody = document.getElementById(tbodyId);
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.size}</td>
            <td>${formatCurrency(row.equity)}</td>
            <td>${formatCurrency(row.cashback)}</td>
        </tr>
    `).join('');
}

renderTierTable(standardTier, 'standardTable');
renderTierTable(premiumTier, 'premiumTable');

// ============================================
// RENDER INCENTIVES
// ============================================
function renderIncentives() {
    const grid = document.getElementById('incentivesGrid');
    grid.innerHTML = incentives.map(inv => `
        <div class="incentive-card">
            <div class="incentive-icon"><i class="fas ${inv.icon}"></i></div>
            <div class="incentive-details">
                <h4>${formatCurrency(inv.threshold)}+</h4>
                <p>${inv.reward}</p>
            </div>
        </div>
    `).join('');
}

renderIncentives();

// ============================================
// CALCULATOR
// ============================================
const investmentInput = document.getElementById('investmentAmount');
const presetBtns = document.querySelectorAll('.preset-btn');
const calcSize = document.getElementById('calcSize');
const calcRate = document.getElementById('calcRate');
const calcProfit = document.getElementById('calcProfit');
const calcTotal = document.getElementById('calcTotal');
const incentiveRow = document.getElementById('incentiveRow');
const calcIncentive = document.getElementById('calcIncentive');

function calculateReturns(amount) {
    if (!amount || amount < 1000000) {
        calcSize.textContent = '—';
        calcRate.textContent = '—';
        calcProfit.textContent = '—';
        calcTotal.textContent = '—';
        incentiveRow.style.display = 'none';
        return;
    }

    let rate, size, profit, total;

    if (amount >= 101000000) {
        // Premium tier (37%)
        rate = 37;
        // Find closest premium tier for size reference
        const closest = premiumTier.reduce((prev, curr) => 
            Math.abs(curr.equity - amount) < Math.abs(prev.equity - amount) ? curr : prev
        );
        size = closest.size;
        profit = Math.round(amount * 0.37);
    } else {
        // Standard tier (35%)
        rate = 35;
        const closest = standardTier.reduce((prev, curr) => 
            Math.abs(curr.equity - amount) < Math.abs(prev.equity - amount) ? curr : prev
        );
        size = closest.size;
        profit = Math.round(amount * 0.35);
    }

    total = amount + profit;

    // Check incentive
    const earnedIncentive = incentives
        .filter(inv => amount >= inv.threshold)
        .pop();

    calcSize.textContent = size;
    calcRate.textContent = rate + '% per annum';
    calcProfit.textContent = formatCurrency(profit);
    calcTotal.textContent = formatCurrency(total);

    if (earnedIncentive) {
        incentiveRow.style.display = 'flex';
        calcIncentive.textContent = earnedIncentive.reward;
    } else {
        incentiveRow.style.display = 'none';
    }
}

investmentInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value) || 0;
    calculateReturns(val);

    // Update preset buttons
    presetBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.value) === val);
    });
});

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.value);
        investmentInput.value = val;
        calculateReturns(val);

        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ============================================
// INVESTMENT FORM
// ============================================
const investForm = document.getElementById('investForm');

investForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('invName').value;
    const phone = document.getElementById('invPhone').value;
    const amount = document.getElementById('invAmount').value;
    const type = document.getElementById('invType').value;
    const message = document.getElementById('invMessage').value;

    // Build WhatsApp message
    const amountText = amount === 'other' ? 'Above ₦100M' : formatCurrency(parseInt(amount));
    const typeText = type === 'rollover' ? 'Rollover (Existing Partner)' : 'New Investment';

    const text = `Hi EdenCore!%0A%0A` +
        `*New Investment Inquiry*%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Amount: ${encodeURIComponent(amountText)}%0A` +
        `Type: ${encodeURIComponent(typeText)}%0A` +
        (message ? `Message: ${encodeURIComponent(message)}` : '');

    // Open WhatsApp
    window.open(`https://wa.me/2348149904981?text=${text}`, '_blank');

    showToast('Opening WhatsApp... Send us your inquiry!');
    investForm.reset();
});

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.step-card, .tier-card, .incentive-card, .trust-card, .section-header, .calculator-wrapper, .invest-wrapper, .rollover-banner'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScrollReveal();

    // Set default calculator value
    investmentInput.value = 5000000;
    calculateReturns(5000000);
    presetBtns.forEach(btn => {
        if (parseInt(btn.dataset.value) === 5000000) btn.classList.add('active');
    });
});