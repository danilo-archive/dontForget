var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs-extra');
var wav = require('wav');
//EXPRESS
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const RASPBERRY_IP = 'http://192.168.43.219'; //TODO: UPDATE WITH RASPBERRY'S IP (works with tunneling)

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

//SOCKET.IO-STREAM TO PI FOR AUDIO
var ss = require('socket.io-stream');
var socketio_stream = ss.createStream();
var socket_pi = require('socket.io-client').connect(RASPBERRY_IP + ':5050');



//SOCKET.IO TO DASHBOARD
io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on("get_location", function (data) {
    ss(socket_pi).emit("get_location")
  })

  socket_pi.on("send_location", function (data) {
    socket.emit("send_location", data)
  })
  
  
  socket.on('new_user', function (data) {

    var outFileName = "new_user.json"
    console.log(data);
    console.log("REGISTERING NEW USER");


    fs.writeFile(outFileName, JSON.stringify(data, null, 4)).then(() => {

      socketio_stream = ss.createStream();
      ss(socket_pi).emit('new_user_json', socketio_stream, { name: outFileName, data: data });
      fs.createReadStream(outFileName).pipe(socketio_stream);

      socketio_stream.on('end', function () {  //when we have sent the json, we send the picture
        console.log("new user json sent to raspberry");
        console.log("sending picture");

        picturePath = "public/pictures/" + data.filename;
        outFileName = data.filename;

        socketio_stream_picture = ss.createStream();
        ss(socket_pi).emit('new_picture', socketio_stream_picture, { name: outFileName, data: data });
        fs.createReadStream(picturePath).pipe(socketio_stream_picture);

        socketio_stream_picture.on('end', function () {
          console.log("Sent picture along with user json");
        })
      })
    });
  })
});


//MICROPHONE PROCESSING FUNCTIONALITY
binaryServer = BinaryServer({ port: 9001 });

binaryServer.on('connection', function (client) {

  console.log("NEW CONNECTION!");
  console.log("------------------");
  var outFile = "voice_message.wav"
  var fileWriter = new wav.FileWriter(outFile, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });


  client.on('stream', function (stream, meta) {

    console.log('new stream');
    stream.pipe(fileWriter);

    stream.on('end', function () {
      console.log("finished recording");
      socketio_stream = ss.createStream();
      ss(socket_pi).emit('play-audio', socketio_stream, { name: outFile });
      fs.createReadStream(outFile).pipe(socketio_stream);
      console.log('wrote to file ' + outFile);

      socketio_stream.on('end', function () {
        console.log("audio sent to raspberry");
      })

    });


  });
});





