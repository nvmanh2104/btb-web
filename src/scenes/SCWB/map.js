import React, { Component, Fragment, PureComponent } from "react";
import {  ExcelRenderer } from "react-excel-renderer";
import { connect } from "react-redux";
import {} from "./actions";
import { Row, Col, notification, Table } from "antd";
import MenuOption from "./components/MenuOption";
import {
  calculateWeekSCWB,
  calculateMonthSCWB
} from "./actions";
import Map from "./components/leafletMap.js";
import SCWBTable from "./components/table.js";
import axios from 'axios';
const moment = require("moment");
// const { TabPane } = Tabs;
// const { Title } = Typography;

class SCWBMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiffFile:'',
      cols :'',
      rows:'',
      errorMessage: null,
      columns: [
        {
          title: "NAME",
          dataIndex: "name",
          editable: false
        },
        {
          title: "SCWB",
          dataIndex: "pet",
          editable: false
        },
      ]
    };
  }

  displayTable = (url,tiffFile) => {
    axios({
      url: url,
      method: "GET",
      responseType: "blob",
      
    }).then((response) => {
      const url = new File([response.data], "file.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        lastModified: new Date().getTime(),
      });
      let fileName = url.name;
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf(".") + 1) === "xlsx") {
        ExcelRenderer(url, (err, resp) => {
          if (err) {
            console.log(err);
          } else {
            let newRows = [];
            resp.rows.slice(1).map((row, index) => {
              if (row && row !== "undefined") {
                newRows.push({
                  key: index,
                  name: row[0],
                  pet: row[1],
                });
              }
            });
            if (newRows.length === 0) {
              this.setState({
                errorMessage: "file kh??ng c?? d??? li???u!",
              });
              return false;
            } else {
              this.setState({
                cols: resp.cols,
                rows: newRows,
                errorMessage: null,
                tiffFile:tiffFile
              });
            }
          }
        });
      } else {
        // })
      }
    });
  };
  handleSubmit = (file, method, week, month, year) => {
    month = parseInt(month);
    let params;
    const formData = new FormData();
    formData.append("file", file);

    switch (method) {
      case "Tu???n":
        params = { week: week, month: month,year:year };
        this.props.calculateWeekSCWB(formData, params, {
          onSuccess: (response) => {
            //tiff_file_path //excel_file_path
            this.displayTable(response.excel_file_path,response.tiff_file_path)
            notification.success({ message: "T??nh to??n th??nh c??ng" });
          },
          onError: (error) =>
            notification.error({ message: `${error} - T??nh to??n th???t b???i` }),
        });
        break;
      case "Th??ng":
        params = { month: month,year:year };
        this.props.calculateMonthSCWB(formData, params, {
          onSuccess: (response) => {
            //tiff_file_path //excel_file_path
            this.displayTable(response.excel_file_path,response.tiff_file_path)
            // this.setState({ response: response });
            notification.success({ message: "T??nh to??n th??nh c??ng" });
          },
          onError: (error) =>
            notification.error({ message: `${error} - T??nh to??n th???t b???i` }),
        });
        break;
     
      default:
        return;
    }
  };
  async componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Row style={{ paddingBottom: "7px" }}>
          <Col span={18}>
            <MenuOption onSubmit={this.handleSubmit} />
          </Col>
          <Col span={6}>
            <div
              style={{
                textAlign: "right",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              T??nh to??n ch??? s??? SCWB
            </div>
          </Col>
        </Row>
        {this.state.tiffFile==="" ? (
          ""
        ) : (
          <Row>
            <Col span={8}>
              <SCWBTable rows={this.state.rows} columns ={this.state.columns} />
            </Col>
            <Col span={16}>
              <Map fileTiff={this.state.tiffFile} />
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  calculateWeekSCWB: (payload, params, meta) =>
    dispatch(calculateWeekSCWB(payload, params, meta)),
  calculateMonthSCWB: (payload, params, meta) =>
    dispatch(calculateMonthSCWB(payload, params, meta)),
});

 export default connect(mapStateToProps, mapDispatchToProps)(SCWBMap);
