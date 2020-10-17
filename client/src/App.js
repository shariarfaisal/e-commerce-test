import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import BaseContextProvider from './contexts/BaseContext'

const App = (props) => {
  return(
    <Router>
      <Switch>
        <BaseContextProvider>
          <Route path="/" component={Home} />
        </BaseContextProvider>
      </Switch>
    </Router>
  )
}
export default App
