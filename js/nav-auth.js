// Nav Auth - Updates header UI based on login state
// Depends on: js/firebase-mock.js (must be loaded first)

(function () {
    const FM = window.FirebaseMock;
    if (!FM) {
        console.error('FirebaseMock not loaded! Make sure firebase-mock.js is included before nav-auth.js');
        return;
    }

    const { auth, db, onAuthStateChanged, signOut, doc, getDoc } = FM;

    const authContainer = document.getElementById('auth-container');

    async function updateAuthUI(user) {
        if (!authContainer) return;

        if (user) {
            // User is signed in
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            let role = 'buyer';
            if (docSnap.exists()) {
                role = docSnap.data().role;
            }

            const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U';

            let dashboardItem = '';
            if (role === 'seller' || role === 'manufacturer') {
                dashboardItem = `
                    <a href="seller-dashboard.html" class="profile-dropdown-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
                        Dashboard
                    </a>`;
            }

            authContainer.innerHTML = `
                <div class="profile-dropdown-wrap">
                    <button class="profile-avatar-btn" aria-label="Profile menu" aria-expanded="false">
                        <span class="profile-avatar-initial">${initial}</span>
                    </button>
                    <div class="profile-dropdown-menu">
                        <a href="profile.html" class="profile-dropdown-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            My Profile
                        </a>
                        ${dashboardItem}
                        <div class="profile-dropdown-divider"></div>
                        <button class="profile-dropdown-item profile-dropdown-logout" id="nav-logout-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Log Out
                        </button>
                    </div>
                </div>
            `;
            authContainer.style.display = 'flex';
            authContainer.style.alignItems = 'center';

            // Toggle dropdown on avatar click
            const avatarBtn = authContainer.querySelector('.profile-avatar-btn');
            const dropdownMenu = authContainer.querySelector('.profile-dropdown-menu');

            avatarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdownMenu.classList.toggle('open');
                avatarBtn.setAttribute('aria-expanded', isOpen);
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('open');
                avatarBtn.setAttribute('aria-expanded', 'false');
            });

            // Logout handler
            document.getElementById('nav-logout-btn').addEventListener('click', async () => {
                try {
                    await signOut(auth);
                    window.location.href = 'index.html';
                } catch (error) {
                    console.error('Logout Error:', error);
                }
            });

        } else {
            // User is signed out - show only login button
            authContainer.innerHTML = `
                <button class="btn btn-login-pill trigger-auth-login" onclick="window.openAuthModal && window.openAuthModal('login')">Log in</button>
            `;
            authContainer.style.display = 'flex';
            authContainer.style.alignItems = 'center';
        }
    }

    onAuthStateChanged(auth, (user) => {
        updateAuthUI(user);
    });

})();

