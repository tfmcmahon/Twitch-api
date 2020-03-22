import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route {...rest} render = {(props) => (
        auth.authenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to='/twitch-api' />
        )
    )} />
)

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)