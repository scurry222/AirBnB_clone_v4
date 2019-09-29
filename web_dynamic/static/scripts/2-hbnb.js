const dict = {};
$(document).ready(function() {
    $('.popover :checkbox').change(function () {
        if (this.checked) {
                dict[$(this).attr('data-id')] = $(this).attr('data-name');
            } else {
            delete dict[$(this).attr('data-id')];
        } if (Object.keys(dict).length === 0) {
            $('div.amenities h4').html('&nbsp');
        } else {
          $('div.amenities h4').text(Object.values(dict).join(', '));
        }
    });
});
$(document).ready(function() {
    $.ajax('http://127.0.0.1:5001/api/v1/status').done(function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
    
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
