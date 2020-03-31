import React from 'react'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import gamesList from '../config/allGames'
import streamsList from '../config/allStreams'

import { clearErrors } from '../actions/errorActions'
import { setAuthToken } from '../actions/authActions'
import { 
    getGame, 
    setGamesLoading,
    clearGames 
} from '../actions/gameActions'
import { 
    getStream, 
    streamFadeOff, 
    setStreamsLoading,
    clearStreams 
} from '../actions/streamActions'



const Search = () => {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const accessToken = useSelector(state => state.auth.token)

    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [findBy, setFindBy] = useState(false)
    const [redirectGame, setRedirectGame] = useState(false)
    const [redirectStream, setRedirectStream] = useState(false)

    useEffect(() => { // handle expired token 
        if (error.msg.status === 401) {
            dispatch(setAuthToken(''))
        }
    }, [error, dispatch])

    function handleCheckBox() {
        return findBy ? setFindBy(false) : setFindBy(true)
    }

    function onSuggestionsFetchRequested({ value }) {
        setValue(value)
        !findBy
        ? setSuggestions(getGamesSuggestions(value))
        : setSuggestions(getStreamsSuggestions(value))
    }

    function handleSubmit(event) {
        event.preventDefault()
        const searchData = encodeURIComponent(value)
                            .replace(/'/g, "%27")
                            .replace(/&/g, "%26")
        dispatch(clearErrors())
        dispatch(clearGames())
        dispatch(clearStreams())
        dispatch(streamFadeOff())
        if (!findBy) {
            dispatch(getGame(accessToken, searchData))
            dispatch(setStreamsLoading())
            setRedirectGame(true)
            setRedirectStream(false)
            setValue('')
        } else {
            dispatch(getStream(accessToken, searchData))
            dispatch(setGamesLoading())
            setRedirectGame(false)
            setRedirectStream(true)
            setValue('')
        }
    }

    function renderRedirect() {
        if (redirectGame) {
            return <Redirect to='/twitch-api/game' />
        } else if (redirectStream) {
            return <Redirect to='/twitch-api/stream' />
        }
    }

    //Auto suggest => add games list to auto fill
    const getGamesSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? [] : gamesList.games.filter(game => 
        game.toLowerCase().slice(0, inputLength) === inputValue
        )
    }

    //Auto suggest => add streams list to auto fill
    const getStreamsSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? [] : streamsList.streams.filter(stream => 
        stream.toLowerCase().slice(0, inputLength) === inputValue
        )
    }

    const inputProps = {
        placeholder: findBy === false ? "Game*" : "Stream*",
        value: value,
        onChange: (_, { newValue, method }) => {
            setValue(newValue)
        }
    }

    return (
        <div className="getGames">
            <h3 className="submitTitle">Search <b className="textAccent">Twitch.tv</b></h3>
            <p className="subText">by game or streamer</p>
                <div className="toggleWrapper">
                <div className="can-toggle can-toggle--size-large">
                    <input
                        name="findBy"
                        id="toggle" 
                        type="checkbox"
                        checked={findBy}
                        onChange={handleCheckBox}
                    />
                    <label htmlFor="toggle">
                        <div className="can-toggle__switch" data-checked="Stream" data-unchecked="Game"></div>
                    </label>
                    </div>
                </div>
            <form
                className="submitGamesForm" 
                onSubmit={handleSubmit}
            >
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={() => setSuggestions([])}
                    getSuggestionValue={suggestion => suggestion}
                    renderSuggestion={suggestion =>
                        <span>
                            {suggestion}
                        </span>}
                    inputProps={inputProps}
                />
                <div className="buttonWrapper">
                    {renderRedirect()}
                    <button
                        type="submit"
                        name="game"
                        className="findGameButton"
                    >
                        Search
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Search
