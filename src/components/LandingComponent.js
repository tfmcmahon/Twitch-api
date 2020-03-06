import React from 'react'

import Search from './SearchComponent'
import TopGames from './TopGamesComponent'
import Transition from '../images/transition1.svg'

const Landing = () => {
    return (
        <div>
            <Search />
            <img src={Transition} alt="transition graphic" className="landingImage"></img>
            <TopGames />
        </div>
    )
}

export default Landing