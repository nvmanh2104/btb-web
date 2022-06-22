import React, { Component, Fragment, PureComponent } from "react";
import { backpage, isBelowBreakpoint } from "../../../util/windows";
import { connect } from "react-redux";
import {} from "../actions";
import {
  Select,
  DatePicker,
  Form,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Map from "./leafletMap.js";
const { Item } = Form;
const { Option } = Select;
const moment = require("moment");
// const { TabPane } = Tabs;
// const { Title } = Typography;

class MenuOption extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      method: "Tuần",
    };
  }

  handleUpload=({fileList})=>{
    return  fileList
  }

handleSubmit =(values)=>{
  let { datetime,upload} = values
  var file = upload[0].originFileObj
  let day=datetime.date()
  let month =datetime.month()+1
  // const formData = new FormData()
  // formData.append('file', file)
 // eslint-disable-next-line default-case
 this.props.onSubmit(file,day,month);

}
  async componentDidMount() {}
  methodChange = (e) => {
    this.setState({ method: e });
  };

  render() {
  

    return (
      <>
        <Form onFinish={this.handleSubmit} layout="inline">
          <Item
          
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={this.handleUpload}
          rules={[
            {
              required: true,
              message: "Cần upload file",
            },
          ]}
          >
          <Upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          </Item>
        <Item>

          
        </Item>
        <Item
            label="Ngày"
            name="datetime"
            rules={[
              {
                required: true,
                message: "Cần chọn ngày",
              },
            ]}
          >
            <DatePicker />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: isBelowBreakpoint() ? "none" : "right" }}
            >
              Tính Toán
            </Button>
          </Item>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuOption);
