const { whenDev } = require('@craco/craco')
const SingleSpaAppCracoPlugin = require('craco-plugin-single-spa-application')
const StylelintPlugin = require('stylelint-webpack-plugin')

const singleSpaAppPlugin = {
    plugin: SingleSpaAppCracoPlugin,
    options: {
        orgName: 'wpp',
        projectName: 'react-app-boilerplate',
        entry: 'src/index.tsx',
        orgPackagesAsExternal: false,
        reactPackagesAsExternal: false,
        minimize: whenDev(() => true, false),
        outputFilename: 'main.js',
    },
}

const stylelintPlugin = {
    plugin: StylelintPlugin,
    options: {
        configFile: '.stylelintrc.js',
        fix: false,
        context: 'src',
        files: '**/*.scss',
        failOnError: true,
        quiet: false,
    },
}

module.exports = {
    devServer: {
        port: 8500,
        open: ['https://wpp.wpp-stage.os-dev.io/local/8500/sjs/main'],
    },
    plugins: [singleSpaAppPlugin, stylelintPlugin],
}