import { useOs } from '@wpp-open/react'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { Section } from 'pages/navigationAndWorkspaces/Section/Section'

export const NavigationAndWorkspacesPage = () => {
  const location = useLocation()
  const { osContext } = useOs()
  const selectedWorkspace = osContext.workspace?.mapping[osContext.workspace?.azId]

  const navigationData = [
    { title: 'OS baseUrl', value: osContext.baseUrl },
    { title: 'Microapp route', value: location.pathname },
  ]

  const workspaceData = [
    { title: 'Selected workspace', value: selectedWorkspace?.name || 'None' },
    { title: 'Type', value: selectedWorkspace?.type || '-' },
    { title: 'Workspace azId', value: selectedWorkspace?.azId || '-' },
  ]

  return (
    <>
      <Section title="Navigation" data={navigationData} />
      <Section title="Workspaces" data={workspaceData} />
    </>
  )
}
