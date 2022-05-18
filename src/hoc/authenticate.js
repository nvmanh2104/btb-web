import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { Redirect } from 'react-router'
import { loginWithTokenIfNeed } from '../scenes/Auth/actions'
import LoadingIndicator from '../components/Loading'
import  select from '../util/select'
import ROUTER from '../constants/router'

const WithAuthenticationHOC = needAuthenticated => WrappedComponent => {
    class Authentication extends Component{
        constructor(props) {
            super(props)
            this.state = {}
        }        
        
        static getDerivedStateFromProps(nextProps){
            nextProps.loginWithTokenIfNeed()
            return null
        }

        render(){
            const { isAuthenticated, error, isFetching } = this.props
            if (!isAuthenticated && error && !isFetching) {
                return <Redirect to={ROUTER.AUTH.LOGIN} />
            }
            if (!needAuthenticated || isAuthenticated){
                return <WrappedComponent {...this.props} />
            }
            if ((isFetching && !error && !isAuthenticated) || localStorage.getItem('aaJwt')){
                return (
                    <div
                        style={{
                        height: '100vh',
                        width: '100%',
                        display: 'grid',
                        placeContent: 'center',
                    }}
                    >
                        <LoadingIndicator />
                    </div>
                )
            }    
            return <Redirect to={ROUTER.AUTH.LOGIN} />        
        }        
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
            isFetching: select(state, 'authReducer', 'isFetching'),
            error: select(state, 'authReducer', 'error'),
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            loginWithTokenIfNeed: () => dispatch(loginWithTokenIfNeed())
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Authentication)
}

export default WithAuthenticationHOC
