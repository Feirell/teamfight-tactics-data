const { readDataSet, jsonWrite } = require('./util-node');

(async () => {
    const locale = "en_EN";

    const combined = {
        classes: readDataSet('classes', locale),
        champions: readDataSet('champions', locale),
        itemsBase: readDataSet('items-base', locale),
        itemsCombined: readDataSet('items-combined', locale)
    };

    for (const [k, v] of Object.entries(combined))
        combined[k] = await v;

    await jsonWrite('bundle.' + locale + '.json', combined);
})().catch(console.error);