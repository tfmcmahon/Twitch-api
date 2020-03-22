import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../SearchComponent'
import CardThumbnail from '../cards/CardThumbnailComponent'
import Transition from '../../images/transition1.svg'

import { getStreamsByGame, streamFadeOn } from '../../actions/streamActions'
import { setAuthToken } from '../../actions/authActions'

const GameSearchPage = () => {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game.game)
    const streams = useSelector(state => state.stream.streams)
    const error = useSelector(state => state.error)
    const gameLoading = useSelector(state => state.game.gameLoading)
    const streamLoading = useSelector(state => state.stream.streamLoading)
    const streamFade = useSelector(state => state.stream.fade)
    const accessToken = useSelector(state => state.auth.token)

    const [boxArtUrl, setBoxArtUrl] = useState('')
    const [gameName, setGameName] = useState('')
    const [gameId, setGameId] = useState('')
    const [thumbnailCards, setThumbnailCards] = useState([])
   
    useEffect(() => { // handle expired token -- twitch docs suggest refreshing a token upon server rejection
        if (error.msg.status === 401) {
            dispatch(setAuthToken(''))
        }
    }, [error])

    useEffect(() => {
        if (game.length > 0) {
            let [{box_art_url}] = game
            let [{name}] = game
            let [{id}] = game
            setBoxArtUrl(
                box_art_url
                .replace('{width}', '240')
                .replace('{height}', '320')
            )
            setGameName(name)
            setGameId(id)
        }
    }, [game])

    useEffect(() => {
        if (gameId) {
            dispatch(getStreamsByGame(gameId, accessToken.access_token))
        }
    }, [gameId])

    useEffect(() => {
        if (!streamLoading) {
            dispatch(streamFadeOn())
        }
    }, [streamLoading])

    useEffect(() => {
        setThumbnailCards(streams.map(stream => 
            <CardThumbnail
                key={stream.id}
                type={stream.type}
                userId={stream.user_id} // match with top user state for profile art
                streamerName={stream.user_name}
                title={stream.title}
                viewerCount={stream.viewer_count}
                thumbnail={stream.thumbnail_url}
            />
            )
        )
    }, [streams])

    if (error.msg.status) { // render errors if any
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="errorHeadlineArtWrapper">
                    <p className="errorText"><b>Game not found</b></p>
                    <div className="horizontalRuleWrapper">
                        <div className="horizontalRule"></div>
                    </div>
                    <p className="gameSearchedHeadline"><b>Search by Game or Stream above</b></p>
                    <p className="gameSearchedHeadline">Twitch requires an exact match to return a result</p>
                    <p className="gameSearchedHeadline">If you have reached this page in error, try using the suggestions drop down when searching</p>
                    <img src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-{width}x{height}.jpg" alt="game not found" className="notFoundArt"/>
                </div>
            </div>
        )
    } else if (streamLoading || gameLoading) { // loading circle if streams are loading
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="loadingWrapper">
                    <div className="loading"></div>
                </div>
            </div>
        )
    } else if (game.length > 0) { // render the streams that are playing the searched game
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className={streamFade ? null : "gameFadeOut"}>
                    <div className="gameFadeIn">
                        <div className="gameHeadlineArtWrapper">
                            <p className="gameSearchedHeadline">Now viewing channels streaming</p>
                            <h3 className="gameSearchedTitle">{gameName}</h3>
                            <div className="gameSearchedBoxArtWrapper">
                                <a 
                                    href={`https://www.twitch.tv/directory/game/${gameName}`}                    
                                    rel='noopener noreferrer' 
                                    target='_blank'
                                >
                                    <img src={boxArtUrl} alt="box art" className="boxArt"/>
                                </a>
                            </div>
                        </div>
                        <div className="horizontalRule"></div>
                        <div className="gameCardSection">
                            {thumbnailCards}
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
                    <img src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-{width}x{height}.jpg" alt="game not found" className="notFoundArt"/>
                </div>
            </div>
        )
    }
}

export default GameSearchPage