import { db } from '/js/firebaseIntegration.js';

document.addEventListener('DOMContentLoaded', function () {
    const eventListContainer = document.getElementById('eventList');

    // Function to fetch events from Firestore
    async function fetchEvents() {
        const snapshot = await db.collection('events').get();
        snapshot.forEach(doc => {
            const event = doc.data();
            eventListContainer.appendChild(createEventElement(event));
        });
    }

    // Function to create HTML for each event
    function createEventElement(event) {
        const article = document.createElement('article');
        article.className = 'event';

        const title = document.createElement('h2');
        title.textContent = event.name;

        const image = document.createElement('img');
        image.src = event.image_url || '/img/default-image.png'; // Fallback image if none is provided
        image.alt = event.name;
        image.className = 'event-image';

        const dateTime = document.createElement('p');
        dateTime.className = 'event-date-time';
        dateTime.innerHTML = `<i class="fa fa-calendar" aria-hidden="true"></i> ${event.date}`;

        const description = document.createElement('p');
        description.className = 'event-description';
        description.innerHTML = `<i class="fa fa-info-circle" aria-hidden="true"></i> ${event.description}`;

        const price = document.createElement('p');
        price.className = 'event-price';
        price.innerHTML = `<i class="fa fa-ticket" aria-hidden="true"></i> Price: ${event.price}`;

        const detailsLink = document.createElement('a');
        detailsLink.href = 'event-details.html';
        detailsLink.className = 'details-link';
        detailsLink.innerHTML = `<i class="fa fa-arrow-right" aria-hidden="true"></i> More Details`;

        article.appendChild(image);
        article.appendChild(title);
        article.appendChild(dateTime);
        article.appendChild(description);
        article.appendChild(price);
        article.appendChild(detailsLink);

        return article;
    }

    // Call the function to fetch events when the page loads
    fetchEvents();
});
