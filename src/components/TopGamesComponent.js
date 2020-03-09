import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getTopStreams
} from '../actions/streamActions'

import GameCard from './GameCardComponent'

const TopGames = () => {
    const topGames = useSelector(state => state.game.topGames)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopStreams())
    }, []) //using an empty array should only allow this to update on mount

    return (
        <div>

        </div>
    )
}

/*
//Functional component
const Search = () => {
    const [game] = useSelector(state => state.game.game)
    const topGames = useSelector(state => state.game.topGames)
    const dispatch = useDispatch()
    let gameData = { //dummy
        id: 493057
    }

    const [text, updateText] = useState({searchGamesInput: ''})
    const [suggestions, updateSuggestions] = useState([])

    const handleChange = (event, { newValue, method }) => {
        updateText({
            ...text,
            [event.target.name]: [event.target.value]
        })
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        updateSuggestions({
          suggestions: getSuggestions(value)
        });
      };
    
    const onSuggestionsClearRequested = () => {
        updateSuggestions({
          suggestions: []
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault()
        gameData = {}
        console.log(text)
        dispatch(getTopGames())
        //dispatch(getGames(gameData))
    }
    
    useEffect(() => {
        //update this for final instead of the button
    })

    const inputProps = {
        placeholder: "Game* or Steamer*",
        value: text,
        onChange: handleChange
    }

    return (
        <div className="getGames">
            <h3 className="submitTitle">Search <b className="textAccent">Twitch</b> by game or streamer</h3>
            <form
                className="submitGamesForm" 
                onSubmit={handleSubmit}
            >
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                {<input
                    value={text.searchGamesInput}
                    onChange={handleChange}
                    type="text"
                    name="searchGamesInput"
                    placeholder="Game* or Steamer*"
                    className="submitGamesInput"
                />}
                <div className="buttonWrapper">
                    <button
                        type="submit"
                        name="game"
                        className="findGameButton"
                    >
                        find game
                    </button>
                    <div className="verticalRuleSmall"></div>
                    <button
                        type="submit"
                        name="streamer"
                        className="findGameButton"
                        onSubmit={() => //this needs to set global state to the submitted stramer, then redirect to '/streamer'
                            dispatch(getGames(gameData))
                        }
                    >
                        find streamer
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Search*/

export default TopGames