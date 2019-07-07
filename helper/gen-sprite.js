const path = require('path');
const util = require('util');
const fs = require('fs');

const spritesmith = require('spritesmith');

const { readDataSet, jsonWrite, baseWrite, baseRel } = require('./util-node');
const { downloadItemImages } = require('./download-images');
const { scaleImages } = require('./scale-images');

const createSprite = util.promisify(spritesmith.run.bind(spritesmith));
const mkdir = util.promisify(fs.mkdir);

const imageDirectoryPath = baseRel('item-images');

(async () => {
    // read the items
    const itemsBaseProm = readDataSet('items-base', 'en_EN');
    const itemsCombinedProm = readDataSet('items-combined', 'en_EN');

    const items = [
        ...await itemsBaseProm,
        ...await itemsCombinedProm
    ];

    // create the image dir
    await mkdir(imageDirectoryPath, { recursive: true });

    // download images
    const itemPaths = await downloadItemImages(items, imageDirectoryPath);

    const paths = itemPaths.map(ip => ip.path);

    // scale them all to 50px x 50px, overwriting the images
    await scaleImages(paths, n => n, 50);

    // combine them to one sprite
    const result = await createSprite({ src: paths });

    // write the sprite image to its file
    await baseWrite('items-sprite.png', result.image, undefined);

    // transform coords so they use the item id instead of the path
    const mappedCoords = {};

    for (const [key, value] of Object.entries(result.coordinates))
        for (const { item, path } of itemPaths)
            if (path == key) {
                mappedCoords[item.id] = value;
                break;
            }

    // write the map to its file
    await jsonWrite('items-sprite.map.json', mappedCoords);
})().catch(console.error);