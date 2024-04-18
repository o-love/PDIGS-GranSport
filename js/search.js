// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
    var searchTerm = document.getElementById('searchInput').value;
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        var title = card.querySelector('h3').innerText;
        if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Event listener for the date button
document.getElementById('dateButton').addEventListener('click', function() {
    var dateRange = document.getElementById('calendar').value.split(' to ');
    var startDate = new Date(dateRange[0].split('-').reverse().join('-'));
    var endDate = new Date(dateRange[1].split('-').reverse().join('-'));
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        var eventDate = new Date(card.getAttribute('data-date').split('-').reverse().join('-'));
        if (eventDate >= startDate && eventDate <= endDate) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Initialize Flatpickr with range mode
flatpickr("#calendar", {
    mode: "range",
    dateFormat: "d-m-Y"
});