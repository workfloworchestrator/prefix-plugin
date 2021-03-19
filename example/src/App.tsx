import React from 'react'

import { ExampleComponent, Checkbox, FilterDropDown, Prefixes } from 'orchestrator-client-prefix-page'
import 'orchestrator-client-prefix-page/dist/index.css'

const App = () => {
  return <div>
    <div>Checkbox component</div>
    <Checkbox name="checkbox-test"/>
    <div>FilterDropDown component</div>
    <FilterDropDown items={[]} filterBy={()=>console.log("yeah")} />
    <ExampleComponent text="Create React Library Example 😄" />
    <Prefixes></Prefixes>
  </div>

}

export default App
