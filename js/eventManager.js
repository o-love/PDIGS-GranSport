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

        const eventData = eventDoc.data()

        if (userId in eventData.participantsIds)
        {
            alert("Payment cancelled: You are already signed up to the event");
            window.location.href = 'index.html';
            return;
        }

        const currentParticipants = eventData.participantsIds.length;
        if (currentParticipants >= eventData.maxParticipants) {
            alert("Event is full");
            window.location.href = 'index.html';
            return;
        }

        const userRegistrationRef = doc(db, `events/${eventId}/users`, userId);

        transaction.update(eventRef, { participantsIds: arrayUnion(userId) });
        transaction.set(userRegistrationRef, {
            hasPaid: true,
        })
    }).then(() => {
        console.log("Signed up successfully!");

        alert("Payment was successful!\nYou are now signed up.");
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Failed to sign up:", error);

        alert("There was an error signing up! Please try again.");
    });
}