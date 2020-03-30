import React from 'react'
import ReactFreezeframe from 'react-freezeframe'

import links from '../images/links.gif'
import login from '../images/login.gif'
import profile from '../images/profile.gif'
import search from '../images/search.gif'

const Walkthrough = () => {

    return (
        <div className="walkthroughWrapper">
            <div className="walkthroughItem">
                <h3 className="walkThroughName">Login</h3>
                <div className="gif">
                    <ReactFreezeframe src={login} />
                </div>
                <p className="walkThroughText">
                    Allow the app read-only access to your Twitch account. 
                    This site utilizes the OAuth2 implicit workflow to interact with the Twitch.tv API.
                    When permission is granted, Twitch returns an access token which is then stored locally in the browser.
                </p>
            </div>

            <div className="walkthroughItem">
                <h3 className="walkThroughName">Search</h3>
                <div className="gif">
                    <ReactFreezeframe src={search} />
                </div>
                <p className="walkThroughText">
                    The app allows the user to search the Twitch API by game or by streamer.
                    Top games and streamers have been scraped from the Twitch API.
                    They have been compiled into a list which is used to suggest search terms.
                </p>
            </div>

            <div className="walkthroughItem">
                <h3 className="walkThroughName">Profile</h3>
                <div className="gif">
                    <ReactFreezeframe src={profile} />
                </div>
                <p className="walkThroughText">
                    The app will produce a streamer profile page which contains the streamer's profile icon, a screenshot of their stream, stream title, viewer count, and the game that they are streaming.
                </p>
            </div>

            <div className="walkthroughItem">
                <h3 className="walkThroughName">Links</h3>
                <div className="gif">
                    <ReactFreezeframe src={links} />
                </div>
                <p className="walkThroughText">
                    Each object with a raise animation will link to Twitch with its corresponding attribute.
                    For instance, clicking on a game will link to the Twitch webiste with a search by the specified game.
                </p>
            </div>
        </div>
    )
}

export default Walkthrough