import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import config from '../config/config'
import Transition from '../images/transition1.svg'

import { loginTwitchUser } from '../actions/authActions'

const baseURL = 'https://id.twitch.tv/oauth2/'
const twitchID = config.TwitchID
const redirectUri = 'http://localhost:3000/twitch-api'
const responseType = 'token'
const scope = ''
const state = config.State

const redirectString = document.location.hash || ''

const OAuth= () => {
    const authenticated = useSelector(state => state.auth.authenticated)
    const dispatch = useDispatch()

    useEffect(() => {
        if (redirectString.length > 0) {
            let hashRemove = /#access_token=/g
            let tokenString = redirectString.replace(hashRemove, '').split('&')
            console.log(tokenString)
            dispatch(loginTwitchUser(tokenString[0]))
        }
    }, [])

    return (
        <div>
            <div className="OAuthLogin">
                <h3 className="submitTitle">Login with <b className="textAccent">Twitch.tv</b></h3>
                <p className="subText">to access the app</p>
                <div className="toggleWrapper">
                </div>
                <div className="buttonWrapper">
                    {!authenticated 
                        ?
                        <button
                            type="submit"
                            name="game"
                            className="OAuthButton"
                            onClick={() => window.location.href = //send user to twitch login with data
                                `${baseURL}authorize?client_id=${twitchID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`
                            }
                        >
                            Login with Twitch
                        </button>
                        :
                        <Redirect to="/twitch-api/landing" />
                    }
                </div>
            </div>
            <img src={Transition} alt="transition graphic" className="landingImage"></img>
            <div className="OAuthBody">
            </div>
        </div>
    )
}

export default OAuth