import React from 'react'

import { Prefixes } from 'orchestrator-client-prefix-page'
import 'orchestrator-client-prefix-page/dist/index.css'
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiPage, EuiPageBody, EuiPageContent, EuiPageHeader } from "@elastic/eui";



const App = () => {
  return <EuiPage>
    <EuiPageBody>
      <EuiPageHeader>LIR Prefixes component example page</EuiPageHeader>
      <EuiPageContent>
        <Prefixes/>
      </EuiPageContent>
    {/*<h1>LIR Prefixes example page</h1>*/}
    {/*<div>Checkbox component</div>*/}
    {/*<Checkbox name="checkbox-test"/>*/}
    {/*<div>FilterDropDown component</div>*/}
    {/*<FilterDropDown items={[]} filterBy={()=>console.log("yeah")} />*/}

    </EuiPageBody>
  </EuiPage>

}

export default App
