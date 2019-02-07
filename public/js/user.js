(function (window) {
    
    document.getElementById('submit_tab').onclick = function() {

	    var socket = io();

	    document.getElementById('picture').onchange = function() {
	    	pic = document.getElementById("picture").value
	        p = pic.split("\\");
	        pict = p[p.length-1];

	    	document.getElementById("submit_preview").style.background = 'url(../pictures/'+pict+') no-repeat 0px 0px/contain';  
	    };	

	    document.getElementById("register_submit").onclick = function () {
	        name = document.getElementById('submit_name').value
	        relationship = document.getElementById("submit_relationship").value
	        pic = document.getElementById("picture").value
	        p = pic.split("\\");
	        picture = p[p.length-1];

	        if (name === "" || relationship === "") {
	            alert("Please fill all fields when registering a new user")    
	        }
	        else {
	            socket.emit('new_user',{ personName : name, relationship : relationship, filename : picture });
	            console.log(picture)
	            document.getElementById('submit_name').value = ""
	            document.getElementById("submit_relationship").value = ""
	            document.getElementById("picture").value = ""			
	            document.getElementById("submit_preview").style.background = 'url(../images/background_tile.png) repeat'

	        }

	        return false
	    }
   }


})(this)
