import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import moment from 'moment'
import AdminLayout from './scenes/AdminLayout'
// import AuthLayout from './scenes/Auth'
import 'moment/locale/vi'
import ROUTER from './constants/router'
import 'antd/dist/antd.css';
moment.locale('vi')

class App extends React.Component {


  render() {
    // console.log(this.props.isAuthenticated)
  return (
    <Switch>
      {/* <Route exact path={ROUTER.AUTH.LOGIN} component={AuthLayout} />  */}
      <Route path={ROUTER.SPI} component={AdminLayout} />
     
    </Switch>
  )
}
}

 export default withRouter(App)
