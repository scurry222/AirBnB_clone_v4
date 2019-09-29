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
