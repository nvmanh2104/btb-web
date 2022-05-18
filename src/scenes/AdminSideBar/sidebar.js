import React from 'react'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ROUTER from '../../constants/router'
import SIDERS from './sidebar-config'
// import { getTitle } from '../Header/actions'
import { isBelowBreakpoint } from '../../util/windows'
import select from "../../util/select";
import Icon from '@ant-design/icons';
const { SubMenu } = Menu
const { Sider } = Layout

class AdminSideBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            oldPath: '',
            openKey: '',
            collapsed: window.innerWidth < 1200
        }
    }

    componentDidMount = () => {
        const path = this.props.location.pathname.slice(1)
        this.setState({
            oldPath: path
        })
        this.chooseOpenKey()
        // this.props.getTitle(path)
    }

    menuItemSelected = e => {
        const path = e.key
        const coll = this.state.collapsed
        if (coll === true){
            this.setState({ openKey: '' })
        }
        this.setState({ oldPath: path })
        // this.props.getTitle(path)
    }

    subMenuSelected = e => {
        const path = e.key
        this.setState({ openKey: path })
    }

    chooseOpenKey = () => {
        if (!this.state.collapsed){
            const path = this.props.location.pathname.slice(1)
            SIDERS.forEach (item => {
                if (item.children){
                    item.children.forEach(children => {
                        if(children.key === path){
                            this.setState({ openKey: item.key })
                            return
                        }
                    })
                }
            })
        }
    }

    renderMenuItem = ({ key, to, icon, title }) => (   
        <Menu.Item key={key} onClick={this.menuItemSelected}>
      <Link to={to}>
        <Icon  style ={{fontSize:'16px'}} type={icon} />
        <span style={{ fontSize:'16px',marginRight: '10px' }}>{title}</span>
      </Link>
    </Menu.Item>    
    )

    renderSubMenu = ({ key, icon, title, children }) => {
        return (
            <SubMenu
                key={key}
                onTitleClick={this.subMenuSelected}
                title={(
                    <span>
                        <Icon type={icon} />
                        <span>{title}</span>
                    </span>
                )}
            >
                {children.map(item => this.renderMenuItem(item))}
            </SubMenu>
        )
    }

    onCollapse = collapsed => {
        if (collapsed){
            this.setState({ collapsed, openKey: '' })
        }else{
            this.setState({ collapsed }, this.chooseOpenKey)
        }
    }

    render(){
        return(
            <Sider collapsible collapsedWidth={isBelowBreakpoint() ? 40: 80} collapsed={this.state.collapsed}
                onCollapse={this.onCollapse} theme="dark" style={{ boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)' }}
            >
                <div style={{ margin: 24, textAlign: 'center', background: 'white' }} >
                    <Link to="">
                        <img src="/images/vnmha.jpg" style={{ width: '50%' }} alt="" />
                    </Link>
                </div>

                <Menu 
                    onClick={this.handleClick}
                    selectedKeys={[ this.state.oldPath ]}
                    mode="inline"
                    theme="dark"
                    openKeys={[ this.state.openKey ]}
                >
                    {SIDERS.map(item => (item.children ? this.renderSubMenu(item) : this.renderMenuItem(item)))}
                </Menu>
            </Sider>
        )
    }
}


const mapStateToProps = (state) => ({
  
  });


// const mapDispatchToProps = dispatch => ({ getTitle: key => dispatch(getTitle(key)) })

export default withRouter(connect(mapStateToProps, '')(AdminSideBar))