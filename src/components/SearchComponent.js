import React, { useEffect, useState, Component } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { getGames, getTopGames } from '../actions/gameActions'
import Autosuggest from 'react-autosuggest'
import gamesList from '../config/allGames'

import { getTopStreams } from '../actions/streamActions'

//Auto suggest => add streams list to auto fill

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : gamesList.games.filter(game => 
      game.toLowerCase().slice(0, inputLength) === inputValue
    )
}

const getSuggestionValue = suggestion => suggestion

const renderSuggestion = suggestion => (
    <span>
      {suggestion}
    </span>
  )

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


class Search extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            suggestions: []
        }
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const gameData = {}
        console.log(this.state.value)
        this.props.getTopStreams() // temporary, for scraping games list
        //dispatch(getTopGames())
        //dispatch(getGames(gameData))
    }

    render() {
        const { value, suggestions } = this.state
        const inputProps = {
          placeholder: "Game* or Steamer*",
          value,
          onChange: this.onChange
        }

        return (
            <div className="getGames">
                <h3 className="submitTitle">Search <b className="textAccent">Twitch</b> by game or streamer</h3>
                <form
                    className="submitGamesForm" 
                    onSubmit={this.handleSubmit}
                >
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
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
                        >
                            find streamer
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { getGames, getTopGames, getTopStreams }
)(Search)
