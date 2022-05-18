import React, { Component, Fragment, PureComponent } from "react";

import { connect } from "react-redux";
import {} from "./actions";
import {Row,Col,notification} from "antd";
import MenuOption from "./components/MenuOption";
import { calculateSPI } from './actions';
import Map from "./components/leafletMap.js";

const moment = require("moment");
// const { TabPane } = Tabs;
// const { Title } = Typography;

class AWSMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  handleSubmit = (payload) => {
    
    this.props.calculateSPI(payload, {
        
        onSuccess: () => {
            notification.success({ message: 'Tính toán thành công' })
           
        },
        onError: error => notification.error({ message: `${error} - Tính toán thất bại` })            
    })
}  
  async componentDidMount() {}


  render() {


    return (
      <Fragment>
     <Row  style={{ paddingBottom: '7px' }}>
     <MenuOption onSubmit={this.handleSubmit} />
     </Row>
     <Row>
       <Col span ={8}>
       </Col>
       <Col span ={16}>
       <Map/>
       </Col>
     </Row>
     
    </Fragment>
      
      
       
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  calculateSPI: (payload, meta) => dispatch(calculateSPI( payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AWSMap);
