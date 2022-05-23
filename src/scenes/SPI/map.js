import React, { Component, Fragment, PureComponent } from "react";

import { connect } from "react-redux";
import {} from "./actions";
import { Row, Col, notification, Table } from "antd";
import MenuOption from "./components/MenuOption";
import { calculateSPI } from "./actions";
import Map from "./components/leafletMap.js";
import SPITable from "./components/table.js";

const moment = require("moment");
// const { TabPane } = Tabs;
// const { Title } = Typography;

class AWSMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
    };
  }
  handleSubmit = (file, week, month) => {
    let params = { week: week, month: month };
    const formData = new FormData();
    formData.append("file", file);
    this.props.calculateSPI(formData, params, {
      onSuccess: (response) => {
        //tiff_file_path //excel_file_path
        this.setState({ response: response });
        notification.success({ message: "Tính toán thành công" });
      },
      onError: (error) =>
        notification.error({ message: `${error} - Tính toán thất bại` }),
    });
  };
  async componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Row style={{ paddingBottom: "7px" }}>
          <MenuOption onSubmit={this.handleSubmit} />
        </Row>
          {Object.entries(this.state.response).length === 0 ? (
            ""
          ) : (
            <Row>
            <Col span={8}>
               <SPITable fileExcel={this.state.response.excel_file_path } />
            </Col>
            <Col span={16}>
              <Map fileTiff={this.state.response.tiff_file_path } />
            </Col>
            </Row>
          )}
   
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  calculateSPI: (payload, params, meta) =>
    dispatch(calculateSPI(payload, params, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AWSMap);
