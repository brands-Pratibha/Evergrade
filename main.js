document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const headerActions = document.querySelector('.header-actions');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            // Basic mobile menu toggle logic
            navList.classList.toggle('active'); // Assumption: CSS handles .active
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
});
