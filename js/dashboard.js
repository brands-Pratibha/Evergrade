/**
 * Seller Dashboard – Evergrade
 * Complete client-side logic: auth, navigation, inventory CRUD,
 * bulk upload, inquiries, profile, and support.
 */
(function () {
    'use strict';

    /* ---------- Firebase Mock refs ---------- */
    const { auth, db, onAuthStateChanged, signOut, doc, getDoc, setDoc } = window.FirebaseMock;

    /* ---------- DOM refs ---------- */
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const sidebar = $('#db-sidebar');
    const sidebarOverlay = $('#sidebar-overlay');
    const hamburger = $('#db-hamburger');
    const pageTitle = $('#db-page-title');
    const userNameEl = $('#db-user-name');
    const userAvatarEl = $('#db-user-avatar');
    const logoutBtn = $('#db-logout-btn');
    const toast = $('#db-toast');

    /* ---------- State ---------- */
    let currentUser = null;
    let currentRole = null;
    let sellerProducts = [];
    let inquiries = [];
    let supportTickets = [];
    let profileData = {};
    let businessData = {};

    const STORAGE_PRODUCTS = 'mockDB_sellerProducts';
    const STORAGE_INQUIRIES = 'mockDB_inquiries';
    const STORAGE_TICKETS = 'mockDB_tickets';
    const STORAGE_PROFILE = 'mockDB_sellerProfile';
    const STORAGE_BUSINESS = 'mockDB_sellerBusiness';
    const STORAGE_ACTIVITY = 'mockDB_activity';

    /* ======================================================
       AUTH
    ====================================================== */
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'index.html';
            return;
        }
        currentUser = user;

        // Check role
        const docRef = doc(db, 'users', user.uid);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
            window.location.href = 'index.html';
            return;
        }
        const data = snap.data();
        currentRole = data.role;
        if (currentRole !== 'seller' && currentRole !== 'manufacturer') {
            window.location.href = 'index.html';
            return;
        }

        // Update top bar
        userNameEl.textContent = user.displayName || 'Seller';
        userAvatarEl.textContent = (user.displayName || 'S').charAt(0).toUpperCase();

        // Load data & render
        loadAllData();
        seedMockData();
        initNavigation();
        initOverview();
        initInventory();
        initAddProduct();
        initBulkUpload();
        initInquiries();
        initProfile();
        initSupport();
    });

    logoutBtn.addEventListener('click', async () => {
        await signOut(auth);
        window.location.href = 'index.html';
    });

    /* ======================================================
       DATA PERSISTENCE (localStorage)
    ====================================================== */
    function loadAllData() {
        sellerProducts = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS)) || [];
        inquiries = JSON.parse(localStorage.getItem(STORAGE_INQUIRIES)) || [];
        supportTickets = JSON.parse(localStorage.getItem(STORAGE_TICKETS)) || [];
        profileData = JSON.parse(localStorage.getItem(STORAGE_PROFILE)) || {};
        businessData = JSON.parse(localStorage.getItem(STORAGE_BUSINESS)) || {};
    }

    function saveProducts() { localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(sellerProducts)); }
    function saveInquiries() { localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries)); }
    function saveTickets() { localStorage.setItem(STORAGE_TICKETS, JSON.stringify(supportTickets)); }
    function saveProfile() { localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profileData)); }
    function saveBusiness() { localStorage.setItem(STORAGE_BUSINESS, JSON.stringify(businessData)); }

    function getActivity() { return JSON.parse(localStorage.getItem(STORAGE_ACTIVITY)) || []; }
    function addActivity(text, type) {
        const list = getActivity();
        list.unshift({ text, type: type || 'green', time: new Date().toISOString() });
        if (list.length > 20) list.length = 20;
        localStorage.setItem(STORAGE_ACTIVITY, JSON.stringify(list));
    }

    /* ======================================================
       SEED MOCK DATA (only if empty)
    ====================================================== */
    function seedMockData() {
        // Seed inquiries
        if (inquiries.length === 0) {
            inquiries = [
                { id: 'inq_1', product: 'Basmati Rice (Premium)', buyer: 'GlobalTrade Corp', buyerEmail: 'john@globaltrade.com', message: 'We need 50 MT of premium basmati rice for export to Dubai. Can you share pricing and lead time?', date: '2026-02-12', status: 'new' },
                { id: 'inq_2', product: 'Organic Cotton Fabric', buyer: 'EcoFashion UK', buyerEmail: 'sarah@ecofashion.uk', message: 'Looking for GOTS-certified organic cotton, 200 GSM. Need samples first.', date: '2026-02-11', status: 'new' },
                { id: 'inq_3', product: 'TMT Steel Bars', buyer: 'BuildRight Infra', buyerEmail: 'amit@buildright.in', message: 'Requirement: 200 MT Fe 500D TMT bars for upcoming project. Need best price.', date: '2026-02-10', status: 'new' }
            ];
            saveInquiries();
        }

        // Seed tickets
        if (supportTickets.length === 0) {
            supportTickets = [
                { id: 'TKT-1001', subject: 'Unable to update product listing', category: 'products', desc: 'Getting an error when trying to edit my product description.', status: 'resolved', date: '2026-02-08' },
                { id: 'TKT-1002', subject: 'Payment not received', category: 'payment', desc: 'My payment for order #4521 is overdue by 5 days.', status: 'in-progress', date: '2026-02-09' }
            ];
            saveTickets();
        }

        // Seed activity
        if (getActivity().length === 0) {
            addActivity('Account created — welcome to Evergrade!', 'green');
        }
    }

    /* ======================================================
       TOAST
    ====================================================== */
    let toastTimeout;
    function showToast(msg, type) {
        clearTimeout(toastTimeout);
        toast.className = 'db-toast show ' + (type || '');
        toast.innerHTML = msg;
        toastTimeout = setTimeout(() => toast.className = 'db-toast', 3000);
    }

    /* ======================================================
       NAVIGATION
    ====================================================== */
    const sectionTitles = {
        'overview': 'Overview',
        'inventory': 'My Products',
        'add-product': 'Add Product',
        'bulk-upload': 'Bulk Upload',
        'inquiries': 'Inquiries & Leads',
        'profile': 'Profile & Business',
        'support': 'Support'
    };

    function switchSection(name) {
        $$('.db-section').forEach(s => s.classList.remove('active'));
        $$('.db-nav-item').forEach(n => n.classList.remove('active'));
        const sec = $(`#sec-${name}`);
        if (sec) sec.classList.add('active');
        const nav = $(`.db-nav-item[data-section="${name}"]`);
        if (nav) nav.classList.add('active');
        pageTitle.textContent = sectionTitles[name] || name;

        // refresh section data
        if (name === 'overview') renderOverview();
        if (name === 'inventory') renderInventory();
        if (name === 'inquiries') renderInquiries();
        if (name === 'support') renderTickets();

        // close mobile sidebar
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
    }

    function initNavigation() {
        $$('.db-nav-item[data-section]').forEach(btn => {
            btn.addEventListener('click', () => switchSection(btn.dataset.section));
        });

        // Quick-action & goto buttons
        $$('[data-goto]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                switchSection(el.dataset.goto);
            });
        });

        // Hamburger
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        });
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
    }

    /* ======================================================
       OVERVIEW
    ====================================================== */
    function initOverview() {
        renderOverview();
    }

    function renderOverview() {
        const totalProducts = sellerProducts.length;
        const activeProducts = sellerProducts.filter(p => p.active !== false).length;
        const newInquiries = inquiries.filter(i => i.status === 'new').length;
        const responseRate = inquiries.length
            ? Math.round((inquiries.filter(i => i.status !== 'new').length / inquiries.length) * 100)
            : 0;

        $('#overview-stats').innerHTML = `
            <div class="db-stat-card">
                <div class="db-stat-icon orange">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                </div>
                <div class="db-stat-info">
                    <span class="db-stat-value">${totalProducts}</span>
                    <span class="db-stat-label">Total Products</span>
                </div>
            </div>
            <div class="db-stat-card">
                <div class="db-stat-icon green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="db-stat-info">
                    <span class="db-stat-value">${activeProducts}</span>
                    <span class="db-stat-label">Active Listings</span>
                </div>
            </div>
            <div class="db-stat-card">
                <div class="db-stat-icon teal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div class="db-stat-info">
                    <span class="db-stat-value">${newInquiries}</span>
                    <span class="db-stat-label">New Inquiries</span>
                </div>
            </div>
            <div class="db-stat-card">
                <div class="db-stat-icon blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div class="db-stat-info">
                    <span class="db-stat-value">${responseRate}%</span>
                    <span class="db-stat-label">Response Rate</span>
                </div>
            </div>
        `;

        // Update inquiry badge
        const badge = $('#inquiry-badge');
        if (badge) badge.textContent = newInquiries;

        // Activity feed
        renderActivityFeed();

        // Profile completion
        updateProfileCompletion();
    }

    function renderActivityFeed() {
        const list = getActivity().slice(0, 5);
        const container = $('#overview-activity');
        if (list.length === 0) {
            container.innerHTML = '<p style="font-size:14px;color:var(--color-text-body);text-align:center;padding:20px 0">No activity yet.</p>';
            return;
        }
        container.innerHTML = list.map(a => {
            const ago = timeAgo(a.time);
            return `<div class="db-activity-item">
                <div class="db-activity-dot ${a.type}"></div>
                <div>
                    <div class="db-activity-text">${a.text}</div>
                    <div class="db-activity-time">${ago}</div>
                </div>
            </div>`;
        }).join('');
    }

    function updateProfileCompletion() {
        const fields = [
            currentUser?.displayName,
            profileData.phone,
            profileData.designation,
            businessData.company,
            businessData.gst,
            businessData.address,
            businessData.desc,
            sellerProducts.length > 0 ? 'yes' : null
        ];
        const filled = fields.filter(Boolean).length;
        const pct = Math.round((filled / fields.length) * 100);
        const pctEl = $('#profile-pct');
        const bar = $('#profile-progress');
        if (pctEl) pctEl.textContent = pct + '%';
        if (bar) bar.style.width = pct + '%';
    }

    /* ======================================================
       INVENTORY
    ====================================================== */
    function initInventory() {
        $('#inv-search').addEventListener('input', renderInventory);
        $('#inv-filter-cat').addEventListener('change', renderInventory);
        renderInventory();
    }

    function renderInventory() {
        const search = ($('#inv-search')?.value || '').toLowerCase();
        const cat = $('#inv-filter-cat')?.value || '';
        let filtered = sellerProducts.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(search);
            const matchCat = !cat || p.category === cat;
            return matchSearch && matchCat;
        });

        const tbody = $('#inv-table-body');
        const empty = $('#inv-empty');

        if (sellerProducts.length === 0) {
            tbody.innerHTML = '';
            empty.style.display = 'block';
            return;
        }
        empty.style.display = 'none';

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px 16px;color:var(--color-text-body)">No products match your search.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(p => {
            const status = p.active !== false;
            const catLabel = (p.category || '').charAt(0).toUpperCase() + (p.category || '').slice(1);
            const date = p.dateAdded ? new Date(p.dateAdded).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
            return `<tr>
                <td><strong>${esc(p.name)}</strong></td>
                <td>${catLabel}</td>
                <td>${esc(p.moq || '—')}</td>
                <td>
                    <label class="db-toggle">
                        <input type="checkbox" ${status ? 'checked' : ''} data-toggle-id="${p.id}">
                        <span class="db-toggle-slider"></span>
                    </label>
                    <span class="db-badge ${status ? 'green' : 'gray'}" style="margin-left:8px">${status ? 'Active' : 'Inactive'}</span>
                </td>
                <td>${date}</td>
                <td>
                    <button class="db-btn icon-only sm" title="Edit" data-edit-id="${p.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="db-btn icon-only sm" title="Delete" data-delete-id="${p.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </td>
            </tr>`;
        }).join('');

        // Attach toggle handlers
        tbody.querySelectorAll('[data-toggle-id]').forEach(input => {
            input.addEventListener('change', () => {
                const p = sellerProducts.find(p => p.id === input.dataset.toggleId);
                if (p) {
                    p.active = input.checked;
                    saveProducts();
                    renderInventory();
                    addActivity(`${p.name} marked as ${p.active ? 'active' : 'inactive'}`, 'blue');
                }
            });
        });

        // Edit handlers
        tbody.querySelectorAll('[data-edit-id]').forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.dataset.editId));
        });

        // Delete handlers
        tbody.querySelectorAll('[data-delete-id]').forEach(btn => {
            btn.addEventListener('click', () => confirmDelete(btn.dataset.deleteId));
        });
    }

    /* ======================================================
       ADD / EDIT PRODUCT
    ====================================================== */
    function initAddProduct() {
        $('#product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            saveProductForm();
        });

        $('#cancel-product-btn').addEventListener('click', () => {
            resetProductForm();
            switchSection('inventory');
        });

        $('#add-spec-btn').addEventListener('click', addSpecRow);

        // Delegated remove spec
        $('#specs-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-spec')) {
                const rows = $$('#specs-container .db-spec-row');
                if (rows.length > 1) e.target.parentElement.remove();
            }
        });
    }

    function addSpecRow() {
        const row = document.createElement('div');
        row.className = 'db-spec-row';
        row.innerHTML = `
            <input type="text" class="db-input spec-key" placeholder="Spec name">
            <input type="text" class="db-input spec-val" placeholder="Value">
            <button type="button" class="remove-spec" title="Remove">×</button>
        `;
        $('#specs-container').appendChild(row);
    }

    function saveProductForm() {
        const editId = $('#edit-product-id').value;
        const name = $('#pf-name').value.trim();
        const category = $('#pf-category').value;
        const moq = $('#pf-moq').value.trim();
        const leadTime = $('#pf-leadtime').value.trim();
        const capacity = $('#pf-capacity').value.trim();
        const description = $('#pf-desc').value.trim();
        const certsStr = $('#pf-certs').value.trim();
        const certifications = certsStr ? certsStr.split(',').map(c => c.trim()).filter(Boolean) : [];

        // Gather specs
        const specs = {};
        $$('#specs-container .db-spec-row').forEach(row => {
            const k = row.querySelector('.spec-key').value.trim();
            const v = row.querySelector('.spec-val').value.trim();
            if (k && v) specs[k] = v;
        });

        if (!name || !category || !moq || !description) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        if (editId) {
            // Update existing
            const idx = sellerProducts.findIndex(p => p.id === editId);
            if (idx !== -1) {
                sellerProducts[idx] = { ...sellerProducts[idx], name, category, moq, leadTime, capacity, description, certifications, specifications: specs };
                addActivity(`Updated product: ${name}`, 'blue');
                showToast('Product updated successfully', 'success');
            }
        } else {
            const product = {
                id: 'sp_' + Date.now(),
                name, category, moq, leadTime, capacity, description, certifications, specifications: specs,
                active: true,
                dateAdded: new Date().toISOString(),
                rating: 0,
                supplier: {
                    name: businessData.company || currentUser?.displayName || 'My Company',
                    location: businessData.address ? businessData.address.split(',').slice(-2).join(',').trim() : 'India',
                    experience: ''
                }
            };
            sellerProducts.push(product);
            addActivity(`Added new product: ${name}`, 'green');
            showToast('Product added successfully!', 'success');
        }

        saveProducts();
        resetProductForm();
        switchSection('inventory');
    }

    function editProduct(id) {
        const p = sellerProducts.find(p => p.id === id);
        if (!p) return;

        $('#edit-product-id').value = p.id;
        $('#pf-name').value = p.name;
        $('#pf-category').value = p.category;
        $('#pf-moq').value = p.moq || '';
        $('#pf-leadtime').value = p.leadTime || '';
        $('#pf-capacity').value = p.capacity || '';
        $('#pf-desc').value = p.description || '';
        $('#pf-certs').value = (p.certifications || []).join(', ');
        $('#add-product-title').textContent = 'Edit Product';
        $('#save-product-btn').textContent = 'Update Product';

        // Specs
        const container = $('#specs-container');
        container.innerHTML = '';
        const specs = p.specifications || {};
        const keys = Object.keys(specs);
        if (keys.length === 0) {
            addSpecRow();
        } else {
            keys.forEach(k => {
                const row = document.createElement('div');
                row.className = 'db-spec-row';
                row.innerHTML = `
                    <input type="text" class="db-input spec-key" placeholder="Spec name" value="${esc(k)}">
                    <input type="text" class="db-input spec-val" placeholder="Value" value="${esc(specs[k])}">
                    <button type="button" class="remove-spec" title="Remove">×</button>
                `;
                container.appendChild(row);
            });
        }

        switchSection('add-product');
    }

    function resetProductForm() {
        $('#product-form').reset();
        $('#edit-product-id').value = '';
        $('#add-product-title').textContent = 'Add New Product';
        $('#save-product-btn').textContent = 'Save Product';
        $('#specs-container').innerHTML = `<div class="db-spec-row">
            <input type="text" class="db-input spec-key" placeholder="Spec name (e.g. Moisture)">
            <input type="text" class="db-input spec-val" placeholder="Value (e.g. 12% max)">
            <button type="button" class="remove-spec" title="Remove">×</button>
        </div>`;
    }

    /* ======================================================
       DELETE PRODUCT
    ====================================================== */
    let pendingDeleteId = null;

    function confirmDelete(id) {
        pendingDeleteId = id;
        const p = sellerProducts.find(p => p.id === id);
        if (!p) return;
        $('#delete-product-name').textContent = p.name;
        $('#delete-modal').classList.add('open');
    }

    $('#delete-confirm-btn').addEventListener('click', () => {
        if (pendingDeleteId) {
            const p = sellerProducts.find(p => p.id === pendingDeleteId);
            sellerProducts = sellerProducts.filter(p => p.id !== pendingDeleteId);
            saveProducts();
            addActivity(`Deleted product: ${p?.name || 'Unknown'}`, 'orange');
            showToast('Product deleted', 'success');
            renderInventory();
        }
        closeDeleteModal();
    });

    $('#delete-cancel-btn').addEventListener('click', closeDeleteModal);
    $('#delete-modal-close').addEventListener('click', closeDeleteModal);
    function closeDeleteModal() {
        pendingDeleteId = null;
        $('#delete-modal').classList.remove('open');
    }

    /* ======================================================
       BULK UPLOAD
    ====================================================== */
    function initBulkUpload() {
        const dropZone = $('#csv-drop-zone');
        const fileInput = $('#csv-file-input');

        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) handleCSV(e.dataTransfer.files[0]);
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) handleCSV(fileInput.files[0]);
        });

        $('#download-template-btn').addEventListener('click', downloadTemplate);

        $('#csv-cancel-btn').addEventListener('click', () => {
            $('#csv-preview').style.display = 'none';
            $('#csv-drop-zone').style.display = 'block';
            fileInput.value = '';
        });

        $('#csv-import-btn').addEventListener('click', importCSV);
    }

    let parsedCSVRows = [];

    function downloadTemplate() {
        const header = 'name,category,moq,leadTime,capacity,description,certifications';
        const sample = '"Basmati Rice","grains","10 MT","7-10 days","500 MT/month","Premium long grain rice","FSSAI,ISO"';
        const blob = new Blob([header + '\n' + sample + '\n'], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'evergrade_product_template.csv';
        a.click();
    }

    function handleCSV(file) {
        if (!file.name.endsWith('.csv')) {
            showToast('Please upload a .csv file', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length < 2) {
                showToast('CSV must have a header row and at least one data row', 'error');
                return;
            }

            const headers = parseCSVLine(lines[0]);
            const requiredCols = ['name', 'category', 'moq', 'description'];
            const missingCols = requiredCols.filter(c => !headers.includes(c));
            if (missingCols.length) {
                showToast(`Missing columns: ${missingCols.join(', ')}`, 'error');
                return;
            }

            parsedCSVRows = [];
            for (let i = 1; i < lines.length; i++) {
                const vals = parseCSVLine(lines[i]);
                const row = {};
                headers.forEach((h, idx) => { row[h] = (vals[idx] || '').trim(); });

                // Validate
                row._errors = [];
                if (!row.name) row._errors.push('name is required');
                if (!row.category) row._errors.push('category is required');
                if (!row.moq) row._errors.push('moq is required');
                if (!row.description) row._errors.push('description is required');
                row._valid = row._errors.length === 0;
                parsedCSVRows.push(row);
            }

            renderCSVPreview(headers);
        };
        reader.readAsText(file);
    }

    function renderCSVPreview(headers) {
        const validCount = parsedCSVRows.filter(r => r._valid).length;
        const errorCount = parsedCSVRows.length - validCount;

        $('#csv-summary').innerHTML = `${parsedCSVRows.length} rows found — <span style="color:#059669">${validCount} valid</span>${errorCount ? `, <span style="color:#DC2626">${errorCount} errors</span>` : ''}`;

        const displayCols = headers.filter(h => !h.startsWith('_'));
        $('#csv-preview-head').innerHTML = `<tr>${displayCols.map(h => `<th>${h}</th>`).join('')}<th>Status</th></tr>`;

        $('#csv-preview-body').innerHTML = parsedCSVRows.map(row => {
            const style = row._valid ? '' : 'background:#FEF2F2';
            return `<tr style="${style}">${displayCols.map(h => `<td>${esc(row[h] || '')}</td>`).join('')}
                <td>${row._valid ? '<span class="db-badge green">Valid</span>' : `<span class="db-badge red" title="${esc(row._errors.join('; '))}">${row._errors.length} error(s)</span>`}</td>
            </tr>`;
        }).join('');

        $('#csv-drop-zone').style.display = 'none';
        $('#csv-preview').style.display = 'block';
    }

    function importCSV() {
        const valid = parsedCSVRows.filter(r => r._valid);
        if (valid.length === 0) {
            showToast('No valid rows to import', 'error');
            return;
        }

        valid.forEach(row => {
            sellerProducts.push({
                id: 'sp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                name: row.name,
                category: row.category,
                moq: row.moq || '',
                leadTime: row.leadTime || '',
                capacity: row.capacity || '',
                description: row.description || '',
                certifications: row.certifications ? row.certifications.split(',').map(c => c.trim()) : [],
                specifications: {},
                active: true,
                dateAdded: new Date().toISOString(),
                rating: 0,
                supplier: {
                    name: businessData.company || currentUser?.displayName || 'My Company',
                    location: 'India',
                    experience: ''
                }
            });
        });

        saveProducts();
        addActivity(`Bulk imported ${valid.length} product(s)`, 'green');
        showToast(`Successfully imported ${valid.length} product(s)!`, 'success');

        // Reset
        $('#csv-preview').style.display = 'none';
        $('#csv-drop-zone').style.display = 'block';
        $('#csv-file-input').value = '';
        parsedCSVRows = [];
    }

    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') {
                inQuotes = !inQuotes;
            } else if (c === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += c;
            }
        }
        result.push(current);
        return result;
    }

    /* ======================================================
       INQUIRIES
    ====================================================== */
    let respondingInquiryId = null;

    function initInquiries() {
        $('#inq-filter').addEventListener('change', renderInquiries);
        $('#respond-modal-close').addEventListener('click', closeRespondModal);
        $('#respond-cancel-btn').addEventListener('click', closeRespondModal);
        $('#respond-send-btn').addEventListener('click', sendResponse);
        renderInquiries();
    }

    function renderInquiries() {
        const filter = $('#inq-filter')?.value || '';
        let filtered = inquiries;
        if (filter) filtered = inquiries.filter(i => i.status === filter);

        const tbody = $('#inq-table-body');
        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px 16px;color:var(--color-text-body)">No inquiries found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(i => {
            const statusClass = i.status === 'new' ? 'orange' : i.status === 'responded' ? 'green' : 'gray';
            const statusLabel = i.status.charAt(0).toUpperCase() + i.status.slice(1);
            const date = new Date(i.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
            const actions = i.status === 'new'
                ? `<button class="db-btn sm primary" data-respond-id="${i.id}">Respond</button>`
                : i.status === 'responded'
                    ? `<button class="db-btn sm outline" data-close-id="${i.id}">Close</button>`
                    : '<span style="color:#9ca3af">—</span>';

            return `<tr>
                <td><strong>${esc(i.product)}</strong></td>
                <td>${esc(i.buyer)}</td>
                <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(i.message)}</td>
                <td>${date}</td>
                <td><span class="db-badge ${statusClass}">${statusLabel}</span></td>
                <td>${actions}</td>
            </tr>`;
        }).join('');

        // Respond handlers
        tbody.querySelectorAll('[data-respond-id]').forEach(btn => {
            btn.addEventListener('click', () => openRespondModal(btn.dataset.respondId));
        });

        // Close handlers
        tbody.querySelectorAll('[data-close-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const inq = inquiries.find(i => i.id === btn.dataset.closeId);
                if (inq) {
                    inq.status = 'closed';
                    saveInquiries();
                    addActivity(`Closed inquiry for ${inq.product}`, 'orange');
                    showToast('Inquiry closed', 'success');
                    renderInquiries();
                }
            });
        });
    }

    function openRespondModal(id) {
        respondingInquiryId = id;
        const inq = inquiries.find(i => i.id === id);
        if (!inq) return;
        $('#respond-inquiry-info').innerHTML = `<strong>${esc(inq.buyer)}</strong> asked about <strong>${esc(inq.product)}</strong>:<br><em>"${esc(inq.message)}"</em>`;
        $('#respond-text').value = '';
        $('#respond-modal').classList.add('open');
    }

    function closeRespondModal() {
        respondingInquiryId = null;
        $('#respond-modal').classList.remove('open');
    }

    function sendResponse() {
        if (!respondingInquiryId) return;
        const text = $('#respond-text').value.trim();
        if (!text) {
            showToast('Please type a response', 'error');
            return;
        }
        const inq = inquiries.find(i => i.id === respondingInquiryId);
        if (inq) {
            inq.status = 'responded';
            inq.response = text;
            saveInquiries();
            addActivity(`Responded to inquiry from ${inq.buyer}`, 'green');
            showToast('Response sent successfully!', 'success');
        }
        closeRespondModal();
        renderInquiries();
    }

    /* ======================================================
       PROFILE & BUSINESS
    ====================================================== */
    function initProfile() {
        // Pre-fill
        $('#prof-name').value = currentUser?.displayName || '';
        $('#prof-email').value = currentUser?.email || '';
        $('#prof-phone').value = profileData.phone || '';
        $('#prof-designation').value = profileData.designation || '';
        $('#biz-company').value = businessData.company || '';
        $('#biz-gst').value = businessData.gst || '';
        $('#biz-address').value = businessData.address || '';
        $('#biz-desc').value = businessData.desc || '';

        $('#profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            profileData.phone = $('#prof-phone').value.trim();
            profileData.designation = $('#prof-designation').value.trim();
            saveProfile();
            addActivity('Updated personal information', 'blue');
            showToast('Personal info saved', 'success');
            updateProfileCompletion();
        });

        $('#business-form').addEventListener('submit', (e) => {
            e.preventDefault();
            businessData.company = $('#biz-company').value.trim();
            businessData.gst = $('#biz-gst').value.trim();
            businessData.address = $('#biz-address').value.trim();
            businessData.desc = $('#biz-desc').value.trim();
            saveBusiness();
            addActivity('Updated business details', 'blue');
            showToast('Business details saved', 'success');
            updateProfileCompletion();
        });
    }

    /* ======================================================
       SUPPORT
    ====================================================== */
    function initSupport() {
        $('#support-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = $('#sup-subject').value.trim();
            const category = $('#sup-category').value;
            const desc = $('#sup-desc').value.trim();

            if (!subject || !desc) {
                showToast('Please fill all required fields', 'error');
                return;
            }

            const ticket = {
                id: 'TKT-' + (1000 + supportTickets.length + 1),
                subject, category, desc,
                status: 'open',
                date: new Date().toISOString().slice(0, 10)
            };
            supportTickets.push(ticket);
            saveTickets();
            addActivity(`Raised support ticket: ${subject}`, 'orange');
            showToast('Support ticket submitted!', 'success');
            $('#support-form').reset();
            renderTickets();
        });

        renderTickets();
    }

    function renderTickets() {
        const tbody = $('#sup-table-body');
        if (supportTickets.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px 16px;color:var(--color-text-body)">No tickets yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = supportTickets.map(t => {
            const statusClass = t.status === 'open' ? 'orange' : t.status === 'in-progress' ? 'blue' : 'green';
            const statusLabel = t.status === 'in-progress' ? 'In Progress' : t.status.charAt(0).toUpperCase() + t.status.slice(1);
            const catLabel = (t.category || '').charAt(0).toUpperCase() + (t.category || '').slice(1);
            return `<tr>
                <td><strong>${esc(t.id)}</strong></td>
                <td>${esc(t.subject)}</td>
                <td>${catLabel}</td>
                <td><span class="db-badge ${statusClass}">${statusLabel}</span></td>
                <td>${t.date}</td>
            </tr>`;
        }).join('');
    }

    /* ======================================================
       UTILITIES
    ====================================================== */
    function esc(str) {
        const d = document.createElement('div');
        d.textContent = str || '';
        return d.innerHTML;
    }

    function timeAgo(iso) {
        const diff = Date.now() - new Date(iso).getTime();
        const secs = Math.floor(diff / 1000);
        if (secs < 60) return 'Just now';
        const mins = Math.floor(secs / 60);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    }

})();
