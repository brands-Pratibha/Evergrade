// Seller Auth.js - Converted from ES module to regular script
(function () {
    const FM = window.FirebaseMock;
    if (!FM) {
        console.error('FirebaseMock not loaded! Make sure firebase-mock.js is included before seller-auth.js');
        return;
    }

    const { auth, db, createUserWithEmailAndPassword, updateProfile, doc, setDoc } = FM;

    // Event Listeners for wizard nav (dispatched from inline HTML)
    document.addEventListener('wizard-next', (e) => handleNext(e.detail.step));
    document.addEventListener('wizard-prev', (e) => handlePrev(e.detail.step));

    const totalSteps = 3;

    function updateProgress(step) {
        // Update Indicators
        document.querySelectorAll('.step-indicator').forEach(el => {
            const s = parseInt(el.dataset.step);
            el.classList.remove('active', 'completed');
            if (s === step) el.classList.add('active');
            if (s < step) el.classList.add('completed');
        });

        // Update Bar
        const percent = ((step - 1) / (totalSteps - 1)) * 100;
        document.getElementById('progress-fill').style.width = percent + '%';

        // Show Step
        document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
        document.getElementById(`step-${step}`).classList.add('active');
    }

    function validateStep(step) {
        let isValid = true;
        let errorMsg = '';
        const errDiv = document.getElementById(`step-${step}-error`);

        if (step === 1) {
            const name = document.getElementById('w-name').value;
            const email = document.getElementById('w-email').value;
            const mobile = document.getElementById('w-mobile').value;
            const pass = document.getElementById('w-password').value;
            if (!name || !email || !mobile || !pass) {
                isValid = false; errorMsg = 'Please fill all required fields.';
            } else if (pass.length < 6) {
                isValid = false; errorMsg = 'Password must be at least 6 characters.';
            }
        } else if (step === 2) {
            const company = document.getElementById('w-company').value;
            const type = document.getElementById('w-business-type').value;
            const city = document.getElementById('w-city').value;
            const state = document.getElementById('w-state').value;
            const country = document.getElementById('w-country').value;
            const pin = document.getElementById('w-pincode').value;

            if (!company || !type || !city || !state || !country || !pin) {
                isValid = false; errorMsg = 'Please fill all required business details.';
            }
        } else if (step === 3) {
            const cat = document.getElementById('w-category').value;
            const prods = document.getElementById('w-category').value;
            if (!cat || !prods) {
                isValid = false; errorMsg = 'Please select a category and products.';
            }
        }

        if (!isValid) {
            errDiv.textContent = errorMsg;
            errDiv.style.display = 'block';
        } else {
            errDiv.style.display = 'none';
        }
        return isValid;
    }

    function handleNext(currentStep) {
        if (validateStep(currentStep)) {
            updateProgress(currentStep + 1);
        }
    }

    function handlePrev(currentStep) {
        updateProgress(currentStep - 1);
    }

    // Form Submission
    const form = document.getElementById('seller-wizard-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateStep(3)) return;

            const submitBtn = document.getElementById('final-submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';
            const errDiv = document.getElementById('step-3-error');

            try {
                // Gather Data
                const email = document.getElementById('w-email').value;
                const mobile = document.getElementById('w-mobile').value;
                const password = document.getElementById('w-password').value;
                const name = document.getElementById('w-name').value;

                const businessData = {
                    companyName: document.getElementById('w-company').value,
                    businessType: document.getElementById('w-business-type').value,
                    gst: document.getElementById('w-gst').value,
                    country: document.getElementById('w-country').value,
                    pincode: document.getElementById('w-pincode').value,
                    city: document.getElementById('w-city').value,
                    state: document.getElementById('w-state').value,
                    category: document.getElementById('w-category').value,
                    products: document.getElementById('w-products').value
                };

                // 1. Create Auth User
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 2. Update Profile
                await updateProfile(user, { displayName: name });

                // 3. Create User Doc (Role = Seller)
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                    phone: mobile,
                    role: 'seller',
                    createdAt: new Date().toISOString()
                });

                // 4. Create Seller Doc
                await setDoc(doc(db, "sellers", user.uid), {
                    ...businessData,
                    userId: user.uid,
                    status: 'pending',
                    rating: 0,
                    joinedAt: new Date().toISOString()
                });

                // Success Redirect
                window.location.href = 'seller-dashboard.html';

            } catch (error) {
                console.error("Registration Error", error);
                errDiv.textContent = error.message;
                errDiv.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Complete Registration';
            }
        });
    }

    // Pre-fill from URL params
    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const email = params.get('email');

        if (name) {
            const nameInput = document.getElementById('w-name');
            if (nameInput) nameInput.value = name;
        }
        if (email) {
            const emailInput = document.getElementById('w-email');
            if (emailInput) emailInput.value = email;
        }
    });
})();
