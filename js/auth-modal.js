// Auth Modal - Login/Signup Overlay
// Depends on: js/firebase-mock.js (must be loaded first)

(function () {
    const FM = window.FirebaseMock;
    if (!FM) {
        console.error('FirebaseMock not loaded! Make sure firebase-mock.js is included before auth-modal.js');
        return;
    }

    const { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, doc, setDoc, getDoc } = FM;

    // DOM Elements
    let modalOverlay = document.getElementById('auth-modal-overlay');

    // Inject Modal HTML if not present
    if (!modalOverlay) {
        const modalHTML = `
        <div class="auth-modal-overlay" id="auth-modal-overlay">
            <div class="auth-modal">
                <button class="auth-modal-close" id="auth-modal-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div class="auth-modal-tabs">
                    <div class="auth-tab active" data-tab="login">Log In</div>
                    <div class="auth-tab" data-tab="signup">Sign Up</div>
                </div>

                <div class="auth-modal-body">
                    <!-- Login Form -->
                    <form id="login-form" class="auth-form" style="display: block;">
                        <h2 style="font-size: 24px; margin-bottom: 20px; color: var(--color-text-dark);">Welcome Back</h2>
                        <div class="form-group" style="margin-bottom: 24px;">
                            <label class="form-label" style="display:block; margin-bottom:8px; font-weight:500;">Email Address</label>
                            <input type="email" id="login-email" class="form-control" placeholder="name@company.com"
                                required style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:8px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 24px;">
                            <label class="form-label"
                                style="display:block; margin-bottom:8px; font-weight:500;">Password</label>
                            <input type="password" id="login-password" class="form-control" placeholder="Enter password"
                                required style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:8px;">
                        </div>

                        <div id="login-error" style="color:red; display:none; margin-bottom:10px; font-size:14px;"></div>

                        <button type="submit" class="btn btn-primary"
                            style="width: 100%; padding: 12px; border-radius: 8px;">Log In</button>

                        <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #6b7280;">
                            Don't have an account? <a href="#" id="switch-to-signup"
                                style="color: var(--color-primary); font-weight: 600;">Sign Up</a>
                        </p>
                    </form>

                    <!-- Signup Form -->
                    <form id="signup-form" class="auth-form" style="display: none;">
                        <h2 style="font-size: 24px; margin-bottom: 20px; color: var(--color-text-dark);">Create Account</h2>

                        <div class="form-group" style="margin-bottom: 24px;">
                            <label class="form-label" style="display:block; margin-bottom:8px; font-weight:500;">Full Name</label>
                            <input type="text" id="signup-name" class="form-control" placeholder="Your name" required
                                style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:8px;">
                        </div>

                        <div class="form-group" style="margin-bottom: 24px;">
                            <label style="display:block; margin-bottom:8px; font-weight:500;">I am a</label>
                            <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                                <label style="flex: 1; cursor: pointer; min-width: 80px;">
                                    <input type="radio" name="role" value="buyer" checked style="margin-right: 5px;"> Buyer
                                </label>
                                <label style="flex: 1; cursor: pointer; min-width: 80px;">
                                    <input type="radio" name="role" value="seller" style="margin-right: 5px;"> Seller
                                </label>
                                <label style="flex: 1; cursor: pointer; min-width: 100px;">
                                    <input type="radio" name="role" value="manufacturer" style="margin-right: 5px;">
                                    Manufacturer
                                </label>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 24px;">
                            <label class="form-label" style="display:block; margin-bottom:8px; font-weight:500;">Email Address</label>
                            <input type="email" id="signup-email" class="form-control" placeholder="name@company.com"
                                required style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:8px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 24px;">
                            <label class="form-label"
                                style="display:block; margin-bottom:8px; font-weight:500;">Password</label>
                            <input type="password" id="signup-password" class="form-control" placeholder="Create password"
                                required minlength="6"
                                style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:8px;">
                        </div>

                        <div id="signup-error" style="color:red; display:none; margin-bottom:10px; font-size:14px;"></div>

                        <button type="submit" class="btn btn-primary"
                            style="width: 100%; padding: 12px; border-radius: 8px;">Create Account</button>

                        <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #6b7280;">
                            Already have an account? <a href="#" id="switch-to-login"
                                style="color: var(--color-primary); font-weight: 600;">Log In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modalOverlay = document.getElementById('auth-modal-overlay');
    }

    // Re-query elements
    const closeBtn = document.getElementById('auth-modal-close');
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    // Tab Switching
    function switchTab(tabName) {
        tabs.forEach(t => {
            if (t.dataset.tab === tabName) t.classList.add('active');
            else t.classList.remove('active');
        });

        forms.forEach(f => {
            if (f.id === `${tabName}-form`) f.style.display = 'block';
            else f.style.display = 'none';
        });
    }

    // Open/Close Functions
    function openAuthModal(tab) {
        tab = tab || 'login';
        console.log('openAuthModal called with tab:', tab);
        if (!modalOverlay) {
            modalOverlay = document.getElementById('auth-modal-overlay');
            if (!modalOverlay) {
                console.error('Modal overlay not found!');
                return;
            }
        }
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchTab(tab);
    }

    function closeAuthModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for Modal
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeAuthModal();
        });

        if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        const switchToSignup = document.getElementById('switch-to-signup');
        const switchToLogin = document.getElementById('switch-to-login');

        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab('signup');
            });
        }

        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab('login');
            });
        }
    }

    // --- Login Logic ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const btn = loginForm.querySelector('button[type="submit"]');
            const errorMsg = document.getElementById('login-error');

            btn.disabled = true;
            btn.textContent = 'Logging in...';
            errorMsg.style.display = 'none';

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const role = docSnap.data().role;
                    if (role === 'seller' || role === 'manufacturer') {
                        window.location.href = 'seller-dashboard.html';
                    } else {
                        closeAuthModal();
                    }
                } else {
                    closeAuthModal();
                }

            } catch (error) {
                console.error(error);
                errorMsg.textContent = "Invalid email or password.";
                errorMsg.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Log In';
            }
        });
    }

    // --- Signup Logic ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            const btn = signupForm.querySelector('button[type="submit"]');
            const errorMsg = document.getElementById('signup-error');

            if (role === 'seller' || role === 'manufacturer') {
                const params = new URLSearchParams();
                if (name) params.append('name', name);
                if (email) params.append('email', email);
                window.location.href = `seller-register.html?${params.toString()}`;
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Creating Account...';
            errorMsg.style.display = 'none';

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await updateProfile(user, { displayName: name });
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                    role: role,
                    createdAt: new Date().toISOString()
                });

                closeAuthModal();

            } catch (error) {
                console.error(error);
                errorMsg.textContent = error.message;
                errorMsg.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Create Account';
            }
        });
    }

    // Check URL params on load
    const params = new URLSearchParams(window.location.search);
    const modalType = params.get('modal');
    if (modalType === 'login' || modalType === 'signup') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        openAuthModal(modalType);
    }

    // Global Event Listeners for trigger classes
    document.addEventListener('click', (e) => {
        const loginTrigger = e.target.closest('.trigger-auth-login');
        const signupTrigger = e.target.closest('.trigger-auth-signup');

        if (loginTrigger) {
            e.preventDefault();
            openAuthModal('login');
        }
        if (signupTrigger) {
            e.preventDefault();
            openAuthModal('signup');
        }
    });

    // Expose globally
    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;

})();
