const path = require('path');
const util = require('util');
const fs = require('fs');

const spritesmith = require('spritesmith');

const { downloadItemImages } = require('./download-images');
const { scaleImages } = require('./scale-images');

const createSprite = util.promisify(spritesmith.run.bind(spritesmith));
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const base = path.resolve(__dirname, '..');

const itemsBasePath = path.resolve(base, 'items-base.json');
const itemsBaseLocPath = path.resolve(base, 'items-base.en_EN.loc.json');
const itemsCombinedPath = path.resolve(base, 'items-combined.json');
const itemsCombinedLocPath = path.resolve(base, 'items-combined.en_EN.loc.json');

const imageDirectoryPath = path.resolve(base, 'item-images');
const spritePath = path.resolve(base, 'items-sprite.png');
const spriteMapPath = path.resolve(base, 'items-sprite.map.json');

(async () => {
    // read the items
    const itemsBaseProm = readFile(itemsBasePath);
    const itemsBaseLocProm = readFile(itemsBaseLocPath);
    const itemsCombinedProm = readFile(itemsCombinedPath);
    const itemsCombinedLocProm = readFile(itemsCombinedLocPath);

    const itemsBase = JSON.parse(await itemsBaseProm);
    const itemsBaseLoc = JSON.parse(await itemsBaseLocProm);
    const itemsCombined = JSON.parse(await itemsCombinedProm);
    const itemsCombinedLoc = JSON.parse(await itemsCombinedLocProm);

    const items = [
        ...itemsBase.map(item => ({ ...item, ...itemsBaseLoc[item.id] })),
        ...itemsCombined.map(item => ({ ...item, ...itemsCombinedLoc[item.id] }))
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
    await writeFile(spritePath, result.image);

    // transform coords so they use the item id instead of the path
    const mappedCoords = {};

    for (const [key, value] of Object.entries(result.coordinates))
        for (const { item, path } of itemPaths)
            if (path == key) {
                mappedCoords[item.id] = value;
                break;
            }

    // write the map to its file
    await writeFile(spriteMapPath, JSON.stringify(mappedCoords, undefined, 2));
})().catch(console.error);