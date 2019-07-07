exports.getIdFromName = name => name.trim().toLowerCase().replace(/ +/g, '-').replace(/[^a-z-]/g, '');

exports.getImageUrlFromItem = ({ name }) => {
    const fileName = name == 'B. F. Sword' ?
        'B.F. Sword' :
        name.replace(/(^| )\w/g, ret => ret.toUpperCase());
    return `https://img.rankedboost.com/wp-content/plugins/league/assets/tft-items/${fileName}.png`;
}

exports.getItemOfCombination = (itemsCombined, partA, partB) => {
    const [a, b] = [partA, partB].sort();
    return itemsCombined.find(item => item.buildFrom[0] == a && item.buildFrom[1] == b)
}

const removeDuplicates = arr => Array.from(new Set(arr).values());

exports.getItemsNames = (...itemArrays) => removeDuplicates([].concat(...itemArrays
    .map(arr => arr.map(i => i.name))
)).sort();