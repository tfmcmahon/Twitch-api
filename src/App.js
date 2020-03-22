//Packages
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

//CSS
import './App.css'

//Components
import PrivateRoute from './components/private/PrivateRouteComponent'
import Nav from './components/landing/NavComponent'
import Footer from './components/landing/FooterComponent'
import OAuth from './components/OAuthComponent'
import Landing from './components/landing/LandingComponent'
import GamePage from './components/pages/GameSearchPageComponent'
import StreamPage from './components/pages/StreamSearchPageComponent'

//Authentication
import { loginTwitchUser } from './actions/authActions'

//Check for token in local storage
if (localStorage.twitchToken) {
  console.log(localStorage.twitchToken)
  //If there is a token in local storage, add it to the store
  const twitchToken = localStorage.twitchToken
  store.dispatch(loginTwitchUser(twitchToken))
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <Nav />
          <Switch>
          <Route exact path='/twitch-api' component={OAuth} />
          <PrivateRoute exact path='/twitch-api/landing' component={Landing} />
          <PrivateRoute exact path='/twitch-api/game' component={GamePage} />
          <PrivateRoute exact path='/twitch-api/stream' component={StreamPage} />
          </Switch>
          <div className="blueFill"></div>
        </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
