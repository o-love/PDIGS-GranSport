
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js'
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAutUxkL9RIcGr-TVSeRwPqgt4V1k_wwb8",
    authDomain: "pigs-gran-sport.firebaseapp.com",
    projectId: "pigs-gran-sport",
    storageBucket: "pigs-gran-sport.appspot.com",
    messagingSenderId: "36117076546",
    appId: "1:36117076546:web:6565cba5cccff4b75d6bdb"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Add a new document with a generated ID
export async function addDocument(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).add(data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Get a document by ID
export async function getDocument(collectionName, id) {
    try {
        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document:", e);
    }
}


// Sign up new users
export async function signUp(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log("User created:", userCredential.user);
        return userCredential.user;
    } catch (e) {
        console.error("Error signing up:", e);
    }
}

// Sign in existing users
export async function signIn(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("User signed in:", userCredential.user);
        return userCredential.user;
    } catch (e) {
        console.error("Error signing in:", e);
    }
}


// Upload a file to Firebase Storage
export async function uploadFile(storagePath, file) {
    try {
        const storageRef = storage.ref(storagePath);
        const uploadTask = await storageRef.put(file);
        console.log("File uploaded to:", storagePath);
        return uploadTask;
    } catch (e) {
        console.error("Error uploading file:", e);
    }
}

// Get download URL for a file in Firebase Storage
export async function getFileUrl(storagePath) {
    try {
        const storageRef = storage.ref(storagePath);
        const url = await storageRef.getDownloadURL();
        console.log("Download URL:", url);
        return url;
    } catch (e) {
        console.error("Error getting file URL:", e);
    }
}



