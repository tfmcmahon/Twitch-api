import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from './SearchComponent'
import SearchedGame from './SearchedGameComponent'
import Transition from '../images/transition1.svg'

import { getStreamsByGame } from '../actions/streamActions'

const GamePage = () => {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game.game)
    const streams = useSelector(state => state.stream.streams)
    const [boxArtUrl, setBoxArtUrl] = useState('')
    const [gameName, setGameName] = useState('')
    const [gameId, setGameId] = useState('')
   
    useEffect(() => {
        if (game.length) {
            let [{box_art_url}] = game
            let [{name}] = game
            let [{id}] = game
            //let [{profile_image_url}] = user
            setBoxArtUrl(
                box_art_url
                .replace('{width}', '240')
                .replace('{height}', '320')
            )
            setGameName(name)
            setGameId(id)
        }
    }, [game])

    console.log(gameName, gameId)
    useEffect(() => {
        dispatch(getStreamsByGame(gameId))
    }, [gameId]) //using an empty array should only allow this to update on mount
    
    const searchedCards = streams.map(stream => 
        <SearchedGame
            key={stream.id}
            type={stream.type}
            userId={stream.user_id} // match with top user state for profile art
            streamerName={stream.user_name}
            title={stream.title}
            viewerCount={stream.viewer_count}
            thumbnail={stream.thumbnail_url}
        />
    )

    return (
        <div>
            <Search />
            <img src={Transition} alt="transition graphic" className="landingImage"></img>
            <div className="gameHeadlineArtWrapper">
                <p className="gameSearchedHeadline">Now viewing channels streaming</p>
                <h3 className="gameSearchedTitle">{gameName}</h3>
                <div className="gameSearchedBoxArtWrapper">
                <img src={boxArtUrl} alt="box art" className="boxArt"/>
                </div>
            </div>
            <div className="horizontalRule"></div>
            {searchedCards}
        </div>
    )
}

export default GamePage