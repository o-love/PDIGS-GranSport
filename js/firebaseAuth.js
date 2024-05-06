import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, inMemoryPersistence } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import {auth} from "/js/firebaseIntegration.js";

export async function userSignup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuario creado');
        })
        .catch(error => {
            console.error('Error al crear el usuario:', error);
        });
}

export async function userSignIn(email, password) {
    await setPersistence(auth, inMemoryPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Usuario autenticado');
            })
            .catch(error => {
                console.error('Error al autenticar el usuario:', error);
            });
    });
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
