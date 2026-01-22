// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Category mapping for display names
    const categoryNames = {
        'pharmaceuticals': 'Pharmaceuticals & APIs',
        'textiles': 'Textiles & Garments',
        'agro': 'Agro-Commodities',
        'chemicals': 'Chemical Products',
        'engineering': 'Engineering Goods',
        'gems': 'Gems & Jewelry',
        'electronics': 'Electronics',
        'handicrafts': 'Handicrafts',
        'building': 'Building Materials'
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

            // Reset page title if needed
            document.getElementById('category-name').textContent = 'All Products';
            document.getElementById('listing-title').textContent = 'All Products';
            document.title = 'Products - Evergrade';

            // Reset URL
            window.history.replaceState({}, '', 'products.html');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.toLowerCase().trim();
                filterProducts(query);
            }, 300);
        });
    }

    // Filter function (placeholder - would connect to real data)
    function filterProducts(query) {
        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const supplier = card.querySelector('.supplier-name').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const matchesQuery = !query ||
                title.includes(query) ||
                supplier.includes(query) ||
                tags.some(tag => tag.includes(query));

            if (matchesQuery) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update product count
        document.getElementById('product-count').textContent = visibleCount;
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
            prevBtn.disabled = pageNum === 1;
            nextBtn.disabled = pageNum === 8; // Assuming 8 pages

            // Scroll to top of products
            document.querySelector('.listing-main').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Sort functionality (placeholder)
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            // Placeholder for sorting logic
            console.log('Sort by:', this.value);
        });
    }
});
