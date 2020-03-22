//Packages
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'

//CSS
import './App.css'

//Components
import Nav from './components/landing/NavComponent'
import Footer from './components/landing/FooterComponent'
import OAuth from './components/OAuthComponent'
import Landing from './components/landing/LandingComponent'
import GamePage from './components/pages/GameSearchPageComponent'
import StreamPage from './components/pages/StreamSearchPageComponent'

//Authentication
import { setCurrentTwitchUser, setAuthToken } from './actions/authActions'

//Check for token in local storage
if (localStorage.jwtToken) {
  //Set auth token to header auth
  const twitchToken = localStorage.jwtToken
  setAuthToken(twitchToken)
  //Decode the token to get user info
  const decoded = jwtDecode(twitchToken)
  //Set user and isAuthenticated
  store.dispatch(setCurrentTwitchUser(decoded))

  //Check for expired token -- this is handled upon server rejection
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <Nav />
          <Switch>
          <Route exact path='/twitch-api' component={OAuth} />
          <Route exact path='/twitch-api/landing' component={Landing} />
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
