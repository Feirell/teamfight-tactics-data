const util = require('util');
const path = require('path');
const https = require('https');
const fs = require('fs');

const ChainableError = require('chainable-error').Error;
const downloadToFile = (url, dest) => new Promise((res, rej) => {
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

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const base = path.resolve(__dirname, '..');
const baseRel = p => path.resolve(base, p);

const baseRead = (p, encoding = 'utf-8') => readFile(baseRel(p), encoding);
const baseWrite = (p, data, encoding = 'utf-8') => writeFile(baseRel(p), data, encoding);

const jsonRead = async p => JSON.parse(await baseRead(p));
const jsonWrite = (p, data) => baseWrite(p, JSON.stringify(data, undefined, 2));

const readDataSet = async (name, locale) => {
    const dataSetProm = jsonRead(name + '.json');
    const localisationProm = jsonRead(name + '.' + locale + '.loc.json');

    const dataSet = await dataSetProm;
    const localisation = await localisationProm;

    return dataSet.map(d => ({ ...d, ...localisation[d.id] }));
};

module.exports = {
    downloadToFile,
    readFile,
    writeFile,
    base,
    baseRel,
    baseRead,
    baseWrite,
    jsonRead,
    jsonWrite,
    readDataSet
};