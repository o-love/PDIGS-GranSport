import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence  } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import {db, auth} from "/js/firebaseIntegration.js";
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

export async function userSignup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario creado');

        // Usuario creado, ahora creamos su documento en Firestore
        const userDoc = doc(db, "users", userCredential.user.uid); // Usamos el UID del usuario como ID del documento
        await setDoc(userDoc, { email: email }, { merge: true }); // Utilizamos merge para no sobrescribir otros campos existentes
        console.log("Documento de usuario creado con éxito en Firestore");
        window.location.href = 'profile.html';
    } catch (error) {
        console.error('Error al crear el usuario o al guardar en Firestore:', error);
    }
}
export async function userSignIn(email, password) {
    try {
        await setPersistence(auth, browserLocalPersistence); // Cambio a persistencia local
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado:', userCredential.user);
        window.location.href = 'index.html';  // Redirección después de la autenticación exitosa
    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
    }
}

export async function userSignOut() {
    await signOut(auth)
        .then(() => {
            console.log('Usuario desconectado');
        })
        .catch(error => {
            console.error('Error al desconectar el usuario:', error);
        });
}

export function getUser() {
    return auth.currentUser;
}

export function isLoggedIn() {
    return !!getUser();
}

export { auth };
