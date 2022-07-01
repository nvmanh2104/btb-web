import React, { Component, Fragment, PureComponent } from "react";
import {  ExcelRenderer } from "react-excel-renderer";
import { connect } from "react-redux";
import {} from "./actions";
import { Row, Col, notification, Table } from "antd";
import MenuOption from "./components/MenuOption";
import {
  calculateWRSI,
} from "./actions";
import Map from "./components/leafletMap.js";
import SCWBTable from "./components/table.js";
import axios from 'axios';
const moment = require("moment");
// const { TabPane } = Tabs;
// const { Title } = Typography;

class WRSIMap extends Component {
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
          title: "Đầu Vụ",
          dataIndex: "dv",
          editable: false
        },
        {
          title: "Phát Triển",
          dataIndex: "pt",
          editable: false
        },
        {
          title: "Giữa Vụ",
          dataIndex: "gv",
          editable: false
        },
        {
          title: "Cuối Vụ",
          dataIndex: "cv",
          editable: false
        },
        {
          title: "WRSI",
          dataIndex: "tb",
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
                  dv: row[1].toFixed(1),
                  pt:row[2].toFixed(1),
                  gv:row[3].toFixed(1),
                  cv:row[4].toFixed(1),
                  tb:row[5].toFixed(1)
                });
              }
            });
            if (newRows.length === 0) {
              this.setState({
                errorMessage: "file không có dữ liệu!",
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
  handleSubmit = (file, type,total_days, week, month, year) => {
    month = parseInt(month);
    
    total_days=parseInt(total_days);
    let params;
    const formData = new FormData();
    formData.append("file", file);

        params = { week: week,total_days:total_days,type:type, month: month,year:year };
        this.props.calculateWRSI(formData, params, {
          onSuccess: (response) => {
            //tiff_file_path //excel_file_path
            this.displayTable(response.excel_file_path,response.tiff_file_path)
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
              Tính toán chỉ số WRSI
            </div>
          </Col>
        </Row>
        {this.state.tiffFile==="" ? (
          ""
        ) : (
          <Row>
            <Col span={12}>
              <SCWBTable rows={this.state.rows} columns ={this.state.columns} />
            </Col>
            <Col span={12}>
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
  calculateWRSI: (payload, params, meta) =>
    dispatch(calculateWRSI(payload, params, meta)),
});

 export default connect(mapStateToProps, mapDispatchToProps)(WRSIMap);
