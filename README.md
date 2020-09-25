# YouSonos

Prototyping project to stream youtube videos to a SONOS device. This project gets the information from youtube based on ID, downloads the video, converts it to MP3 and enables it for SONOS.

`npm install`

`npm run debug`

Files downloaded and codec converted are temporarely stored in the `/tmp` directory. An express server enables this folder over the network.
Sonos will retrieve the file from the web server.

## future ideas
* A UI where the user can search for youtube videos and send them to SONOS. Also a progress indication would be nice because some videos (1h or longer) can take some time to download.
* Make basic controls for SONOS to replace the official SONOS connect app.
* Add support for other streaming services preferably Spotify. This would be not that difficult since Sonos can directly accept a spotify URI.


(c) Copyright Joeri Smits 2020
