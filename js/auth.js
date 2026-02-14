// Auth.js - Converted from ES module to regular script
(function () {
    const FM = window.FirebaseMock;
    if (!FM) {
        console.error('FirebaseMock not loaded! Make sure firebase-mock.js is included before auth.js');
        return;
    }

    const { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, doc, setDoc, getDoc } = FM;

    // DOM Elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Sign Up
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            const errorMsg = document.getElementById('signup-error');
            const submitBtn = document.getElementById('signup-btn');

            // Reset error
            errorMsg.style.display = 'none';
            errorMsg.textContent = '';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Account...';

            try {
                // Check Role First
                if (role === 'seller') {
                    const params = new URLSearchParams();
                    if (name) params.append('name', name);
                    if (email) params.append('email', email);
                    window.location.href = `seller-register.html?${params.toString()}`;
                    return;
                }

                // 1. Create User in Firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 2. Update Display Name
                await updateProfile(user, {
                    displayName: name
                });

                // 3. Store Role in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                    role: role,
                    createdAt: new Date().toISOString()
                });

                console.log("User created:", user.uid, role);

                // 4. Redirect based on role
                window.location.href = 'index.html';

            } catch (error) {
                console.error("Signup Error:", error);
                errorMsg.textContent = error.message;
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Account';
            }
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('login-error');
            const submitBtn = document.getElementById('login-btn');

            errorMsg.style.display = 'none';
            errorMsg.textContent = '';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Fetch User Role
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log("User logged in:", userData.role);

                    if (userData.role === 'seller' || userData.role === 'manufacturer') {
                        window.location.href = 'seller-dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    window.location.href = 'index.html';
                }

            } catch (error) {
                console.error("Login Error:", error);
                errorMsg.textContent = "Invalid email or password.";
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Log In';
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                window.location.href = 'index.html';
            } catch (error) {
                console.error("Logout Error:", error);
            }
        });
    }

    // Global Auth State Observer
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user.email);
        } else {
            console.log("No user signed in");
        }
    });
})();
