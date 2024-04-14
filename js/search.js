document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const events = document.querySelectorAll(".event");

    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const matchingEvents = Array.from(events).filter(function(event) {
            const eventText = event.textContent.toLowerCase();
            return eventText.includes(searchTerm);
        });

        matchingEvents.length > 0 ? showEvents(matchingEvents) : showNoResultsMessage();
    });

    function showEvents(matchingEvents) {
        events.forEach(function(event) {
            event.style.display = matchingEvents.includes(event) ? "block" : "none";
        });
        noResultsMessage.style.display = "none";
    }

    function showNoResultsMessage() {
        events.forEach(function(event) {
            event.style.display = "none";
        });
        noResultsMessage.style.display = "block";
    }
});
