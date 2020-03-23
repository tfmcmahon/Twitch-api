import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const CardBoxArt = (props) => {
    const topGames = useSelector(state => state.game.topGames)
    const topUsers = useSelector(state => state.user.topUsers)
    const [boxArtUrl, setBoxArtUrl] = useState('')
    const [userProfileArt, setUserProfileArt] = useState('')
    const [gameName, setGameName] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    
    useEffect(() => {
        let game = topGames.filter(game => game.id === props.gameId)
        let user = topUsers.filter(user => user.id === props.userId)
        if (topGames.length > 0 && topUsers.length > 0 && user.length > 0) { //game.length > 0 && user.length > 0
            let [{box_art_url}] = game
            let [{name}] = game
            let [{profile_image_url}] = user
            setBoxArtUrl(
                box_art_url
                .replace('{width}', '120')
                .replace('{height}', '160')
            )
            setUserProfileArt(
                profile_image_url
            )
            setGameName(name)
            //assign random color to stream banner
            const colors = [ '#a3d2e4', '#334A52', '#fff',' #412485']
            const item = colors[Math.floor(Math.random()*colors.length)]
            setSelectedColor(item)
        }
    }, [topGames, topUsers, props.userId, props.gameId]) //swap this back to empty array
    
    if (boxArtUrl) {
        return (
            <div className="gameCardWrapper">
                <a className="aHelp"
                    href={`https://www.twitch.tv/${props.streamerName}`}                  
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    <div className="boxArtWrapper">
                        <img src={userProfileArt} alt="profile icon" className="profileImage"/>
                        <p className="gridHelpText">shape</p>
                        <p className="viewerCountText" id="viewerCountText" style={{backgroundColor: selectedColor}}>•{props.viewerCount}</p>
                    </div>
                </a>
                <div className="streamInfoWrapper">
                        <h3 className="streamerNameText">{props.streamerName}</h3>
                        <div className="horizontalRule"></div>
                        <p className="streamTitleText">{props.title}</p>
                </div>
                <div className="verticalRuleSmall"></div>
    
                <div className="streamImageWrapper">
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

export default CardBoxArt