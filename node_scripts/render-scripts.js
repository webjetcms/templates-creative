'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const sh = require('shelljs');
const UglifyJS = require('uglify-js');
const browserify = require('browserify');

module.exports = function renderScripts() {

    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');

    sh.cp('-R', sourcePath, destPath)

    const sourcePathScriptsJS = upath.resolve(upath.dirname(__filename), '../src/js/ninja.js');
    const destPathScriptsJS = upath.resolve(upath.dirname(__filename), '../dist/js/ninja.js');

    let bundler = browserify({
        plugin: [
          [ require('esmify'), {
            nodeModules: true
           } ]
        ]
      });
    bundler.add(sourcePathScriptsJS);

    /*toto zatial nechceme robit, kod je mega skaredy a potom tazko debugovatelny
    bundler.transform('uglifyify', {
        global: true,
        mangle: { toplevel: true }
    });*/

    bundler.bundle().pipe(fs.createWriteStream(destPathScriptsJS));

};
