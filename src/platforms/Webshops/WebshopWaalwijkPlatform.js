const platform = require('./_WebshopBasePlatform').clone();
const destPath = '../dist/forus-webshop-waalwijk.panel';

// change platform name
platform.setName('webshop_waalwijk');

// change building root path
platform.setDestRootPath(destPath);

// assets configs
platform.copyAsset("resources/_webshop-common/**/*", "./");
platform.copyAsset("resources/webshop-waalwijk/**/*", "./");

// tweak scss configs
platform.editTask('scss', (task) => {
    task.src = "waalwijk/style-webshop-waalwijk.scss";
    task.watch = [
        "_common/**/*.scss",
        "waalwijk/**/*.scss"
    ];

    return task;
});

// change server port
platform.serve(6520, '/');

module.exports = platform;