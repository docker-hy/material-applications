import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import Test from './Test'
import Playground from './Playground'

const App = () => {
  const [testing, setTesting] = useState(true)

  const page = testing ? <Test /> : <Playground />

  const switchPage = () => setTesting(!testing)

  return (
    <div style={{ padding: '1em' }}>
      <div>
        <Button onClick={switchPage}>Switch view between playground and actual test</Button>
      </div>
      <hr />
      {page}
      <hr />
      <span> Made by Sasu Mäkinen </span>
    </div>
  )
}


export default App