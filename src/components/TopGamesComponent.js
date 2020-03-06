import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    setTopGamesLoading, 
    getTopGames 
} from '../actions/gameActions'

const TopGames = () => {
    const topGames = useSelector(state => state.game.topGames)

    return (
        <div>

        </div>
    )
}

export default TopGames