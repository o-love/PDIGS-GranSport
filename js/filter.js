document.getElementById('filterDate').addEventListener('change', function() {
    var selectedDate = this.value;
    var events = document.querySelectorAll('.event');
    events.forEach(function(event) {
        var eventDate = event.getAttribute('data-date');
        if (selectedDate === '' || selectedDate === eventDate) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
});