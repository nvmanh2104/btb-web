import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Divider, Modal, Layout } from 'antd'
import { withRouter } from 'react-router'

import UserDropdown from './components/user-dropdown'
import select from '../../util/select'
import { logOut, setOpenKey } from './actions'
import ROUTER from '../../constants/router'
//import { isBelowBreakpoint } from '../../util/windows'

const { Header } = Layout

class GlobalHeader extends React.Component{

    // static getDerivedStateFromProps(props){
    //     return null
    // }
    
    onChangeProfile = () => {
        this.props.history.push(ROUTER.ACCOUNT.PASSWORD)
    }

    logOut = () => {
        Modal.confirm({ 
            title: "Bạn chắc chắn đăng ?",
            okText: 'Có',
            cancelText: 'Không',
            onOk: () => {
                this.props.logOut()
            },
            onCancel(){}
        })
    }

    render() {
        const { user, title } = this.props
        return (
            <Header style={{
                background: '#fff',
                padding: 0,
                boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
            }}
            >
                <span style={{
                    paddingLeft: '30px',
                    fontSize: '24px',
                    textOverflow: 'ellipsis',
                    maxWidth: '600px',
                    overflowY: 'visible',
                    overflowX: 'hidden',
                    display: ' inline-block',
                    whiteSpace: 'nowrap'
                }}>
                    {title}        
                </span>
                <div style={{ float: 'right' }}>
                    <UserDropdown onClick={this.onChangeProfile} logOut={this.logOut}>
                        <Avatar src={
                            user.avatar ? user.avatar : "/images/user.jpg"
                        } />
                    </UserDropdown>
                    <Divider type="vertical" />
                </div>
            </Header>
        )
    }
}

const mapStateToProps = state => ({   
    currentPage: select(state, ['appReducer', 'app'], 'currentPage'),
    openKey: select(state, ['appReducer', 'app'], 'openKey'),
    user: select(state, 'authReducer', 'user'),
    title: select(state, ['appReducer', 'titleReducer'], 'title')    
})

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
    setOpenKey: openKey => dispatch(setOpenKey(openKey)),    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalHeader))