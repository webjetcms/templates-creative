'use strict';
const autoprefixer = require('autoprefixer')
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const postcss = require('postcss')
const sass = require('sass');
const sh = require('shelljs');
const cssminify = require('css-minify');

const stylesPath = '../src/scss/ninja.scss';
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css/ninja.min.css');

const stylesPathBlind = '../src/scss/blind-friendly.scss';
const destPathBlind = upath.resolve(upath.dirname(__filename), '../dist/css/blind-friendly.min.css');

module.exports = function renderSCSS() {
    
    const results = sass.renderSync({
        data: entryPoint,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ],
      });

    const resultsBlind = sass.renderSync({
        data: entryPointBlind,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ],
      });

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    const destPathDirnameBlind = upath.dirname(destPathBlind);
    if (!sh.test('-e', destPathDirnameBlind)) {
        sh.mkdir('-p', destPathDirnameBlind);
    }

    postcss([ autoprefixer, cssminify ]).process(results.css, {from: 'ninja.min.css', to: 'ninja.min.css'}).then(result => {
        result.warnings().forEach(warn => {
            console.warn(warn.toString())
        })
        fs.writeFileSync(destPath, result.css.toString());
    })

    postcss([ autoprefixer, cssminify ]).process(resultsBlind.css, {from: 'blind-friendly.min.css', to: 'blind-friendly.min.css'}).then(result => {
        result.warnings().forEach(warn => {
            console.warn(warn.toString())
        })
        fs.writeFileSync(destPathBlind, result.css.toString());
    })

};

const entryPoint = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
@import "${stylesPath}"
`

const entryPointBlind = `/*!
*/
@import "${stylesPathBlind}"
`
