import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../SearchComponent'
import CardStreamer from '../cards/CardStreamerComponent'
import Transition from '../../images/transition1.svg'
import streamNotFound from '../../images/streamNotFound.png'

import { getGameByStream } from '../../actions/gameActions'
import { streamFadeOn } from '../../actions/streamActions'
import { logoutTwitchUser } from '../../actions/authActions'

const StreamSearchPage = () => {
    const dispatch = useDispatch()
    const stream = useSelector(state => state.stream.stream)
    const error = useSelector(state => state.error)
    const user = useSelector(state => state.user.user)
    const gameLoading = useSelector(state => state.game.gameLoading)
    const streamLoading = useSelector(state => state.stream.streamLoading)
    const streamFade = useSelector(state => state.stream.fade)
    const accessToken = useSelector(state => state.auth.token)
    
    const [timedOut, setTimedOut] = useState(false)
    const [userName, setUserName] = useState('')
    const [gameId, setGameId] = useState('')
    const [cardStreamer, setCardStreamer] = useState([])
    const [userProfileArt, setUserProfileArt] = useState('')

    useEffect(() => { // handle expired token -- twitch docs suggest refreshing a token upon server rejection
        if (error.msg.status === 401) {
            dispatch(logoutTwitchUser())
        }
    }, [error, dispatch])

    useEffect(() => {
        if (stream.length > 0) {
            let [{user_name}] = stream
            let [{game_id}] = stream
            setUserName(user_name)
            setGameId(game_id)
        }
    }, [stream])

    useEffect(() => {
        if (user.length > 0) {
            let [{profile_image_url}] = user
            setUserProfileArt(profile_image_url)
        }
    }, [user, dispatch])

    useEffect(() => {
        if (gameId) {
            dispatch(getGameByStream(gameId, accessToken))
        }
    }, [gameId, accessToken, dispatch])

    useEffect(() => {
        if (!streamLoading) {
            dispatch(streamFadeOn())
        }
    }, [streamLoading, dispatch])

    useEffect(() => { // set a timer for the API to resond
        const timer = setTimeout(() => {
            setTimedOut(true)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
            setCardStreamer(stream.map(stream => 
                <CardStreamer
                key={stream.id}
                type={stream.type}
                gameId={stream.game_id} 
                userId={stream.user_id}
                streamerName={stream.user_name}
                title={stream.title}
                viewerCount={stream.viewer_count}
                thumbnail={stream.thumbnail_url}
            />
            )
        )
    }, [stream])

    if (error.msg.status) { // render errors if any
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="errorHeadlineArtWrapper">
                    <p className="errorText"><b>Stream not found or stream offline</b></p>
                    <div className="horizontalRuleWrapper">
                        <div className="horizontalRule"></div>
                    </div>
                    <p className="gameSearchedHeadline"><b>Search by Game or Stream above</b></p>
                    <p className="gameSearchedHeadline">Twitch requires an exact match to return a result</p>
                    <p className="gameSearchedHeadline">If you have reached this page in error, try using the suggestions drop down when searching</p>
                    <div className="streamNotFoundWrapper">
                        <img src={streamNotFound} alt=" stream not found" className="notFoundStream"/>
                    </div>
                </div>
            </div>
        )
    } else if (streamLoading || gameLoading) { // loading circle if streams are loading
        if (!timedOut) {
            return (
                <div>
                    <Search />
                    <img src={Transition} alt="transition graphic" className="landingImage"></img>
                    <div className="loadingWrapper">
                        <div className="loading"></div>
                    </div>
                </div>
            )
        } else { //handle no response from Twitch
            return (
                <div>
                    <Search />
                    <img src={Transition} alt="transition graphic" className="landingImage"></img>
                    <div className="errorHeadlineArtWrapper">
                        <p className="errorText"><b>No response from Twitch</b></p>
                        <div className="horizontalRuleWrapper">
                            <div className="horizontalRule"></div>
                        </div>
                        <p className="gameSearchedHeadline"><b>Search by Game or Stream above</b></p>
                        <p className="gameSearchedHeadline">Twitch requires an exact match to return a result</p>
                        <p className="gameSearchedHeadline">If you have reached this page in error, try using the suggestions drop down when searching</p>
                        <div className="streamNotFoundWrapper">
                            <img src={streamNotFound} alt=" stream not found" className="notFoundStream"/>
                        </div>
                    </div>
                </div>
            )
        }
    } else if (stream.length > 0) { // render the searched stream profile
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className={streamFade ? null : "gameFadeOut"}>
                    <div className="gameFadeIn">
                        <div className="streamerNameTextLargeWrapper">
                            <p className="streamerNameTextLarge">{userName}</p>
                            <div className="streamProfileImageWrapper">
                                <a 
                                    href={`https://www.twitch.tv/${stream[0].user_name}`}                  
                                    rel='noopener noreferrer' 
                                    target='_blank'
                                >
                                    <img src={userProfileArt} alt="profile icon" className="streamProfileImage"/>
                                </a>
                            </div>
                        </div>
                        <div className="horizontalRule"></div>
                        <div className="gameCardSection">
                            {cardStreamer}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else { //fall back render
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="gameHeadlineArtWrapper">
                    <p className="gameSearchedHeadline"><b>Search by Game or Stream above</b></p>
                    <p className="gameSearchedHeadline">Twitch requires an exact match to return a result</p>
                    <p className="gameSearchedHeadline">If you have reached this page in error, try using the suggestions drop down when searching</p>
                    <div className="streamNotFoundWrapper">
                        <img src={streamNotFound} alt=" stream not found" className="notFoundStream"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default StreamSearchPage