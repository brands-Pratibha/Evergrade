// Products Page JavaScript
// Handles both static product data and dynamic seller-uploaded products

document.addEventListener('DOMContentLoaded', async function () {
    const productsContainer = document.getElementById('products-container');
    const FM = window.FirebaseMock;
    let allProducts = [];

    // 1. Fetch products from PRODUCTS_DATA (static)
    if (typeof PRODUCTS_DATA !== 'undefined') {
        allProducts = [...PRODUCTS_DATA];
    }

    // 2. Fetch products from localStorage (seller uploads)
    try {
        const storedProducts = JSON.parse(localStorage.getItem('mockDB_sellerProducts')) || [];
        const activeStored = storedProducts.filter(p => p.active !== false);

        // Merge uploaded products at the TOP
        allProducts = [...activeStored, ...allProducts];

    } catch (error) {
        console.error("Error fetching local products:", error);
    }

    // 3. Render all products
    renderProducts(allProducts);

    // --- Helper Functions ---

    function renderProducts(products) {
        if (!productsContainer) return;
        productsContainer.innerHTML = ''; // limited to static initial load in HTML, clear it

        if (products.length === 0) {
            productsContainer.innerHTML = '<div class="no-results">No products found.</div>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            card.setAttribute('data-product-id', product.id);

            // Generate Tags
            let tagsHtml = '';
            if (product.certifications && Array.isArray(product.certifications) && product.certifications.length) {
                tagsHtml = product.certifications.slice(0, 3).map(c => `<span class="tag">${c}</span>`).join('');
            } else {
                tagsHtml = '<span class="tag">New Arrival</span>';
            }

            // Generate Specs (MOQ + up to 2 others)
            let specsHtml = '';

            // MOQ
            if (product.moq) {
                specsHtml += `
                <div class="spec-row">
                    <span class="spec-label">MOQ:</span>
                    <span class="spec-value">${product.moq}</span>
                </div>`;
            }

            // Other specs
            if (product.specifications) {
                let count = 0;
                for (const [key, value] of Object.entries(product.specifications)) {
                    if (count >= 2) break;
                    specsHtml += `
                    <div class="spec-row">
                        <span class="spec-label">${key}:</span>
                        <span class="spec-value">${value}</span>
                    </div>`;
                    count++;
                }
            }

            // Supplier Info
            const supplierName = product.supplier ? product.supplier.name : 'Verified Seller';
            const location = product.supplier && product.supplier.location ? `<span class="supplier-loc">• ${product.supplier.location}</span>` : '';

            card.innerHTML = `
                <div class="product-header">
                    <h3>${product.name}</h3>
                    <span class="supplier-rating">★ ${product.rating || 'New'}</span>
                </div>
                <div class="supplier-info">
                    <span class="supplier-name">${supplierName}</span>
                    ${location}
                </div>
                <div class="product-tags">
                    ${tagsHtml}
                </div>
                <div class="product-specs">
                    ${specsHtml}
                </div>
                <!-- Remove buttons as per previous request, keeping only View Details -->
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary full-width">View Details</a>
            `;
            productsContainer.appendChild(card);
        });

        // Re-apply filters after rendering
        applyAllFilters();
    }


    // --- Existing Filter & Sort Logic (Preserved) ---

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const searchQuery = urlParams.get('search');

    // Category mapping
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

    // Update page title based on category
    if (category && categoryNames[category]) {
        const categoryName = categoryNames[category];
        const catNameEl = document.getElementById('category-name');
        const listTitleEl = document.getElementById('listing-title');
        if (catNameEl) catNameEl.textContent = categoryName;
        if (listTitleEl) listTitleEl.textContent = categoryName;
        document.title = `${categoryName} - Evergrade`;
        const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (checkbox) checkbox.checked = true;
    }

    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (this.dataset.view === 'list') {
                productsContainer.classList.add('list-view');
            } else {
                productsContainer.classList.remove('list-view');
            }
        });
    });

    // Clear filters
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function () {
            document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
            const defRadio = document.querySelector('input[name="moq"][value="any"]');
            if (defRadio) defRadio.checked = true;
            const sInput = document.getElementById('search-products');
            if (sInput) sInput.value = '';

            window.history.replaceState({}, '', 'products.html');
            const catNameEl = document.getElementById('category-name');
            if (catNameEl) catNameEl.textContent = 'All Products';

            applyAllFilters();
        });
    }

    // Search input
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
        if (searchQuery) {
            searchInput.value = searchQuery;
            // Delay slightly to ensure render complete
            setTimeout(applyAllFilters, 100);
        }
        searchInput.addEventListener('input', () => applyAllFilters());
    }

    // Filter event listeners
    document.querySelectorAll('input[name="category"], input[name="certification"], input[name="rating"], input[name="moq"]').forEach(input => {
        input.addEventListener('change', applyAllFilters);
    });

    // --- Filter Helpers ---

    function getSelectedCategories() {
        return Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    }
    function getSelectedCertifications() {
        return Array.from(document.querySelectorAll('input[name="certification"]:checked')).map(cb => cb.value.toLowerCase());
    }
    function getSelectedRatings() {
        return Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseFloat(cb.value));
    }
    function getSelectedMOQ() {
        const val = document.querySelector('input[name="moq"]:checked');
        return val ? val.value : 'any';
    }

    function getRating(card) {
        const txt = card.querySelector('.supplier-rating')?.textContent || '';
        const m = txt.match(/[\d.]+/);
        return m ? parseFloat(m[0]) : 0;
    }

    function getMOQValue(card) {
        const txt = card.querySelector('.spec-row .spec-value')?.textContent || '';
        const m = txt.match(/[\d,]+/);
        return m ? parseInt(m[0].replace(/,/g, '')) : 0;
    }

    function applyAllFilters() {
        const sInput = document.getElementById('search-products');
        const query = sInput ? sInput.value.toLowerCase().trim() : '';
        const cats = getSelectedCategories();
        const certs = getSelectedCertifications();
        const ratings = getSelectedRatings();
        const moq = getSelectedMOQ();

        let visibleCount = 0;
        document.querySelectorAll('.product-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const supplier = card.querySelector('.supplier-name')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
            const cat = card.dataset.category || '';
            const r = getRating(card);
            const m = getMOQValue(card);

            const matchQuery = !query || title.includes(query) || supplier.includes(query) || tags.some(t => t.includes(query));
            const matchCat = cats.length === 0 || cats.includes(cat);
            const matchCert = certs.length === 0 || certs.some(c => tags.some(t => t.includes(c)));
            const matchRating = ratings.length === 0 || ratings.some(rt => r >= rt);

            let matchMOQ = true;
            if (moq === 'low' && m >= 100) matchMOQ = false;
            if (moq === 'medium' && (m < 100 || m > 500)) matchMOQ = false;
            if (moq === 'high' && m <= 500) matchMOQ = false;

            if (matchQuery && matchCat && matchCert && matchRating && matchMOQ) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const countEl = document.getElementById('product-count');
        if (countEl) countEl.textContent = visibleCount;

        // Apply sort
        const sortSel = document.getElementById('sort-by');
        if (sortSel) sortProducts(sortSel.value);
    }

    function sortProducts(sortBy) {
        const container = document.getElementById('products-container');
        const cards = Array.from(container.querySelectorAll('.product-card'));

        cards.sort((a, b) => {
            const rA = getRating(a), rB = getRating(b);
            const mA = getMOQValue(a), mB = getMOQValue(b);

            if (sortBy === 'rating-high') return rB - rA;
            if (sortBy === 'rating-low') return rA - rB;
            if (sortBy === 'moq-low') return mA - mB;
            if (sortBy === 'moq-high') return mB - mA;
            return 0; // relevance/newest default
        });

        cards.forEach(c => container.appendChild(c));
    }

    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () { sortProducts(this.value); });
    }

});
