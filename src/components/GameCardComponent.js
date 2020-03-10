import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const GameCard = (props) => {
    const topGames = useSelector(state => state.game.topGames)
    const [boxArtUrl, setBoxArt] = useState('')
    const [thumbnailArt, setThumbnailArt] = useState('')

    let game = topGames.filter(game => game.id === props.gameId)
    useEffect(() => {
        if (topGames.length > 0 ) {
            let [{box_art_url}] = game
            setBoxArt(
                box_art_url
                .replace('{width}', '120')
                .replace('{height}', '160')
            )
            console.log(props.thumbnail)
            setThumbnailArt(
                props.thumbnail
                .replace('{width}', '284')
                .replace('{height}', '160')
            )
            //console.log(boxArtUrl)
        }
    }, [topGames])

    console.log(thumbnailArt)
    
    if (boxArtUrl) {
        return (
            <div className="gameCardWrapper">
                <div className="boxArtWrapper">
                    <img src={boxArtUrl} alt="box art" className="boxArt"/>
                    <p className="gridHelpText">shape</p>
                    <p className="viewerCountText">•{props.viewerCount}</p>
                </div>

                <div className="verticalRuleSmall"></div>

                <div className="streamInfoWrapper">
                    <h3 className="streamerNameText">{props.streamerName}</h3>
                    <p className="streamTitleText">{props.title}</p>
                </div>
                <div className="verticalRuleSmall"></div>

                <div className="streamImageWrapper">
                <img src={thumbnailArt} alt="stream thumbnail" className="streamThumbnail"/>
                </div>
            </div>
        )
    } else {
        return (
            <p>loading</p>
        )
    }
}

export default GameCard