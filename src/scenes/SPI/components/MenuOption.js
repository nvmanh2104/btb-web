import React, { Component, Fragment, PureComponent } from "react";
import { backpage, isBelowBreakpoint } from "../../../util/windows";
import { connect } from "react-redux";
import {} from "../actions";
import {
  Row,
  Col,
  Select,
  DatePicker,
  Form,
  Upload,
  Button,
  notification,
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
  const { method,week, month,season,year,upload} = values
  var file = upload[0].originFileObj
  // const formData = new FormData()
  // formData.append('file', file)
  // console.log(formData.get('file'))
 // eslint-disable-next-line default-case
  switch(method){
    case 'Tuần':
      this.props.onSubmit({ week:week, month:parseInt(month),file:file})
      return
  }



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
          >
          <Upload
          
           
            
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          </Item>
        

          <Item
            label="Thời Đoạn"
            name="method"
            initialValue={"Tuần"}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Select style={{ width: "100%" }} onChange={this.methodChange}>
              <Option value="Tuần">Tuần</Option>
              <Option value="Tháng">Tháng</Option>
              <Option value="Mùa">Mùa</Option>
              <Option value="Năm">Năm</Option>
            </Select>
          </Item>

          {this.state.method === "Tuần" ? (
            <Item
              label="Tuần"
              name="week"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              initialValue={"t1"}
            >
              <Select style={{ width: "100%" }}>
                <Option value="t1">t1</Option>
                <Option value="t2">t2</Option>
                <Option value="t3">t3</Option>
              </Select>
            </Item>
          ) : (
            ""
          )}
          {this.state.method === "Tháng" || this.state.method === "Tuần" ? (
            <Item
              label="Tháng"
              name="month"
              initialValue={1}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select style={{ width: "100%" }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
            </Item>
          ) : (
            ""
          )}
          {this.state.method === "Mùa" ? (
            <Item
              label="Vụ"
              name="season"
              initialValue={"vụ mùa"}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select style={{ width: "100%" }}>
                <Option value="vụ mùa">vụ mùa</Option>
                <Option value="hè thu">hè thu</Option>
                <Option value="đông xuân">đông xuân</Option>
              </Select>
            </Item>
          ) : (
            ""
          )}

          <Item
            label="Năm"
            name="year"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <DatePicker picker="year" />
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
