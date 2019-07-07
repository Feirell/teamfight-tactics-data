const https = require('https');
const fs = require('fs');

const ChainableError = require('chainable-error').Error;

exports.downloadToFile = (url, dest) => new Promise((res, rej) => {
    https.get(url, (response) => {
        const writeStream = fs.createWriteStream(dest);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
            writeStream.close(() => res(writeStream.path));
        });
    }).on('error', (err) => {
        fs.unlink(dest);
        rej(err);
    });
}).catch(err => { throw new ChainableError("Was not able to download '" + url + "' into file '" + dest + "'", err) });