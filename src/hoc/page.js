import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPage, setOpenKey } from '../scenes/Header/actions'

const WithPageHOC = ( page, openKey ) => WrappedComponent => {
    class Page extends Component{
        componentDidMount() {
            debugger
            this.props.setPage(page)
            this.props.setOpenKey(openKey)
          }
        
        render(){
            return <WrappedComponent {...this.props} />
        }
    }
    const mapStateToProps = () => ({})
    const mapDispatchToProps = dispatch => ({
        setPage: page => dispatch(setPage(page)),
        setOpenKey: openKey => dispatch(setOpenKey(openKey)),
    })

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Page)
}

export default WithPageHOC