import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PromoCodes from './pages/PromoCodes'
import Products from './pages/Products'
import CreatePromoCode from './pages/CreatePromoCode'
import UpdatePromoCode from './pages/UpdatePromoCode'
import BaseContextProvider from './contexts/BaseContext'


const App = (props) => {
  return(
    <Router>
      <Switch>
        <BaseContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/products" exact component={Products} />
          <Route path="/promo-codes" exact component={PromoCodes} />
          <Route path="/promo-codes/:id" exact component={UpdatePromoCode} />
          <Route path="/create-promo" exact component={CreatePromoCode} />
        </BaseContextProvider>
      </Switch>
    </Router>
  )
}
export default App
