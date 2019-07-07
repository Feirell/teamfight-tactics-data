const path = require('path');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const base = path.resolve(__dirname, '..');

const read = async p => JSON.parse(await readFile(path.resolve(base, p)));
const write = (p, data) => writeFile(path.resolve(base, p), JSON.stringify(data, undefined, 2), 'utf8');

const readDataSet = async (name, locale) => {
    const dataSetProm = read(name + '.json');
    const localisationProm = read(name + '.' + locale + '.loc.json');

    const dataSet = await dataSetProm;
    const localisation = await localisationProm;

    return dataSet.map(d => ({ ...d, ...localisation[d.id] }));
}

(async () => {
    const locale = "en_EN";

    const combined = {
        classes: readDataSet('classes', locale),
        champions: readDataSet('champions', locale),
        itemBase: readDataSet('items-base', locale),
        itemCombined: readDataSet('items-combined', locale)
    };

    for (const [k, v] of Object.entries(combined))
        combined[k] = await v;

    await write('combined.' + locale + '.json', combined);
})().catch(console.error);