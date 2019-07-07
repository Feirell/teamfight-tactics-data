const path = require('path');
const ChainableError = require('chainable-error').Error;

const { getImageUrlFromItem } = require('./util');
const { downloadToFile } = require('./util-node');

const fileNameTranslateId = item => item.id + '.png';

exports.downloadItemImage = (item, directory, fileNameTranslate = fileNameTranslateId) => {
    const imageUrl = getImageUrlFromItem(item);
    const imageFilePath = path.join(directory, fileNameTranslate(item, imageUrl));

    return downloadToFile(imageUrl, imageFilePath)
        .then(path => ({ path, item }))
        .catch(err => {
            throw new ChainableError('Could not load the image for item ' + item.id, err);
        });
}

exports.downloadItemImages = (items, directory) =>
    Promise.all(items.map(item => exports.downloadItemImage(item, directory)));
