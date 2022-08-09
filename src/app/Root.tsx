import { MicroAppCustomProps } from '@wpp-open/core'
import { OsProvider } from '@wpp-open/react'
import { StrictMode } from 'react'

import { App } from 'app/App'

export const Root = (props: MicroAppCustomProps) => {
  return (
    <StrictMode>
      <OsProvider {...props}>
        <App />
      </OsProvider>
    </StrictMode>
  )
}
