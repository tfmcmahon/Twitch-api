import React, { useEffect, useState, Component } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { getGames, getTopGames } from '../actions/gameActions'
import Autosuggest from 'react-autosuggest'
import gamesList from '../config/allGames'
import streamsList from '../config/allStreams'

import { getTopStreams } from '../actions/streamActions'

//Auto suggest => add streams list to auto fill

const getGamesSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : gamesList.games.filter(game => 
      game.toLowerCase().slice(0, inputLength) === inputValue
    )
}

const getStreamsSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : streamsList.streams.filter(stream => 
      stream.toLowerCase().slice(0, inputLength) === inputValue
    )
}

const getSuggestionValue = suggestion => suggestion

const renderSuggestion = suggestion => (
    <span>
      {suggestion}
    </span>
)

class Search extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            suggestions: [],
            findBy: false
        }
        this.handleCheckBox = this.handleCheckBox.bind(this)
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        })
    }

    handleCheckBox(event) {
        const target = event.target
        const value = target.checked
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.state.findBy === false ? getGamesSuggestions(value) : getStreamsSuggestions(value)
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
        this.state.findBy === false 
        ? this.props.getTopGames()
        : this.props.getTopStreams() // temporary, for scraping games list
        //dispatch(getTopGames())
        //dispatch(getGames(gameData))
    }

    render() {
        const { value, suggestions } = this.state
        const inputProps = {
          placeholder: this.state.findBy === false ? "Game*" : "Steamer*",
          value,
          onChange: this.onChange
        }

        return (
            <div className="getGames">
                <h3 className="submitTitle">Search <b className="textAccent">Twitch.tv</b></h3>
                <p className="subText">by game or streamer</p>
                 <div class="toggleWrapper">
                    <div class="can-toggle can-toggle--size-large">
                        <input
                            name="findBy"
                            id="toggle" 
                            type="checkbox"
                            checked={this.state.findBy}
                            onChange={this.handleCheckBox}
                        />
                        <label for="toggle">
                            <div class="can-toggle__switch" data-checked="Stream" data-unchecked="Game"></div>
                        </label>
                        </div>
                    </div>
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
                            Search
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
