import React, { Component } from "react";
import {  ExcelRenderer } from "react-excel-renderer";
import { Table ,Row, Col } from "antd";
import axios from 'axios';
class SCWBTable extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    
    };
  }
 componentDidMount(){

  }

   
  
  render() {
   
    return(
  <>
  {/* {this.state.rows===''?'':<OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />} */}
  {this.props.rows===''?'': <Table
           
            rowClassName={() => "editable-row"}
            dataSource={this.props.rows}
            columns={this.props.columns}
          />}
  </>
        
    );
  }
}
export default SCWBTable;