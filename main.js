document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation - Dynamic Injection
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    let mobileNav = document.getElementById('mobileNav');

    // If there's a toggle button but no mobile nav drawer, inject one
    if (mobileMenuToggle && !mobileNav) {
        // Build nav links from existing desktop nav
        const desktopNav = document.querySelector('.main-nav .nav-list') || document.querySelector('.hero-nav');
        let linksHTML = '';
        let currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Default nav links
        const navItems = [
            { href: 'index.html', label: 'Home' },
            { href: 'exports.html', label: 'Exports' },
            { href: 'imports.html', label: 'Imports' },
            { href: 'services.html', label: 'Services' },
            { href: 'how-it-works.html', label: 'How It Works' },
            { href: 'about.html', label: 'About' },
            { href: 'resources.html', label: 'Resources' },
            { href: 'contact.html', label: 'Contact' }
        ];

        navItems.forEach(item => {
            const isActive = currentPage === item.href ? ' class="active"' : '';
            linksHTML += `<a href="${item.href}"${isActive}>${item.label}</a>\n`;
        });

        const mobileNavHTML = `
        <nav class="mobile-nav" id="mobileNav">
            <div class="mobile-nav-content">
                <div class="mobile-nav-header">
                    <a href="index.html" class="logo">
                        <img src="assets/logo.svg" alt="Evergrade" class="logo-img">
                    </a>
                    <button class="mobile-nav-close" aria-label="Close mobile menu">&times;</button>
                </div>
                <div class="mobile-nav-links">
                    ${linksHTML}
                </div>
                <div class="mobile-nav-cta">
                    <button class="btn btn-primary trigger-auth-login" onclick="window.openAuthModal && window.openAuthModal('login')">Log In</button>
                </div>
            </div>
        </nav>`;

        document.body.insertAdjacentHTML('afterbegin', mobileNavHTML);
        mobileNav = document.getElementById('mobileNav');
    }

    // Open mobile menu
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu - close button
    const mobileNavClose = mobileNav ? mobileNav.querySelector('.mobile-nav-close') : null;
    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu - click outside
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;

            // Toggle current item
            const isActive = item.classList.contains('active');

            // Optional: Close others (accordion style)
            // document.querySelectorAll('.faq-item').forEach(otherItem => {
            //     otherItem.classList.remove('active');
            // });

            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Contact Form Toggle Logic
    const formToggles = document.querySelectorAll('.form-toggle-btn');
    const dynamicLabel = document.getElementById('dynamic-label');
    const dynamicInput = document.getElementById('dynamic-input');
    const dynamicContainer = document.getElementById('dynamic-field-container');

    const formConfig = {
        buyer: {
            label: 'Product/Service Interest *',
            placeholder: 'e.g., Agricultural Products, Textiles, etc.'
        },
        seller: {
            label: 'Product/Service Offered *',
            placeholder: 'e.g., Organic Rice, Cotton Textiles, etc.'
        },
        consultant: {
            label: 'Service Required *',
            placeholder: 'e.g., Market Research, Supply Chain Optimization'
        }
    };

    if (formToggles.length > 0 && dynamicLabel && dynamicInput) {
        formToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                formToggles.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');

                // Update dynamic field with fade effect
                const type = btn.dataset.type;
                if (formConfig[type]) {
                    if (dynamicContainer) {
                        dynamicContainer.style.opacity = '0';
                        dynamicContainer.style.transition = 'opacity 0.2s';
                    }

                    setTimeout(() => {
                        dynamicLabel.textContent = formConfig[type].label;
                        dynamicInput.placeholder = formConfig[type].placeholder;
                        if (dynamicContainer) dynamicContainer.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }
    // Homepage Search Logic
    const heroSearchInput = document.querySelector('.hero-search-input');
    const heroSearchBtn = document.querySelector('.hero-search-btn');

    if (heroSearchInput && heroSearchBtn) {
        const handleSearch = () => {
            const query = heroSearchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        };

        heroSearchBtn.addEventListener('click', handleSearch);
        heroSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Hero Role Pill Buttons - Auth-Gated Navigation
    const rolePillBtns = document.querySelectorAll('.role-pill-btn');
    rolePillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('mockAuthUser'));
            if (user) {
                // User is logged in → go to dashboard
                window.location.href = 'seller-dashboard.html';
            } else {
                // Not logged in → open login modal
                if (window.openAuthModal) {
                    window.openAuthModal('login');
                }
            }
        });
    });

    // Welcome Overlay Logic for First-Time Visitors
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const welcomeCloseBtn = document.getElementById('welcomeCloseBtn');
    const welcomeSkipBtn = document.getElementById('welcomeSkipBtn');
    const welcomeContinueBtn = document.getElementById('welcomeContinueBtn');
    const welcomeRoleCards = document.querySelectorAll('.welcome-role-card');

    // Check if user has already seen the welcome overlay
    const hasSeenWelcome = localStorage.getItem('evergadeWelcomeSeen');

    if (welcomeOverlay && !hasSeenWelcome) {
        // Show overlay after 40 seconds
        setTimeout(() => {
            welcomeOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 40000);

        // Close overlay function
        const closeWelcomeOverlay = () => {
            welcomeOverlay.classList.remove('active');
            document.body.style.overflow = '';
            localStorage.setItem('evergadeWelcomeSeen', 'true');
        };

        // Close button click
        if (welcomeCloseBtn) {
            welcomeCloseBtn.addEventListener('click', closeWelcomeOverlay);
        }

        // Skip button click
        if (welcomeSkipBtn) {
            welcomeSkipBtn.addEventListener('click', closeWelcomeOverlay);
        }

        // Continue button click
        if (welcomeContinueBtn) {
            welcomeContinueBtn.addEventListener('click', closeWelcomeOverlay);
        }

        // Role card selection
        welcomeRoleCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                welcomeRoleCards.forEach(c => c.classList.remove('selected'));
                // Add active class to clicked card
                card.classList.add('selected');

                // Store selected role
                const role = card.dataset.role;
                localStorage.setItem('evergadeUserRole', role);
            });
        });

        // Close overlay on background click
        welcomeOverlay.addEventListener('click', (e) => {
            if (e.target === welcomeOverlay) {
                closeWelcomeOverlay();
            }
        });
    }
});
