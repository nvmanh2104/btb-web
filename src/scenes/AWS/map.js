import React, { Component, Fragment,PureComponent } from "react";
import { connect } from "react-redux";
import select from "../../util/select";
import {
  getStations,
  // get10mDatas,
  get10mStationDatas,
  get1hStationDatas,
  getDataTables,
  getStationGroup,
  getWaterDataTables,
  get10mStationWaters,
  get1hStationWaters
} from "./actions";
import { Row, Col, Tabs, Typography } from "antd";
import Map from "./components/leafletMap.js";

import DetailRainChart from "./components/chart";
import DetailWaterChart from "./components/waterLevelChart";
import {
  pad,
} from "../../util/getCurrentDateTime";


const moment = require("moment");
const { TabPane } = Tabs;
const { Title } = Typography;

class AWSMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    isWaterLevel:false
    };
    
  }

   clickWaterLevel =(isWaterLevel)=>{
     this.setState({isWaterLevel:isWaterLevel})
   }

  operations = (stationid) => (
    <Row style={{ paddingRight: "10px" }}>
      <Col span={20}>
        <Title level={4}>Trạm:{stationid}</Title>
      </Col>
      <Col span={4}></Col>
    </Row>
  );

  async componentDidMount() {
    await this.props.getStationGroup()
    await this.props.getStations();
	  this.getFirstData()
 
	// this.interval = setInterval(() => {
	// 	this.updateCurrentData()
	//  }, 1000*60*2);
    
  }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  getFirstData= ()=>{

	var current = moment().format("YYYY-MM-DDTHH:mm:ss");
	var DateTimeFrom = moment().format('YYYY-MM-DD')+"T00:00:00"
	var DateTimeTo =  moment().add(1, 'd').format('YYYY-MM-DD')+"T00:00:00"
	var StationIDs = null
	var Interval = 60
	this.props.getDataTables({StationIDs,Interval,DateTimeFrom,DateTimeTo})
  this.props.getWaterDataTables({StationIDs,Interval,DateTimeFrom,DateTimeTo})

  this.props.get10mStationDatas({
	  StationIDs: "48010",
	  DateTimeFrom: moment().add(-24, "h").format("YYYY-MM-DDTHH:mm:ss"),
	  DateTimeTo: current,
	});
  this.props.get1hStationDatas({
		StationIDs:"48010",
		DateTimeFrom: moment().add(-72, "h").format("YYYY-MM-DDTHH:mm:ss"),
		DateTimeTo: current,
	  });
}

  updateCurrentData= ()=>{
	var current = moment().format("YYYY-MM-DDTHH:mm:ss");
	// var DateTimeFrom = moment().add(-10, "m").format("YYYY-MM-DDTHH:mm:ss");
	// this.props.get10mDatas({
	//   StationIDs: null,
	//   DateTimeFrom: DateTimeFrom,
	//   DateTimeTo: current,
	// });
	var DateTimeFrom = moment().format('YYYY-MM-DD')+"T00:00:00"
	var DateTimeTo =  moment().add(1, 'd').format('YYYY-MM-DD')+"T00:00:00"
	var StationIDs = null
	var Interval = 60
	this.props.getDataTables({StationIDs,Interval,DateTimeFrom,DateTimeTo})
  this.props.getWaterDataTables({StationIDs,Interval,DateTimeFrom,DateTimeTo})


   if( this.props.list10mDatasDetail.length!=0)
   {
    this.props.get10mStationDatas({
      StationIDs:this.props.list10mDatasDetail[0].StationID ,
      DateTimeFrom: moment().add(-24, "h").format("YYYY-MM-DDTHH:mm:ss"),
      DateTimeTo: current,
    });
    this.props.get1hStationDatas({
      StationIDs:this.props.list10mDatasDetail[0].StationID ,
      DateTimeFrom: moment().add(-72, "h").format("YYYY-MM-DDTHH:mm:ss"),
      DateTimeTo: current,
      });
    this.props.get10mStationWaters({
        StationIDs:this.props.list10mDatasDetail[0].StationID ,
        DateTimeFrom: moment().add(-24, "h").format("YYYY-MM-DDTHH:mm:ss"),
        DateTimeTo: current,
      });
      this.props.get1hStationWaters({
        StationIDs:this.props.list10mDatasDetail[0].StationID ,
        DateTimeFrom: moment().add(-72, "h").format("YYYY-MM-DDTHH:mm:ss"),
        DateTimeTo: current,
        });

   }
  }




  getFulllist10mDatasDetail = (list10mDatasDetail) => {
    var newArray = [];
    for (var i = 144; i >= 0; i--) {
      var newDateObj = moment()
        .add(-i * 10, "m")
        .toDate();
      var minutes = Math.floor(new Date(newDateObj).getMinutes() / 10) * 10;
      var stringDate = `${newDateObj.getFullYear()}-${pad(
        newDateObj.getMonth() + 1,
        2
      )}-${pad(newDateObj.getDate(), 2)}T${pad(newDateObj.getHours(), 2)}:${pad(
        minutes,
        2
      )}`;
      var a = list10mDatasDetail.filter(function (item) {
        return item.DateTime.includes(stringDate);
      });
     
      if (a.length === 0) {
        var obj = {
          Battery: 0,
          CreatedTime: stringDate,
          DateTime: stringDate + ":00",
          Rain60: 0,
          RainTotal: 0,
          StationID: list10mDatasDetail[0]["StationID"],
          UpdatedTime: stringDate,
          Value: null,
        };
        newArray.push(obj);
      } else {
        newArray.push(a[0]);
      }
    }
    return newArray;
  };
  getFulllist1hDatasDetail = (list1hDatasDetail) => {
    var newArray = [];
    for (var i = 72; i >= 0; i--) {
      var newDateObj = moment()
        .add(-i * 60, "m")
        .toDate();
      var hours = Math.floor(new Date(newDateObj).getHours());
      var stringDate = `${newDateObj.getFullYear()}-${pad(
        newDateObj.getMonth() + 1,
        2
      )}-${pad(newDateObj.getDate(), 2)}T${pad(hours, 2)}`;
      var a = list1hDatasDetail.filter(function (item) {
        return item.DateTime.includes(stringDate);
      });
      if (a.length === 0) {
        var obj = {
          Battery: 0,
          CreatedTime: stringDate + ":00",
          DateTime: stringDate + ":00:00",
          Rain60: 0,
          RainTotal: 0,
          StationID: list1hDatasDetail[0]["StationID"],
          UpdatedTime: stringDate + ":00",
          Value: null,
        };
        newArray.push(obj);
      } else {
        newArray.push(a[0]);
      }
    }
    return newArray;
  };
  render() {
    var { stations,list10mDatasDetail, list1hDatasDetail,stationGroup} = this.props;
    // console.log(list10mDatasDetail)
    console.log(this.state.isWaterLevel)
    
    let rainStations = [];
    let waterStations = [];

    for (let i = 0; i < stations.length; i ++) {
        if (stations[i].DefaultType === "rain") {
          rainStations.push(stations[i])
        }
        if (stations[i].DefaultType === "waterlevel") {
          waterStations.push(stations[i])
        }
    }
    var newArray = {};
    var new1hArray = {};
  
    if (list10mDatasDetail.length !== 0) {
      newArray = this.getFulllist10mDatasDetail(list10mDatasDetail);
    }
    if (list1hDatasDetail.length !== 0) {
      new1hArray = this.getFulllist1hDatasDetail(list1hDatasDetail);
    }

	var operations = stations.length !==0 &&list1hDatasDetail.length !== 0
	? <Title level={4} style={{paddingRight:8}}>Mã: {list1hDatasDetail[0].StationID} Trạm: {stations.find(x=>x.StationID===list1hDatasDetail[0].StationID).StationName.VN}-{stations.find(x=>x.StationID===list1hDatasDetail[0].StationID).Address.VN.District} </Title>
	: ""
    return (
      <Fragment>
        <Col span={12}>
          <Map
            stations={rainStations}
            waterstations ={waterStations}
            stationGroup = {this.props.stationGroup}
            dataTables ={this.props.dataTables}
            waterDataTables ={this.props.waterDataTables}
            get10mStationDatas={(params) =>
              this.props.get10mStationDatas(params)
            }
            get1hStationDatas={(params) => this.props.get1hStationDatas(params)}
            get10mStationWaters={(params) =>
              this.props.get10mStationWaters(params)
            }
            get1hStationWaters={(params) =>
              this.props.get1hStationWaters(params)
            }
            clickWaterLevel ={this.clickWaterLevel}
            
          />
        </Col>
        <Col span={12}>
   
        
          <Row>
            <Tabs
              defaultActiveKey="1"
              tabBarExtraContent={operations}
            >
               <TabPane tab="Dữ liệu 1H" key="1">
                 {this.state.isWaterLevel ===false? 
                   <DetailRainChart detailRainData={new1hArray} />:
                   <DetailWaterChart detailRainData={new1hArray} />
                }
              
              </TabPane>
              <TabPane tab="Dữ liệu 10M " key="2">
              {this.state.isWaterLevel ===false? 
                   <DetailRainChart detailRainData={newArray} />:
                   <DetailWaterChart detailRainData={newArray} />
                }
              </TabPane>
             
            </Tabs>
          </Row>
        </Col>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  stations: select(state, ["awsReducer", "stations"], "items"),
  stationGroup: select(state, ["awsReducer", "stationGroup"], "items"),
  list10mDatas: select(state, ["awsReducer", "list10mDatas"], "items"),
  // isDisplay: select(state, ['awsReducer', 'isDisplay'],'isOpen'),
  list10mDatasDetail: select(
    state,
    ["awsReducer", "list10mDatasDetail"],
    "items"
  ),
  list1hDatasDetail: select(
    state,
    ["awsReducer", "list1hDatasDetail"],
    "items"
  ),
  dataTables: select(
    state,
    ["awsReducer", "dataTables"],
    "items"
  ),
  waterDataTables: select(
    state,
    ["awsReducer", "waterDataTables"],
    "items"
  ),
  // list10mWaterDetail: select(
  //   state,
  //   ["awsReducer", "list10mWaterDetail"],
  //   "items"
  // ),
});


const mapDispatchToProps = (dispatch) => ({
  getStations: (params) => dispatch(getStations(params)),
  get10mStationDatas: (params) => dispatch(get10mStationDatas(params)),
  getStationGroup:(params) => dispatch(getStationGroup(params)),
  get1hStationDatas: (params) => dispatch(get1hStationDatas(params)),
  getDataTables: (params) => dispatch(getDataTables(params)),
  getWaterDataTables: (params) => dispatch(getWaterDataTables(params)),
  get10mStationWaters:(params) => dispatch(get10mStationWaters(params)),
  get1hStationWaters:(params) => dispatch(get1hStationWaters(params)),

  
});

export default connect(mapStateToProps, mapDispatchToProps)(AWSMap);
