google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //     center: new google.maps.LatLng(40.754010, -73.988890),
    center: new google.maps.LatLng(38.569011, -96.320213),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');
  var data = new StoreLocatorDataSource;

//   console.log(panelDiv);
//   console.log(map);
//   console.log(data);
  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  new storeLocator.Panel(panelDiv, {
    view: view
  });
});
