const dict = {};
$(document).ready(function() {
    $('.popover :checkbox').change(function () {
        if (this.checked) {
                dict[$(this).attr('data-id')] = $(this).attr('data-name');
            } else {
            delete dict[$(this).attr('data-id')];
        }
    });
});
