import React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'


const refresh = () => render(
  <App />,
  document.getElementById('root'),
)

refresh()

if (module.hot) {
  module.hot.accept()
}
