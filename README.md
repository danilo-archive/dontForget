# dontForget [![](https://imgur.com/CxQR0Xd.png)](https://www.raspberrypi.org/)
## Facial detection, voice commands, and text-to-speech helper. 

[![dontForget](https://imgur.com/fomWtCy.png)](https://devpost.com/software/don-t-forget-etz6mh)

Entry for [Royal Hackaway v2.0](https://royalhackaway.com/hackaway2019) ||| [DEVPOST](https://devpost.com/software/don-t-forget-etz6mh)
<br>
<hr>

### What is it💡

While the potential of this system is limitless, right now it has three main commands:

 *   A panic command, that alerts a selected number with the system's location.
 *   A facial recognition sensor, that also says who the camera is looking at out loud.
 *   A location detector, that says out loud where the system is based on IP address geolocation.

All of these are connected to a react web app that can broadcast messages to the system, add new people to the facial recognition system, and track the location of the system in near real time.


### Why ❓

Alzheimer's patients suffer from chronic memory loss amongst other things, and are sometimes unable to remember even their loved ones, or find themselves in situations where they don't know what to do or where they are. This project provides a simple-to-use system that solves all three of these.
<br>
<hr>

### How to use it 👨‍👩‍💻

##### on the frontend client:
*The dasbhoard is hosted on ```localhost:3000```*

*To run it*
```
node app.js
```

##### on the RaspberryPi: [![](https://imgur.com/CxQR0Xd.png)](https://www.raspberrypi.org/)
*For facial recognition and text-to-speech run the main.py:*
```
python3 main.py
```
*For speech-to-text fucntionality (voice commands such as the panic command):*
```
python3 main2.py
```
*For communication with the client (dasboard)*
```
sudo node client.js
```
<hr>

### ⚠WARNING⚠

This build is highly unstable as it was developed in 24 hours.

All the developers were high on ☕☕ caffeine ☕☕ and barely made it out alive.

Use at your own risk.

###### (Almost) No front-end developers were hurt during the development process.

