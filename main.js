document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const navList = document.querySelector('.nav-list');
    const headerActions = document.querySelector('.header-actions');

    // Open mobile menu
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu - close button
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

    // Legacy mobile menu toggle for other pages
    if (mobileMenuToggle && navList && !mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            console.log('Mobile menu clicked');
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
