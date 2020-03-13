import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'

import Nav from './components/landing/NavComponent'
import Footer from './components/landing/FooterComponent'
import Landing from './components/landing/LandingComponent'
import GamePage from './components/pages/GameSearchPageComponent'
import StreamPage from './components/pages/StreamSearchPageComponent'

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
          <Route exact path='/twitch-api/stream' component={StreamPage} />
          </Switch>
          <div className="blueFill"></div>
        </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
