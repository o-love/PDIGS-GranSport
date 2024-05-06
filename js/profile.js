// userProfile.js
import { doc, setDoc, getDoc, deleteDoc} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { db } from './firebaseIntegration.js'; // Asegúrate que las rutas sean correctas
import { deleteUser } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

export async function updateProfile(userId, profileData) {
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, profileData, { merge: true });
        console.log('Perfil actualizado con éxito');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
    }
}
export async function loadUserData(userId) {
    const userRef = doc(db, 'users', userId);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            // Verifica si userData.name tiene un valor, si no, establece el texto como 'No specify'
            document.getElementById('displayName').textContent = userData.name ? userData.name : 'No specify';
            document.getElementById('displaySurname').textContent = userData.surname || 'No specify';
            document.getElementById('displayBirthdate').textContent = userData.birthdate || 'No specify';
            document.getElementById('displayEmail').textContent = userData.email || 'No specify';
        } else {
            console.log('No data found for user.');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

export async function deleteUserAccount(user) {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
            await deleteDoc(userDocRef);
            await deleteUser(user);
            alert('Account deleted successfully.');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account.');
        }
    }
}
