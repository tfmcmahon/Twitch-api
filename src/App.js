import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'

import Nav from './components/NavComponent'
import Footer from './components/FooterComponent'
import Landing from './components/LandingComponent'
import GamePage from './components/GamePageComponent'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <Nav />
          <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/twitch-api' component={Landing} />
          <Route exact path='/twitch-api/game' component={GamePage} />
          </Switch>
          <div className="blueFill"></div>
        </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
