import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <header className="App-header">
            <div className="headerHelp">
                <Link to="/" className="headerLink">
                    <div className="headerHelpType">
                        <p className="headerProjectTitle">Twitch</p>
                        <p className="headerProjectTitle">Viewer</p>
                    </div>
                </Link>
                <div className="verticalRuleSmallWhite"></div>
                <a 
                    className='headerGithub' 
                    href='https://github.com/tfmcmahon/twitch-api'
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    <i className="fab fa-github-square fa-2x"></i>
                </a>
            </div>
            <div className="headerHelp">
                <div className="verticalRuleSmallWhite"></div>
                <Link to="/"> 
                    <button
                        className="homeButton"
                    >
                    Home
                    </button>
                </Link>
            </div>
        </header> 
    )
}

export default Nav