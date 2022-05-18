
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import select from '../../util/select';
// import StatisticForm from './Components/TimePicker'
import { Row } from 'antd';
import { getStations,getDataTables,getExcelTables,getYearExcelTables} from './actions';
// import { getCurrentDate, getPreviousTime, pad } from '../../util/getCurrentDateTime'
import DetailTable from './Components/DetailTable'
// import { objectOf } from 'prop-types';
import TimePicker from './Components/TimePicker';
// import { json2excel } from 'js2excel'
const moment = require('moment')

class StatisticPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
       
        var DateTimeFrom = moment().format('YYYY-MM-DD')+"T00:10:00"
        var DateTimeTo =  moment().add(1, 'd').format('YYYY-MM-DD')+"T00:00:00"
        var StationIDs = null
        var Interval = 10
        this.props.getDataTables({StationIDs,Interval,DateTimeFrom,DateTimeTo})
        // this.interval = setInterval(() => {
        //     this.handleSubmit()
        //  }, 1000*10);
    }
    // componentDidUpdate({ stations }) {
       
    // }

    handleSubmit =(payload)=>{
     this.props.getDataTables(payload)
    }
    // getExcel(data){
    //     try {
    //         json2excel({
    //             data,
    //             name: 'rain_data',
    //             // formateDate: 'yyyy/mm/dd'
    //         });
    //     } catch (e) {
    //         console.error('export error');
    //     }
    // }

render() {
    var { stations,dataTables,stationGroup} = this.props
    var rainStations = stations.filter((station)=>{
        return station.DefaultType ==='rain'
    })
 
    var newarray =[]
    var datalength = 0
    if (dataTables.length !==0){
        dataTables.map(function (data){
           
       var newdata = {...data,TotalRain:data["TotalRain"].toFixed(1)}
        var a = data["Data"]
     

        let c= {...a}

        Object.keys(c).forEach(key=>{ c[key] = c[key].toFixed(1) });

        var {Data,...b}=newdata
        var obj={...b,...c}
        if(Object.keys(a).length>datalength){
            newarray.unshift(obj)
            datalength=Object.keys(a).length
        }
        else{
            newarray.push(obj)
        }
       
    })}
  
    return (
        <Fragment>
            <Row style={{
                paddingTop:'3px'
            }}>
                <TimePicker 
                stations= {rainStations}
                stationGroup ={stationGroup}
                onSubmit={this.handleSubmit} 
                // getExcelTables={()=>this.getExcel(newarray)}
                getExcelTables = {this.props.getExcelTables}
                getYearExcelTables ={this.props.getYearExcelTables}
                />
            </Row>
         
            <Row style={{
                padding: '5px'
            }}>
                <DetailTable
                dataTables={newarray}
                />
                 
            </Row>
           
        </Fragment>

    );
}
}

const mapStateToProps = (state) => ({
    stations: select(state, ['awsReducer', 'stations'], 'items'),
    stationGroup: select(state, ["awsReducer", "stationGroup"], "items"),
    // list10mDatas: select(state, ['awsReducer', 'list10mDatas'], 'items'),
    // list1hDatas: select(state, ['awsReducer', 'list1hDatas'], 'items'),
    dataTables: select(state, ['awsReducer', 'dataTables'], 'items'),
    
    
});

const mapDispatchToProps = (dispatch) => ({
    //getStations: (params) => dispatch(getStations(params)),
    // get10mDatas: (params) => dispatch(get10mDatas(params)),
    // get1hDatas: (params) => dispatch(get1hDatas(params)),
    getDataTables: (params) => dispatch(getDataTables(params)),
    getExcelTables:(params)=>dispatch(getExcelTables(params)),
    getYearExcelTables:(params)=>dispatch(getYearExcelTables(params))


});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticPage);
