const { DeviceDiscovery } = require('sonos')
 

const getSonosDevice = () => new Promise((resolve, reject) => {
    try {
        DeviceDiscovery().once('DeviceAvailable', (device) => {
            return resolve(device);
        })
    } catch(e) {
        return reject(e);
    }
});

module.exports = getSonosDevice;