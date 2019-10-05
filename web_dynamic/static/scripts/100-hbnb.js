const dict = {};
window.addEventListener('load', function() {
    $('.popover :checkbox').click(function () {
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
    $.ajax('http://127.0.0.1:5001/api/v1/status').done(function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
    
        } else {
            $('#api_status').removeClass('available');
        }
    });
    $('section.places').hide();
    $('.filters button').click(function () {
        $('section.places').show();
        $.ajax({type:'POST',
                url: 'http://127.0.0.1:5001/api/v1/places_search',
                contentType: 'application/json, charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({ amenities: Object.keys(dict) })
                }).done(function (data) {
                    const block_list = ''
                    for(const place of data) {
                        const name = place['name'];
                        const priceByNight = place['price_by_night'];
                        const maxGuest = place['max_guest'];
                        const numberRooms = place['number_rooms'];
                        const numberBRooms = place['number_bathrooms'];
                        const description = place['description'];
                        const block = `
  <article>
  <div class="title">
<h2>${place.name}</h2>
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
            $(block_list).append(block);
            }
            $('section-places').html(block_list);
                }
            }
        });
    });
    const stateId = {};
    const cityId = {};
    $('.popover .stateCheckBox').click(function () {
        console.log(Object.keys(stateId).length)
        if (this.checked) {
            stateId[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete stateId[$(this).attr('data-id')];
        } if (Object.keys(stateId).length === 0 && Object.keys(cityId).length === 0){
            $('div.locations h4').html('&nbsp');
        } else {
            $('div.locations h4').text(Object.values(stateId).concat(Object.values(cityId)).join(', '));
        }
    });
    $('.popover .cityCheckBox').click(function () {
        if (this.checked) {
            cityId[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete cityId[$(this).attr('data-id')];
        } if (Object.keys(cityId).length === 0 && Object.keys(stateId).length === 0){
            $('div.locations h4').html('&nbsp');
        } else {
          $('div.locations h4').text(Object.values(cityId).concat(Object.values(stateId)).join(', '));
        }
    });
});
