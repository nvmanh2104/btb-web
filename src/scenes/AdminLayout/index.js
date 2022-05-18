import React from "react";
import { Layout, Button } from "antd";
import AdminSidebar from "../AdminSideBar/sidebar";
import { Switch, Route } from 'react-router-dom'
import ROUTER from '../../constants/router'
import SPI from "../SPI/index";
import "../../assets/css/style.css";
import WithAuthenticationHOC from "../../hoc/authenticate";
import "./admin.css";
const { Content } = Layout;

class AdminLayout extends React.Component {
  render() {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          background: "#ffffff",
        }}
      >
        <AdminSidebar />
        <Content>
          <div className="site-layout-content">
            <SPI />
            <Switch>
          			<Route path={ROUTER.HOME} component={SPI} exact />        
        		</Switch>
          </div>
          
        </Content>
      </Layout>
      // :''
    );
  }
}

// const Authentication = WithAuthenticationHOC(true)(AdminLayout);
export default WithAuthenticationHOC(false)(AdminLayout);
