const { whenDev } = require('@craco/craco')
const SingleSpaAppCracoPlugin = require('craco-plugin-single-spa-application')

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

module.exports = {
    plugins: [singleSpaAppPlugin],
}