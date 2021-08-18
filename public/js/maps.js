let platform = new H.service.Platform({
  'apikey': '{1ZbWVHFRYYM1YcPyxTCfInD5yoeL7tId59wA0ONHmtI}'
});


//reads name of landmark and searches it
function landmarkGeocode() {
    //only 1 h1 can be added to a page
    let title = document.querySelector('h1').textContent;
  var geocoder = platform.getSearchService(),
      landmarkGeocodingParameters = {
        q: title,
        at: '0,0',
        limit: 1
      };

  geocoder.discover(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}

function showMap(result){
    let location = result.response.view[0].result[0].place.locations[0].displayPosition;
    //layer of map created
    let defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: location.latitude , lng: location.longitude }
    });
    
    let marker = new H.map.Marker({lat:locations.latitude, lng: location.longitude});
    map.addObject(marker);
    // Create the default UI:
    let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();
