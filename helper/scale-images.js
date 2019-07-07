const jimp = require('jimp');

exports.scaleImage = async (src, dest, dimension = 50) => {
    const image = await jimp.read(src);

    await image.scaleToFit(dimension, dimension)
        .writeAsync(dest);
};

exports.scaleImages = (srcses, trans = name => name, dimension = 50) =>
    Promise.all(srcses
        .map(src => ({ src, dest: trans(src) }))
        .map(({ src, dest }) => exports.scaleImage(src, dest, dimension)));