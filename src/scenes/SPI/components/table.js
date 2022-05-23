import React, { Component } from "react";
import {  ExcelRenderer } from "react-excel-renderer";
import { Table ,Row, Col } from "antd";
import axios from 'axios';
class SPITable extends Component {
  constructor(props) {
    super(props);
    this.state = {  
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
            title: "SPI",
            dataIndex: "spi",
            editable: false
          },
        ]
    };
  }
 componentDidMount(){
  
  this.displayTable(this.props.fileExcel);
  }

    displayTable(url) {
        axios({
        url:url,
        method:'GET',
        responseType: 'blob'
      })
      .then((response) => {
   
                  const url = (new File([response.data], "file.xlsx", {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", lastModified:new Date().getTime()}));
                  let fileName = url.name;
                  //check for file extension and pass only if it is .xlsx and display error message otherwise
                  if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
                    ExcelRenderer(url, (err, resp) => {
                       
                        if(err){
                          console.log(err);            
                        }
                        else{

                            let newRows = [];
                            resp.rows.slice(1).map((row, index) => {
                              if (row && row !== "undefined") {
                                newRows.push({
                                  key: index,
                                  name: row[0],
                                  spi: row[1],
                                });
                              }
                            });
                            if (newRows.length === 0) {
                              this.setState({
                                errorMessage: "file không có dữ liệu!"
                              });
                              return false;
                            } else {
                              this.setState({
                                cols: resp.cols,
                                rows: newRows,
                                errorMessage: null
                              });
                            }
                        }

                    });    
                  }    
                  else{
                    // this.setState({
                    //   isFormInvalid: true,
                    //   uploadedFileName: ""
                    // })
                  }
                 
                  
    })
   
  }

  render() {
   
    return(
  <>
  {/* {this.state.rows===''?'':<OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />} */}
  {this.state.rows===''?'': <Table
           
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={this.state.columns}
          />}
  </>
        
    );
  }
}
export default SPITable;
