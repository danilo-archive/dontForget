(function (window) {

	document.getElementById('map_tab').onclick = function () {


		/*var element = document.getElementsByTagName("ul"), index;

		for (index = element.length - 1; index >= 0; index--) {
			element[index].parentNode.removeChild(element[index]);
		}
		document.getElementsByClassName('list').outerHTML = ""*/


		var position = null;
		var socket = io();
		const mapbox_token = "pk.eyJ1IjoiZGFuaWxvLWRlbGJ1c3NvIiwiYSI6ImNqb2FtMm5oZzAzdmozcGw3aGJ1c3JpbHoifQ.9bU3Ql7zJvo3VsEQidcMNg"

		var mymap = L.map('mapid', { zoomControl: false, attributionControl: true }).setView([51.5130, -0.1162], 13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token, {
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
			newlon = 51.428489
			newlat = -0.571869
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
		}, 3500);
	}
})(this)
