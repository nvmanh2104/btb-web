import React from "react";
import { Layout, Button } from "antd";
import AdminSidebar from "../AdminSideBar/sidebar";
import { Switch, Route ,Redirect} from 'react-router-dom'
import ROUTER from '../../constants/router'
import SPI from "../SPI/index";
import PET from '../PET/index'
import "../../assets/css/style.css";
import WithAuthenticationHOC from "../../hoc/authenticate";
import "./admin.css";
import ARI from "../ARI/index";
import THI from '../THI/index'
import SCWB from '../SCWB/index'
import WRSI from '../WRSI/index'
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
        <Route exact path={ROUTER.HOME} render={()=> <Redirect to={ROUTER.SPI.INDEX}/>}   />
          <div className="site-layout-content">
            <SPI />
           <PET/>
           <ARI/>
           <THI/>
           <SCWB/>
           <WRSI/>
          </div>
          
        </Content>
      </Layout>
      // :''
    );
  }
}

// const Authentication = WithAuthenticationHOC(true)(AdminLayout);
export default WithAuthenticationHOC(false)(AdminLayout);
