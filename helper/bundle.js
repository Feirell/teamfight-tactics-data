const { readDataSet, jsonWrite } = require('./util-node');

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

    await jsonWrite('bundle.' + locale + '.json', combined);
})().catch(console.error);