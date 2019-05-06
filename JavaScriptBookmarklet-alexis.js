/* eslint-disable */
javascript: (function () { addBooking = function myModifiedAddBooking(id) { $.get(`https://s2qyi75vsa.execute-api.eu-west-2.amazonaws.com/sandbox/classes?user=alexis&classes=${id}`).always(function () { alert('Booking add to scheduling queue'); });; }; alert('Booking process overriden'); }());
