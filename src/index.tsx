import React from 'react'
import ReactDOMClient from 'react-dom/client'
import singleSpaReact from 'single-spa-react'

import { Root } from 'app/Root'

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  renderType: 'createRoot',
  rootComponent: Root,
  errorBoundary() {
    //Add your error boundary here
    return <></>
  },
})

export const { bootstrap, mount, unmount } = lifecycles
