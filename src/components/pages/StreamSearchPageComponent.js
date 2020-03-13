import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../SearchComponent'
import CardStreamer from '../cards/CardStreamerComponent'
import Transition from '../../images/transition1.svg'
import streamNotFound from '../../images/streamNotFound.png'

import { getGameByStream } from '../../actions/gameActions'

const StreamSearchPage = () => {
    const dispatch = useDispatch()
    const stream = useSelector(state => state.stream.stream)
    const user = useSelector(state => state.user.user)
    const [userProfileArt, setUserProfileArt] = useState('')
    const [userName, setUserName] = useState('')
    const [gameId, setGameId] = useState('')
   console.log(stream)
    useEffect(() => {
        if (stream.length > 0 && user.length > 0) {
            let [{profile_image_url}] = user
            let [{user_name}] = stream
            let [{game_id}] = stream
            setUserProfileArt(profile_image_url)
            setUserName(user_name)
            setGameId(game_id)
        }
    }, [stream, user])


    useEffect(() => {
        dispatch(getGameByStream(gameId))
    }, [gameId])

    if (stream.length > 0) {
        return (
            <div>
                <Search />
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                <div className="gameHeadlineArtWrapper">
                    <p className="gameSearchedHeadline">Now viewing {userName}'s profile</p>
                    <div className="gameSearchedBoxArtWrapper">
                    <img src={userProfileArt} alt="box art" className="boxArt"/>
                    </div>
                </div>
                <div className="horizontalRule"></div>
                <div className="gameCardSection">
                    <CardStreamer
                        key={stream[0].id}
                        type={stream[0].type}
                        gameId={stream[0].game_id} 
                        userId={stream[0].user_id}
                        streamerName={stream[0].user_name}
                        title={stream[0].title}
                        viewerCount={stream[0].viewer_count}
                        thumbnail={stream[0].thumbnail_url}
                    />
                </div>
            </div>
        )
    } else {
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