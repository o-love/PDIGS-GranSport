document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('eventSearchInput');
    const events = document.querySelectorAll('.event');

    function filterEvents() {
        const searchText = searchInput.value.toLowerCase();

        events.forEach(event => {
            const eventName = event.querySelector('h2').textContent.toLowerCase();
            if (eventName.includes(searchText)) {
                event.style.display = ''; // muestra el evento si el nombre coincide
            } else {
                event.style.display = 'none'; // oculta el evento si el nombre no coincide
            }
        });
    }

    searchInput.addEventListener('keyup', filterEvents);
});
