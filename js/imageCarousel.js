function setupCarousel() {
    const containers = document.querySelectorAll('.event-image-container');

    containers.forEach(container => {
        const images = container.querySelectorAll('.event-image');
        let index = 0; // Índice de la imagen actual visible

        function showImage(newIndex) {
            images[index].classList.remove('visible'); // Elimina la clase visible de la imagen actual
            images[newIndex].classList.add('visible'); // Añade la clase visible a la nueva imagen
            index = newIndex; // Actualiza el índice de la imagen visible
        }

        container.querySelector('.prev').addEventListener('click', () => {
            const newIndex = index - 1 < 0 ? images.length - 1 : index - 1;
            showImage(newIndex);
        });

        container.querySelector('.next').addEventListener('click', () => {
            const newIndex = (index + 1) % images.length;
            showImage(newIndex);
        });

        
        setInterval(() => {
            const newIndex = (index + 1) % images.length;
            showImage(newIndex);
        }, 5000);
    });
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            setupCarousel();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
