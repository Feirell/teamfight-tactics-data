# teamfight-tactics-data

This repository is meant to be used as a central place for any data concerning the [Teamfight Tactics](https://euw.leagueoflegends.com/en/featured/events/teamfight-tactics) gamemode from the game [League of Legends](https://play.euw.leagueoflegends.com/en_US) developed by [Roit Games Inc](https://www.riotgames.com/en).

> All rights for the included names and images are reserved by Riot Games Inc.

## files

This repository is structured by their datasets and their corresponding localasations. Available `set`s are `champions`, `classes`, `items-base` and `items-combined`.
Each set has its `<set>.json` and atleast the `en_EN` corresponding `<set>.<loc>.loc.json` localisation file.

### `bundled.<loc>.json` (generated)

This is probably the file you are looking for, it is a bundled version of all data `set`s in the defined localasation.

### `items-sprite.png` and `items-sprite.map.json` (generated)

Those files contain the item icons. The map is needed to map the `item.id` onto the correct part of the sprite.

### `<set>.json`

Contains an array of objects which at least contain the id which conforms to the form of: `[a-z][a-z-]+[a-z]`. They may also contain more data which is not in need of localisation.

### `<set>.<loc>.loc.json`

Contains an object whose keys are corresponding to the ids which are defined in its `<set>.json`. They data in the object can be concated into the objects of the `<set>.json` file to get the complete objekt.

## usage

This repository is meant to be used with a cdn.

Examplary with JSdelivr:

``` txt
// bundle
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/combined.en_EN.json

// item icons
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/items-sprite.png
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/items-sprite.map.json

// champions
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/champions.en_EN.json
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/champions.json

// classes
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/classes.en_EN.json
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/classes.json

// base
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/items-base.en_EN.json
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/items-base.json

// combined
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/items-combined.en_EN.json
https://cdn.jsdelivr.net/gh/Feirell/teamfight-tactics-data/items-combined.json
```