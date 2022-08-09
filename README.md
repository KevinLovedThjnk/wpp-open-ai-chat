##React micro-app boilerplate

###How to start:
1. Copy `.yarnrc.tmpl.yml` => `.yarnrc.yml`
2. Add your token as described on [this Confluence page](https://confluence.uhub.biz/pages/viewpage.action?spaceKey=WPPLONOP&title=GitLab+Package+Registry)
3. Use NodeJS 16+ version. Run `corepack enable`.
4. Run with `yarn start`
    1. You can work with the microapp using one of our [Mother app deployments](https://ch.wpp-hulk.os-dev.io/local/8500/sjs/main)

###Details:
1. This example app is using `@platform-ui-kit/components-library` - components library with React `@platform-ui-kit/components-library-react`
2. To help use the context from Core OS app, it is recommended to use helper packages:
   1. `@wpp-open/core` - typings,   
      `@wpp-open/react` - React helpers for working with Core OS context, permissions etc.
3. You can read more about the OS context and micro app setup [here](https://developers-ch-stable.os-dev.io/docs/reference/wpp-open-os-app-config/index.html#react-application-onboard-steps-in-the-core-os-v4)