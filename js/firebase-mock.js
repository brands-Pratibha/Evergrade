// Mock Firebase Implementation using LocalStorage
// This file creates a global window.FirebaseMock object

console.warn("⚠️ USING MOCK FIREBASE - Authentication and Data are simulated locally.");

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth Implementation ---

class MockAuth {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('mockAuthUser')) || null;
        this.listeners = [];
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.currentUser));
    }

    async _updateCurrentUser(user) {
        this.currentUser = user;
        if (user) {
            localStorage.setItem('mockAuthUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('mockAuthUser');
        }
        this.notifyListeners();
    }
}

const auth = new MockAuth();

const onAuthStateChanged = (authInstance, callback) => {
    authInstance.listeners.push(callback);
    // Initial callback
    callback(authInstance.currentUser);
    // Return unsubscribe function
    return () => {
        authInstance.listeners = authInstance.listeners.filter(cb => cb !== callback);
    };
};

const signInWithEmailAndPassword = async (authInstance, email, password) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const authUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: null,
            emailVerified: true
        };
        await authInstance._updateCurrentUser(authUser);
        return { user: authUser };
    } else {
        throw new Error("Invalid email or password (MOCK). Tip: Create an account first.");
    }
};

const createUserWithEmailAndPassword = async (authInstance, email, password) => {
    await delay(800);
    const users = JSON.parse(localStorage.getItem('mockUsers')) || [];

    if (users.find(u => u.email === email)) {
        throw new Error("Email already in use (MOCK).");
    }

    const newUser = {
        uid: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email,
        password: password,
        displayName: null
    };

    users.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(users));

    const authUser = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: null,
        photoURL: null,
        emailVerified: true
    };

    await authInstance._updateCurrentUser(authUser);
    return { user: authUser };
};

const signOut = async (authInstance) => {
    await delay(200);
    await authInstance._updateCurrentUser(null);
};

const updateProfile = async (user, profileUpdates) => {
    await delay(300);
    if (!auth.currentUser) return;

    const users = JSON.parse(localStorage.getItem('mockUsers')) || [];
    const dbUserIdx = users.findIndex(u => u.uid === user.uid);

    const updatedUser = { ...auth.currentUser, ...profileUpdates };
    auth._updateCurrentUser(updatedUser);

    if (dbUserIdx !== -1) {
        users[dbUserIdx] = { ...users[dbUserIdx], ...profileUpdates };
        localStorage.setItem('mockUsers', JSON.stringify(users));
    }
};

// --- Firestore Implementation ---

const db = {};

const doc = (db, collection, id) => {
    return { path: `${collection}/${id}`, id, collection };
};

const getDoc = async (docRef) => {
    await delay(300);
    const storageKey = `mockDB_${docRef.collection}`;
    const collectionData = JSON.parse(localStorage.getItem(storageKey)) || {};
    const data = collectionData[docRef.id];

    return {
        exists: () => !!data,
        data: () => data
    };
};

const setDoc = async (docRef, data, options) => {
    await delay(300);
    const storageKey = `mockDB_${docRef.collection}`;
    let collectionData = JSON.parse(localStorage.getItem(storageKey)) || {};

    if (options && options.merge) {
        collectionData[docRef.id] = { ...collectionData[docRef.id], ...data };
    } else {
        collectionData[docRef.id] = data;
    }

    localStorage.setItem(storageKey, JSON.stringify(collectionData));
};

const collection = (db, collectionName) => {
    return { collectionName };
};

const addDoc = async (collectionRef, data) => {
    await delay(400);
    const storageKey = `mockDB_${collectionRef.collectionName}`;
    let collectionData = JSON.parse(localStorage.getItem(storageKey)) || {};

    const newId = 'doc_' + Math.random().toString(36).substr(2, 9);
    collectionData[newId] = data;

    localStorage.setItem(storageKey, JSON.stringify(collectionData));
    return { id: newId };
};

// Expose everything globally
window.FirebaseMock = {
    auth,
    db,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc
};
