// firebaseIntegration.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAutUxkL9RIcGr-TVSeRwPqgt4V1k_wwb8",
    authDomain: "pigs-gran-sport.firebaseapp.com",
    projectId: "pigs-gran-sport",
    storageBucket: "pigs-gran-sport.appspot.com",
    messagingSenderId: "36117076546",
    appId: "1:36117076546:web:6565cba5cccff4b75d6bdb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
