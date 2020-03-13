import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const CardStreamer = (props) => {
    console.log(props)
    const game = useSelector(state => state.game.game)
    //const stream = useSelector(state => state.game.stream)
    const [streamThumbnail, setStreamThumbnail] = useState('')
    const [boxArtUrl, setBoxArtUrl] = useState('')
    const [selectedColor, setSelectedColor] = useState('')

    const colors = [ '#a3d2e4', '#334A52', '#fff',' #412485']

    useEffect(() => {
        if (game.length > 0) { //&& stream.length > 0
            let [{box_art_url}] = game
            setStreamThumbnail(
                props.thumbnail
                .replace('{width}', '284')
                .replace('{height}', '160')
            )
            setBoxArtUrl(
                box_art_url
                .replace('{width}', '120')
                .replace('{height}', '160')
            )
            const item = colors[Math.floor(Math.random()*colors.length)];
            setSelectedColor(item)

        }
    }, [game])

    //console.log(user)
    
    if (streamThumbnail && boxArtUrl) {
        return (
            <div className="gameCardWrapper">
                <div className="boxArtWrapper">
                    <img src={streamThumbnail} alt="profile icon" className="profileImage"/>
                    
                    <p className="gridHelpText">shape</p>
                    <p className="viewerCountText" id="viewerCountText" style={{backgroundColor: selectedColor}}>•{props.viewerCount}</p>
                </div>

                <div className="verticalRuleSmall"></div>

                <div className="streamInfoWrapper">
                        <h3 className="streamerNameText">{props.streamerName}</h3>
                        <p className="streamTitleText">{props.title}</p>
                </div>
                <div className="verticalRuleSmall"></div>

                <div className="streamImageWrapper">
                <img src={boxArtUrl} alt="box art" className="boxArt"/>
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