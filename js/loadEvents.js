// Importar la instancia de Firestore desde firebaseIntegration.js
import {db} from './firebaseIntegration.js';
import {collection, getDocs} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

async function fetchEvents() {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        querySnapshot.forEach(doc => {
            const event = doc.data();
            createEventElement(event);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

function createEventElement(event) {
    const article = document.createElement('article');
    article.className = 'event';

    const title = document.createElement('h2');
    title.textContent = event.name;

    // Contenedor principal para la información del evento
    const eventInfo = document.createElement('div');
    eventInfo.className = 'event-info';

    // Contenedor de imágenes
    const eventImageContainer = document.createElement('div');
    eventImageContainer.className = 'event-image-container';
    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'images';

    // Agregar las imágenes
    const img1 = document.createElement('img');
    img1.src = `${event.image_url}/img1.png`;
    img1.alt = event.name;
    img1.className = 'event-image visible';

    const img2 = document.createElement('img');
    img2.src = `${event.image_url}/img2.png`;
    img2.alt = event.name;
    img2.className = 'event-image';

    const img3 = document.createElement('img');
    img3.src = `${event.image_url}/img3.png`;
    img3.alt = event.name;
    img3.className = 'event-image';

    imagesDiv.appendChild(img1);
    imagesDiv.appendChild(img2);
    imagesDiv.appendChild(img3);

    // Botones de navegación
    const prevButton = document.createElement('button');
    prevButton.className = 'prev';
    prevButton.textContent = '❮';

    const nextButton = document.createElement('button');
    nextButton.className = 'next';
    nextButton.textContent = '❯';

    eventImageContainer.appendChild(imagesDiv);
    eventImageContainer.appendChild(prevButton);
    eventImageContainer.appendChild(nextButton);

    // Suponiendo que event.date es un objeto Timestamp de Firestore
    const dateObject = event.date.toDate(); // Convertir Timestamp a objeto Date de JavaScript

    // Formatear la fecha a un formato más legible
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    const formattedDate = dateObject.toLocaleDateString('en-EN', options); // Asumiendo que quieres el formato en español

    // Crear el elemento p y asignarle el contenido
    const dateTime = document.createElement('p');
    dateTime.className = 'event-date-time';
    dateTime.innerHTML = `<i class="far fa-calendar-alt" aria-hidden="true" style="margin-right: 10px"></i> ${formattedDate}`;

    const description = document.createElement('p');
    description.className = 'event-description';
    description.innerHTML = `<i class="fas fa-info-circle" aria-hidden="true" style="margin-right: 10px"></i> ${event.description}`;

    const price = document.createElement('p');
    price.className = 'event-price';
    price.innerHTML = `<i class="fas fa-ticket-alt" aria-hidden="true" style="margin-right: 10px"></i> Price: ${event.price} €`;

    // Asegúrate de formatear correctamente la localización
    const latitude = event.location.latitude;
    const longitude = event.location.longitude;
    const formattedLocation = `${Math.abs(latitude)}º ${latitude >= 0 ? 'N' : 'S'}, ${Math.abs(longitude)}º ${longitude >= 0 ? 'E' : 'W'}`;

    /*const location = document.createElement('p');
    location.className = 'event-location';
    location.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> Location: ${formattedLocation}`;
*/
    const detailsLink = document.createElement('a');
    detailsLink.href = `event-details.html?name=${encodeURIComponent(event.name)}&date=${encodeURIComponent(event.date.toDate())}&description=${encodeURIComponent(event.description)}&price=${encodeURIComponent(event.price)}&image_url=${encodeURIComponent(event.image_url)}&location=${encodeURIComponent(formattedLocation)}&max_participants=${encodeURIComponent(event.max_participants)}`;
    detailsLink.className = 'details-link';
    detailsLink.innerHTML = `<i class="fas fa-arrow-circle-right" aria-hidden="true" style="margin-right: 10px"></i> More Details`;

    // Agregar todo al contenedor de información del evento
    eventInfo.appendChild(eventImageContainer);
    eventInfo.appendChild(dateTime);
    eventInfo.appendChild(description);
    eventInfo.appendChild(price);
/*
    eventInfo.appendChild(location);
*/
    eventInfo.appendChild(detailsLink);

    // Componer el artículo completo
    article.appendChild(title);
    article.appendChild(eventInfo);

    const eventListContainer = document.getElementById('eventList');
    eventListContainer.appendChild(article);
}



document.addEventListener('DOMContentLoaded', fetchEvents);
