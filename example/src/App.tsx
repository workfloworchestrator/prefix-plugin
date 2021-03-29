import React from 'react'

import { Prefixes } from 'orchestrator-client-prefix-page'
import 'orchestrator-client-prefix-page/dist/index.css'
import '@elastic/eui/dist/eui_theme_light.css'
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader
} from '@elastic/eui'

const App = () => {
  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageHeader>LIR Prefixes component example page</EuiPageHeader>
        <EuiPageContent>
          <Prefixes />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

export default App
