import { WppTypography } from '@platform-ui-kit/components-library-react'
import { useOs } from '@wpp-open/react'
import React from 'react'

export function App() {
  const { baseUrl, osContext } = useOs()

  return (
    <>
      <p>React app boilerplate {baseUrl}</p>
      <p>Tenant {osContext.tenant.name}</p>
      <WppTypography type="l-strong">CL WppTypography component</WppTypography>
    </>
  )
}
