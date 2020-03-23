import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const CardStreamer = (props) => {
    const game = useSelector(state => state.game.game)
    const [streamThumbnail, setStreamThumbnail] = useState('')
    const [boxArtUrl, setBoxArtUrl] = useState('')
    const [gameName, setGameName] = useState('')
 
    useEffect(() => {
        if (game.length > 0) { 
            let [{box_art_url}] = game
            let [{name}] = game
            setStreamThumbnail(
                props.thumbnail
                .replace('{width}', '960')
                .replace('{height}', '540')
            )
            setBoxArtUrl(
                box_art_url
                .replace('{width}', '120')
                .replace('{height}', '160')
            )
            setGameName(
                encodeURIComponent(name)
                .replace(/'/g, "%27")
                .replace(/&/g, "%26")
            )
        }
    }, [game, props.thumbnail])

    if (streamThumbnail && boxArtUrl) {
        return (
            <div>
                <div className="streamSearchedBoxArtWrapper">
                    <a 
                        href={`https://www.twitch.tv/${props.streamerName}`}              
                        rel='noopener noreferrer' 
                        target='_blank'
                    >
                        <img src={streamThumbnail} alt="stream thumbnail" className="largeProfileImage"/>
                    </a>
                </div>
                
                <div className="streamSearchInfoWrapper">
                    <p className="streamTitleText">{props.title}</p>
                    <p className="streamTitleText">Viewers: <b className="viewerCountStreamProfile">{props.viewerCount}</b></p>
                </div>
                <div className="horizontalRule"></div>
                <div className="streamBoxArtWrapper">
                    <a 
                        href={`https://www.twitch.tv/directory/game/${gameName}`}                    
                        rel='noopener noreferrer' 
                        target='_blank'
                    >
                    <img src={boxArtUrl} alt="box art" className="boxArt"/>
                    </a>
                </div>
            </div>
        )
    } else {
        return (
            <p>loading</p>
        )
    }
}

export default CardStreamer