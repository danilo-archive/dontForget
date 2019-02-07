//socket.io-stream
var io = require('socket.io').listen(5050);
var ss = require('socket.io-stream');
var path = require('path');
const fs = require("fs-extra")
const player = require('node-wav-player');


io.on('connection', function (socket) {
    console.log("somebody connected!");

    ss(socket).on('get_location', function(stream, d){
        console.log("received get_location request");
        
        fs.readFile('python/pythonShit/config/locationLog.json', function(err, data){
            obj = JSON.parse(data);
            console.log("sending last location");
            
            console.log(obj.locations[0].location);
           // console.log(socket);

            socket.emit("send_location", obj.locations[0].location)
        })

    })

    ss(socket).on('new_picture', function (stream, data) {
        var filename = data.name

        stream.pipe(fs.createWriteStream("rsc/pictures/" + filename));
        stream.on('end', function () {
            console.log("Received new picture");
        });
    })

    ss(socket).on('new_user_json', function (stream, data) {
        var filename = data.name    
        stream.pipe(fs.createWriteStream('useless.txt'))
        data.data.filename = "../rsc/pictures/"+ data.data.filename;
        
        fs.readFile('rsc/users.json', function (err, d) {
            var json = JSON.parse(d)
            json.push(data.data)
            fs.writeFile("rsc/users.json", JSON.stringify(json,null,4)).then(() =>{
                console.log("updated user.json");
            })
        })
    })
    

    ss(socket).on('play-audio', function (stream, data) {
        var filename = data.name
        console.log(filename);
        
        stream.pipe(fs.createWriteStream("voice_message/" + filename));

        stream.on('end', function () {
            console.log("received new audio file");
            console.log("now playing ");
            player.play({
                path: "./client/"+filename,
            }).then(() => {
                console.log('The wav file started to be played successfully.');
                
            }).catch((error) => {
                console.error(error);
            });
    });

})

  
});
