import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    streamScrape, 
    streamFadeOff, 
    setStreamsLoading,
    clearStreams 
} from '../actions/streamActions'

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
            findBy: false,
            redirectGame: false,
            redirectStream: false
        }
        this.handleCheckBox = this.handleCheckBox.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.error !== prevProps.error) {
            return this.props.error.msg.status === 401
                ? this.props.setAuthToken('')
                : null
        }
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
        const searchData = encodeURIComponent(this.state.value)
                            .replace(/'/g, "%27")
                            .replace(/&/g, "%26")
        const twitchToken = this.props.auth.token
        this.props.clearErrors()
        this.props.clearGames()
        this.props.clearStreams()
        this.props.streamFadeOff()
        if (this.state.findBy === false) {
            this.props.getGame(twitchToken, searchData)
            this.props.setStreamsLoading()
            this.setState({
                redirectGame: true,
                redirectStream: false,
                value: ''
            })
        } else {
            this.props.getStream(twitchToken, searchData)
            this.props.setGamesLoading()
            this.setState({
                redirectGame: false,
                redirectStream: true,
                value: ''
            })
        }
    }

    renderRedirect = () => {
        if (this.state.redirectGame) {
            return <Redirect to='/twitch-api/game' />
        } else if (this.state.redirectStream) {
            return <Redirect to='/twitch-api/stream' />
        }
    }

    render() {
        const { value, suggestions } = this.state
        const inputProps = {
          placeholder: this.state.findBy === false ? "Game*" : "Stream*",
          value,
          onChange: this.onChange
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
                            checked={this.state.findBy}
                            onChange={this.handleCheckBox}
                        />
                        <label htmlFor="toggle">
                            <div className="can-toggle__switch" data-checked="Stream" data-unchecked="Game"></div>
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
                        {this.renderRedirect()}
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
    error: state.error,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { 
        getGame, 
        getStream, 
        streamScrape, 
        clearErrors, 
        streamFadeOff ,
        setGamesLoading,
        setStreamsLoading,
        clearGames,
        clearStreams,
        setAuthToken
    }
)(Search)
