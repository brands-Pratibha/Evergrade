// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const searchQuery = urlParams.get('search');

    // Category mapping for display names
    const categoryNames = {
        'steel': 'Steel Products',
        'nonferrous': 'Non Ferrous Metals',
        'polymers': 'Polymers & Plastics',
        'chemicals': 'Chemicals',
        'wood': 'Natural Wood',
        'plywood': 'Plywood & Boards',
        'leather': 'Leather & Leather Goods',
        'grains': 'Grains & Cereals',
        'pulses': 'Pulses & Lentils',
        'grocery': 'Grocery & Spices',
        'agriculture': 'Agriculture',
        'textiles': 'Textiles & Fabrics',
        'engineering': 'Engineering Goods',
        'electronics': 'Electronics',
        'building': 'Building Materials',
        'handicrafts': 'Handicrafts',
        'gems': 'Gems & Jewelry',
        'toys': 'Toys & Games',
        'consumer': 'Consumer Goods'
    };

    // Update page title and breadcrumb based on category
    if (category && categoryNames[category]) {
        const categoryName = categoryNames[category];
        document.getElementById('category-name').textContent = categoryName;
        document.getElementById('listing-title').textContent = categoryName;
        document.title = `${categoryName} - Evergrade`;

        // Check the corresponding category filter
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }

    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsContainer = document.getElementById('products-container');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const view = this.dataset.view;
            if (view === 'list') {
                productsContainer.classList.add('list-view');
            } else {
                productsContainer.classList.remove('list-view');
            }
        });
    });

    // Clear filters functionality
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function () {
            // Uncheck all checkboxes
            document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });

            // Reset radio buttons to default
            const defaultRadio = document.querySelector('input[name="moq"][value="any"]');
            if (defaultRadio) {
                defaultRadio.checked = true;
            }

            // Clear search input
            const searchInput = document.getElementById('search-products');
            if (searchInput) {
                searchInput.value = '';
            }

            // Reset sort to default
            const sortSelect = document.getElementById('sort-by');
            if (sortSelect) {
                sortSelect.value = 'relevance';
            }

            // Reset page title if needed
            document.getElementById('category-name').textContent = 'All Products';
            document.getElementById('listing-title').textContent = 'All Products';
            document.title = 'Products - Evergrade';

            // Reset URL
            window.history.replaceState({}, '', 'products.html');

            // Reapply filters (shows all products)
            applyAllFilters();
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyAllFilters();
            }, 300);
        });
    }

    // Category filter functionality
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            applyAllFilters();
        });
    });

    // Certification filter functionality
    const certificationCheckboxes = document.querySelectorAll('input[name="certification"]');
    certificationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            applyAllFilters();
        });
    });

    // Rating filter functionality
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            applyAllFilters();
        });
    });

    // MOQ filter functionality
    const moqRadios = document.querySelectorAll('input[name="moq"]');
    moqRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            applyAllFilters();
        });
    });

    // Get selected categories
    function getSelectedCategories() {
        const checked = document.querySelectorAll('input[name="category"]:checked');
        return Array.from(checked).map(cb => cb.value);
    }

    // Get selected certifications
    function getSelectedCertifications() {
        const checked = document.querySelectorAll('input[name="certification"]:checked');
        return Array.from(checked).map(cb => cb.value.toLowerCase());
    }

    // Get selected ratings
    function getSelectedRatings() {
        const checked = document.querySelectorAll('input[name="rating"]:checked');
        return Array.from(checked).map(cb => parseFloat(cb.value));
    }

    // Get selected MOQ
    function getSelectedMOQ() {
        const selected = document.querySelector('input[name="moq"]:checked');
        return selected ? selected.value : 'any';
    }

    // Parse rating from card
    function getRating(card) {
        const ratingEl = card.querySelector('.supplier-rating');
        if (ratingEl) {
            const text = ratingEl.textContent;
            const match = text.match(/[\d.]+/);
            return match ? parseFloat(match[0]) : 0;
        }
        return 0;
    }

    // Parse MOQ value from card for filtering
    function getMOQValue(card) {
        const moqSpec = card.querySelector('.spec-row .spec-value');
        if (moqSpec) {
            const text = moqSpec.textContent;
            const match = text.match(/[\d,]+/);
            if (match) {
                return parseInt(match[0].replace(',', ''));
            }
        }
        return 0;
    }

    // Combined filter function for search and categories
    function applyAllFilters() {
        const searchInput = document.getElementById('search-products');
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedCategories = getSelectedCategories();
        const selectedCertifications = getSelectedCertifications();
        const selectedRatings = getSelectedRatings();
        const selectedMOQ = getSelectedMOQ();

        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const supplier = card.querySelector('.supplier-name').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            const cardCategory = card.dataset.category || '';
            const cardRating = getRating(card);
            const cardMOQ = getMOQValue(card);

            // Check if matches search query
            const matchesQuery = !query ||
                title.includes(query) ||
                supplier.includes(query) ||
                tags.some(tag => tag.includes(query));

            // Check if matches selected categories (if any selected)
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.includes(cardCategory);

            // Check if matches certifications
            const matchesCertifications = selectedCertifications.length === 0 ||
                selectedCertifications.some(cert => tags.some(tag => tag.includes(cert)));

            // Check if matches rating filter
            const matchesRating = selectedRatings.length === 0 ||
                selectedRatings.some(rating => cardRating >= rating);

            // Check if matches MOQ filter
            let matchesMOQ = true;
            if (selectedMOQ !== 'any') {
                if (selectedMOQ === 'low' && cardMOQ >= 100) matchesMOQ = false;
                if (selectedMOQ === 'medium' && (cardMOQ < 100 || cardMOQ > 500)) matchesMOQ = false;
                if (selectedMOQ === 'high' && cardMOQ <= 500) matchesMOQ = false;
            }

            if (matchesQuery && matchesCategory && matchesCertifications && matchesRating && matchesMOQ) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update product count
        document.getElementById('product-count').textContent = visibleCount;

        // Apply current sort
        const sortSelect = document.getElementById('sort-by');
        if (sortSelect) {
            sortProducts(sortSelect.value);
        }
    }

    // Sort functionality
    function sortProducts(sortBy) {
        const container = document.getElementById('products-container');
        const cards = Array.from(container.querySelectorAll('.product-card'));

        cards.sort((a, b) => {
            const ratingA = getRating(a);
            const ratingB = getRating(b);
            const moqA = getMOQValue(a);
            const moqB = getMOQValue(b);

            switch (sortBy) {
                case 'rating-high':
                    return ratingB - ratingA;
                case 'rating-low':
                    return ratingA - ratingB;
                case 'moq-low':
                    return moqA - moqB;
                case 'moq-high':
                    return moqB - moqA;
                case 'newest':
                    // For demo purposes, just reverse the current order
                    return 0;
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        cards.forEach(card => container.appendChild(card));
    }

    // Sort select handler
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            sortProducts(this.value);
        });
    }

    // Apply filters on page load if category is pre-selected
    if (category && categoryNames[category]) {
        applyAllFilters();
    }

    // Apply search filter from URL
    if (searchQuery) {
        const searchInput = document.getElementById('search-products');
        if (searchInput) {
            searchInput.value = searchQuery;
            applyAllFilters();
        }
    }

    // Pagination functionality (placeholder)
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function () {
            pageNumbers.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const pageNum = parseInt(this.textContent);
            if (prevBtn) prevBtn.disabled = pageNum === 1;
            if (nextBtn) nextBtn.disabled = pageNum === 8; // Assuming 8 pages

            // Scroll to top of products
            document.querySelector('.listing-main').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
