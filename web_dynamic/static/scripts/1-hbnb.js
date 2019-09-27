const dict = {};

window.addEventListener('DOMContentLoaded', function() {
    $('input#INPUT').click(function (event) {
        console.log("we got inside func");
        if ('amenity.id' !== dict.entries()) {
            console.log("we got here");
            dict.remove('amenity.id');
        } else {
            dict.push('amenity.id');
        }
    });
});
