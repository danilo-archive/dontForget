(function (window) {

	//TODO: ADD TOKEN 
	const MAPBOX_TOKEN = "";
	const UPDATE_INTERVAL = 3500; //ms

	document.getElementById('map_tab').onclick = function () {

		var position = null;
		var socket = io();
		var mymap = L.map('mapid', { zoomControl: false, attributionControl: true }).setView([51.5130, -0.1162], 13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + MAPBOX_TOKEN, {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: 'your.mapbox.access.token'
		}).addTo(mymap);

		var lon = null;
		var lat = null;
		var newlon = null;
		var newlat = null;

		socket.on("send_location", function (data) {
			console.log("getting new location");
			newlon = data.lon;
			newlat = data.lat;
		})

		window.setInterval(function () {
			if (newlon != null && newlat != null) {
				if (!(newlon === lon && newlat === lat)) {
					lon = newlon;
					lat = newlat;
					if (position != null) {
						console.log("removing");
						mymap.removeLayer(position)
					}
					mymap.panTo(new L.LatLng(lon, lat));
					position = L.circleMarker(new L.LatLng(lon, lat), {
						color: '#3388ff'
					})
					mymap.addLayer(position);
				}
			}

			socket.emit('get_location')
		}, UPDATE_INTERVAL);
	}
})(this)
