import { FullscreenAppCustomProps } from '@wppopen/core'
import { OsProvider } from '@wppopen/react'
import { StrictMode } from 'react'

import { App } from 'app/App'

export const Root = (props: FullscreenAppCustomProps) => (
  <StrictMode>
    <OsProvider {...props}>
      <App />
    </OsProvider>
  </StrictMode>
)
