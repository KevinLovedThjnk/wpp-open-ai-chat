##React micro-app boilerplate

###How to start:
1. Copy `.yarnrc.tmpl.yml` => `.yarnrc.yml`
2. Add your token as described on [this Confluence page](https://confluence.uhub.biz/pages/viewpage.action?spaceKey=WPPLONOP&title=GitLab+Package+Registry)
3. Use NodeJS 16+ version. Run `corepack enable`.
4. Run with `yarn start`
   1. It will automatically open your app inside OS. You can change url prefix to work under the other tenant.
   By default, it will open WPP tenant, but you can change url prefix to ch, wm, etc.
   2. You can change url to use your local app with workspaces: 
      1. Add `w/f96a0dff-9435-47d4-9955-71bd24999077/local/8500/sjs/main` to the main url with tenant. 

###Details:
1. This example app is using `@platform-ui-kit/components-library` package and components library with React mappings `@platform-ui-kit/components-library-react`.
See more info [here](https://components.os.wpp.com/)
2. To help use the context from Core OS app, it is recommended to use helper packages:
   1. `@wpp-open/core` - typings,   
      `@wpp-open/react` - React helpers for working with Core OS context, permissions etc.
3. You can read more about the OS context and micro app setup [here](https://developers.os.wpp.com/docs/developer-guide/reference/microapp-props-react)
