/**
 * firebase-init.js — Evergrade Real Firebase Integration
 *
 * This file replaces firebase-mock.js entirely.
 * It uses the Firebase 9 Compat SDK (loaded via CDN in the HTML) and
 * exposes window.FirebaseMock with the SAME API shape as the mock,
 * so auth.js, auth-modal.js, nav-auth.js, seller-auth.js, and
 * dashboard.js all work without any changes.
 *
 * ─── HOW TO SET UP ────────────────────────────────────────────────
 * 1. Go to https://console.firebase.google.com
 * 2. Create a project (or open your existing one)
 * 3. Click "Add app" → Web → Register the app
 * 4. Copy the firebaseConfig object from the snippet shown
 * 5. Paste the values into the FIREBASE CONFIG section below
 * 6. In Firebase Console → Authentication → Sign-in method → enable "Email/Password"
 * 7. In Firebase Console → Firestore Database → Create database (start in test mode)
 * ──────────────────────────────────────────────────────────────────
 */

// ═══════════════════════════════════════════════════════════════════
//  FIREBASE CONFIG  ← Paste your real values here
// ═══════════════════════════════════════════════════════════════════
const firebaseConfig = {
    apiKey:            "AIzaSyCR0KLbh4-_xfNcukE40QPg0DiQhsaPCYM",
    authDomain:        "evergrade-c716e.firebaseapp.com",
    projectId:         "evergrade-c716e",
    storageBucket:     "evergrade-c716e.firebasestorage.app",
    messagingSenderId: "307999208769",
    appId:             "1:307999208769:web:2379c77d40b3438df09dc0",
    measurementId:     "G-NK0LY1Q60W"
};
// ═══════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // Guard: make sure Firebase compat SDK was loaded via CDN before this script
    if (typeof firebase === 'undefined') {
        console.error(
            '❌ Firebase SDK not found. Make sure the three Firebase CDN <script> tags ' +
            'appear BEFORE firebase-init.js in your HTML file.'
        );
        return;
    }

    // Warn if config is still a placeholder
    if (firebaseConfig.apiKey === 'YOUR_API_KEY') {
        console.warn(
            '⚠️  Firebase config is still using placeholder values. ' +
            'Open js/firebase-init.js and paste your real Firebase project config.'
        );
    }

    // ── Initialize ──────────────────────────────────────────────────
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const _auth = firebase.auth();
    const _db   = firebase.firestore();

    // ── Helper: normalise Firestore snapshot to the shape our JS expects ──
    function normaliseSnap(snap) {
        return {
            exists: () => snap.exists,   // mock used exists() as a function
            data:   () => snap.data()
        };
    }

    // ── Expose the same FirebaseMock API ────────────────────────────
    window.FirebaseMock = {

        // ── Raw instances (needed by dashboard.js & others) ──────────
        auth: _auth,
        db:   _db,

        // ── Auth functions ───────────────────────────────────────────
        onAuthStateChanged: (authInst, callback) => {
            return authInst.onAuthStateChanged(callback);
        },

        signInWithEmailAndPassword: (authInst, email, password) => {
            return authInst.signInWithEmailAndPassword(email, password);
        },

        createUserWithEmailAndPassword: (authInst, email, password) => {
            return authInst.createUserWithEmailAndPassword(email, password);
        },

        signOut: (authInst) => {
            return authInst.signOut();
        },

        // In compat SDK, updateProfile lives on the user object itself
        updateProfile: (user, profileUpdates) => {
            return user.updateProfile(profileUpdates);
        },

        // ── Firestore functions ──────────────────────────────────────

        // doc(db, collectionName, docId) → DocumentReference
        doc: (dbInst, collectionName, docId) => {
            return dbInst.collection(collectionName).doc(docId);
        },

        // getDoc(docRef) → { exists(), data() }  (matches mock shape)
        getDoc: async (docRef) => {
            const snap = await docRef.get();
            return normaliseSnap(snap);
        },

        // setDoc(docRef, data, options?)  — supports { merge: true }
        setDoc: (docRef, data, options) => {
            if (options && options.merge) {
                return docRef.set(data, { merge: true });
            }
            return docRef.set(data);
        },

        // collection(db, collectionName) → CollectionReference
        collection: (dbInst, collectionName) => {
            return dbInst.collection(collectionName);
        },

        // addDoc(collectionRef, data) → { id }
        addDoc: async (collRef, data) => {
            const ref = await collRef.add(data);
            return { id: ref.id };
        }
    };

    console.log('✅ Firebase initialised — using real Firebase project:', firebaseConfig.projectId);
})();
