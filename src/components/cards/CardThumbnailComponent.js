import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const CardThumbnail = (props) => {
    const usersByGame = useSelector(state => state.user.users)
    const [streamThumbnail, setStreamThumbnail] = useState('')
    const [userProfileArt, setUserProfileArt] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
        
    useEffect(() => {
        let user = usersByGame.filter(user => user.id === props.userId)
        let colors = [ '#a3d2e4', '#334A52', '#fff',' #412485']
        if (user.length > 0) { //usersByGame.length > 0 && 
            let [{profile_image_url}] = user
            setStreamThumbnail(
                props.thumbnail
                .replace('{width}', '284')
                .replace('{height}', '160')
            )
            setUserProfileArt(
                profile_image_url
            )
            const item = colors[Math.floor(Math.random()*colors.length)];
            setSelectedColor(item)

        }
    }, [usersByGame, props.thumbnail, props.userId])

    if (streamThumbnail) {
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

                <div className="streamImageWrapper">
                    <a 
                        href={`https://www.twitch.tv/${props.streamerName}`}                  
                        rel='noopener noreferrer' 
                        target='_blank'
                    >
                        <img src={streamThumbnail} alt="box art" className="streamThumbnail"/>
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

export default CardThumbnail