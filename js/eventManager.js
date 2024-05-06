import { db } from "/js/firebaseIntegration.js";
import {getUser} from "/js/firebaseAuth.js";

import { doc, collection, arrayUnion, setDoc, getDoc, deleteDoc} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';


import {runTransaction} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

export function signUpToEvent(eventId) {
    const eventRef = doc(db, 'events', eventId);
    const usersRef = collection(db, `events/${eventId}/users`);

    return runTransaction(db, async (transaction) => {

        const userId = getUser().uid;
        const eventDoc = await transaction.get(eventRef);

        if (!eventDoc.exists) {
            throw "Event does not exist!";
        }

        const eventData = eventDoc.data();
        console.log(eventData.users)
        const currentParticipants = usersRef.count().get();
        if (currentParticipants >= eventData.maxParticipants) {
            throw "Event is full!";
        }

        const userRegistrationRef = doc(db, `events/${eventId}/users`, userId);

        transaction.set(userRegistrationRef, {
            hasPaid: false,
        })
    }).then(() => {
        console.log("Signed up successfully!");
    }).catch((error) => {
        console.error("Failed to sign up:", error);
    });
}
