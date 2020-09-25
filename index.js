const getSonosDevice = require('./lib/sonos');
const youtubeMp3 = require('./lib/youtubeMp3');
const express = require('express');

const main = async () => {
    const sonos = await getSonosDevice().catch(e => {
        throw new Error(e);
    });
    try {
        const mp3 = await youtubeMp3.getVideoAsMp3("ITW3unj61rg");
        sonos.play(`http://192.168.1.74:3000/${mp3.fileName}.mp3`);
    } catch(e) {
        console.log(e)
    }

}

const app = express();
app.use(express.static(__dirname + '/tmp'));
app.listen(3000);

main();