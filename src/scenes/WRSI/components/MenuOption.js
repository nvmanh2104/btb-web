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
  let { type,total_days,week, month,year,upload} = values
  var file = upload[0].originFileObj
  year= year.year()
  // const formData = new FormData()
  // formData.append('file', file)
 // eslint-disable-next-line default-case
 this.props.onSubmit(file,type,total_days, week, month,year);



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
          <Item
              label="Giống cây trồng"
              name="type"
              initialValue={"LUA_DONG_XUAN"}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select style={{ width: "100%" }}>
                <Option value="LUA_DONG_XUAN">Lúa Đông Xuân</Option>
                <Option value=" LUA_HE_THU">Lúa Hè Thu</Option>
                <Option value="LUA_VU_MUA">Lúa Vụ Mùa</Option>
                <Option value="NGO_HE_THU">Ngô Hè Thu</Option>
                <Option value="LAC_HE_THU">Lạc Hè Thu</Option>
                <Option value="DAU_TUONG_HE_THU">Đậu Tương Hè Thu</Option>
                <Option value="NGO_VU_MUA">Ngô Vụ Mùa</Option>
                <Option value=" DAU_TUONG_VU_MUA">Đậu Tương Vụ Mùa</Option>
              </Select>
            </Item>
            <Item
              label="Tổng số ngày"
              name="total_days"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              initialValue={"90"}
            >
              <Select style={{ width: "100%" }}>
                <Option value="90">90</Option>
                <Option value="100">100</Option>
                <Option value="110">110</Option>
                <Option value="120">120</Option>
                <Option value="130">130</Option>
                <Option value="140">140</Option>
                <Option value="150">150</Option>
                <Option value="160">160</Option>
                <Option value="250">250</Option>
                <Option value="320">110</Option>
                <Option value="320">110</Option>
                <Option value="365">365</Option>
              </Select>
            </Item>
        
          
            <Item
              label="Tuần bắt đầu"
              name="week"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              initialValue={"1"}
            >
              <Select style={{ width: "100%" }}>
                <Option value="1">t1</Option>
                <Option value="2">t2</Option>
                <Option value="3">t3</Option>
              </Select>
            </Item>
        

            <Item
              label="Tháng"
              name="month"
              initialValue={"1"}
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
          <Item
            label="Năm"
            name="year"
            rules={[
              {
                required: true,
                message: "Cần chọn năm",
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
