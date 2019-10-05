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
$(document).ready(function() {
    $('.filters button').click(function () {
        $.ajax({type:'POST',
                url: 'http://127.0.0.1:5001/api/v1/places_search',
                contentType: 'application/json, charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({ amenities: Object.keys(dict) })
                }).done(function (data) {
                    const blocks = '';
                    for(const place of data) {
                        const name = place['name'];
                        const priceByNight = place['price_by_night'];
                        const maxGuest = place['max_guest'];
                        const numberRooms = place['number_rooms'];
                        const numberBRooms = place['number_bathrooms'];
                        const description = place['description'];
                        let block = `
  <article>
  <div class="title">
<h2>${name}</h2>
        <div class="price_by_night">
      ${priceByNight}
      </div>
</div>
  <div class="information">
    <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
        <br />
      ${maxGuest} Guests
      
      </div>
<div class="number_rooms">
  <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
        <br />
      ${numberRooms} Bedrooms
      </div>
<div class="number_bathrooms">
  <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
        <br />
      ${numberBRooms} Bathroom
         </div>
      </div>
      </div>
     <div class="description">
      ${description}
      </div>
</article>
`;
        $(blocks).append(block);
                }
        $('section.places').html(blocks);
        });
    });
});
