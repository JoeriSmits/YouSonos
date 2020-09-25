const path = require('path');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const filenamify = require('filenamify');
const slugify = require('@sindresorhus/slugify');

module.exports = {
    getVideoAsMp4(youtubeId, userProvidedPath, title) {
        return new Promise((resolve, reject) => {
            const fileName = filenamify(slugify(title), { replacement: '-'});
            // const fileName = title;
            const filePath = path.join(userProvidedPath, `${fileName}.mp4`);

            // Create a reference to the stream of the video being downloaded.
            const videoObject = ytdl(youtubeId, { filter: 'audioonly', quality: 'highestaudio' });

            // Create write-able stream for the temp file and pipe the video stream into it.
            videoObject.pipe(fs.createWriteStream(filePath)).on('finish', () => {
                return resolve({ filePath, fileName});
            }).on('error', (e) => {
                return reject(e);
            });
        });
    },
    convertMp4ToMp3(mp4) {
        return new Promise(async (resolve, reject) => {
            const proc = await new ffmpeg(mp4.filePath).catch(e => reject(e));
            proc.fnExtractSoundToMP3(`./tmp/${mp4.fileName}.mp3`, (error, filePath) => {
                if(error) {
                    return reject(error);
                }
                return resolve({ filePath, fileName: mp4.fileName });
            });
        });
    },
    getVideoAsMp3(youtubeId) {
        return new Promise(async (resolve, reject) => {
            const info = await ytdl.getInfo(youtubeId);
    
            const mp4 = await this.getVideoAsMp4(youtubeId, "./tmp", info.videoDetails.title).catch(reject);
            const result = await this.convertMp4ToMp3(mp4).catch(reject);
            fs.unlinkSync(mp4.filePath);

            return resolve(result);
        });
    }
}
