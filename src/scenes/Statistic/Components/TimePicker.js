import React from "react";
import ProTypes from "prop-types";
import { Row, Form, Button, Select, Col, DatePicker,Checkbox } from "antd";
import '../../../assets/css/style.css';

import moment from "moment";
const { Option } = Select;
const { Item } = Form;
const { RangePicker } = DatePicker;

class StatisticForm extends React.Component {

  constructor() {
    super();
    this.state = {
      day: true,
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      document.getElementById("button").click();
    }, 1000 * 60 * 2);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
   cbOnChange=(e)=>{
   this.setState({ day: !this.state.day });
  }
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  intervals = [10, 60, 180, 360, 720, 1440];
  
  preventData =(values)=>{
    var { StationIDs, date, Interval} = values;
    
    StationIDs = StationIDs.toString().includes('all')? null:StationIDs.toString()
  if(StationIDs !==null && StationIDs.includes('b')){
    let lstGroupStation=[]
    this.props.stations.find((o, i)=>{
        if(StationIDs.includes(o.StationGroupCode)){
          lstGroupStation.push(o.StationID)
        }
      })
    var tempStationIDs = StationIDs.split(',')
    var arrStationIDs = tempStationIDs.filter(a=>!a.includes('b'))
    var lstStationsID = lstGroupStation.concat(arrStationIDs)
    StationIDs = lstStationsID.filter((item, pos) => lstStationsID.indexOf(item) === pos).toString()
  }
  if( this.state.day){
    var mydate = date.clone()
    var DateTimeFrom = Interval===1440? mydate.format("YYYY-MM-DD")+"T00:00:00": mydate.format("YYYY-MM-DD") + "T00:10:00";
    var DateTimeTo = mydate.add(1, "d").format("YYYY-MM-DD") + "T00:02:00";
    
  }
  else{
    DateTimeFrom = Interval===1440? this.state.startValue.format("YYYY-MM-DDTHH:mm:00"):this.state.startValue.format("YYYY-MM-DDTHH:mm:50")
    DateTimeTo = this.state.endValue.format("YYYY-MM-DDTHH:mm:50")
  }
    return ({StationIDs,Interval,DateTimeFrom,DateTimeTo})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       var data = this.preventData(values)
        this.props.onSubmit(data)
      }
    });
  };
 

  handleDownload = (e) => {
    // this.props.getExcelTables()
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var data = this.preventData(values)
        this.props.getExcelTables(data)
      }
    });

  };
  yearChange =(e)=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var { StationIDs} = values;
        StationIDs = StationIDs.toString().includes('all')? null:StationIDs.toString()
        if(StationIDs !==null && StationIDs.includes('b')){
          let lstGroupStation=[]
          this.props.stations.find((o, i)=>{
              if(StationIDs.includes(o.StationGroupCode)){
                lstGroupStation.push(o.StationID)
              }
            })
          var tempStationIDs = StationIDs.split(',')
          var arrStationIDs = tempStationIDs.filter(a=>!a.includes('b'))
          var lstStationsID = lstGroupStation.concat(arrStationIDs)
          StationIDs = lstStationsID.filter((item, pos) => lstStationsID.indexOf(item) === pos).toString()
        }
        var Year = parseInt(e)
        this.props.getYearExcelTables({StationIDs,Year})
      }
    });
  }

  render() {
    const formItemLayout1 = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const formItemLayout2 = {
      labelCol: { span: 10 },
      wrapperCol: { span: 13 },
    };
    const children = [<Option key={'all'}>Tất cả</Option>];
    const {
      form: { getFieldDecorator },
      stations,stationGroup
    } = this.props;
    stationGroup.map((item,index) =>{
      // let key ="b"+ parseInt(item.Code)
      children.push(<Option key={`b${item.Code}`}>{item.Name}</Option>);
    });
    stations.map((item, index) => {
      children.push(<Option key={item.StationID}>{item.StationID}</Option>);
    });
  
    const years =[]
    for(let i=2020;i<2030;i++){
      years.push(<Option key={i}>{i}</Option>)
    }
    const { startValue, endValue, endOpen } = this.state;
    
    return (
      <Form
       
        id="Statistic"
        layout="horizontal"
        onSubmit={this.handleSubmit}
      >
        <Row>
          <Col span={5}>
            <Item label="Trạm:" labelAlign="left"  {...formItemLayout1}>
              {getFieldDecorator("StationIDs", {
                initialValue: "all",
                
              })(
                <Select style={{ width: "100%" }} mode="multiple">
                  {children}
                </Select>
              )}
            </Item>
          </Col>
          <Col span={1} style={{marginRight:-20}}>
          <Item >
          {getFieldDecorator('day', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox onChange={this.cbOnChange}></Checkbox>)}
          </Item>
          </Col>
          {this.state.day? <Col span={4}>
            <Item label="Ngày: " labelAlign="left" {...formItemLayout1}>
              {getFieldDecorator("date", {
                initialValue: moment(),
              })(<DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />)}
            </Item>
          </Col>:''}
          
          {this.state.day ?'':<Col span ={7}>
          {/* <Item label="Thời gian: " labelAlign="left" {...formItemLayout1}>
              {getFieldDecorator("datetime", {
                // initialValue: moment(),
              })( <RangePicker
                format="YYYY-MM-D HH:mm"
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                showTime={{ format: "YYYY-MM-DDTHH:mm"}}
                // format="YYYY-MM-DDTHH"
              />)}
            </Item> */}
             <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime={{ format: "YYYY-MM-DDTHH:mm"}} 
          format="YYYY-MM-DD HH:mm"
          value={startValue}
          placeholder="Bắt đầu"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime={{ format: "YYYY-MM-DDTHH:mm"}} 
          format="YYYY-MM-DD HH:mm"
          value={endValue}
          placeholder="Kết thúc"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
          </Col> }
          
          <Col span={4}>
            <Item label="Tần suất:"  labelAlign="left" {...formItemLayout2}>
              {getFieldDecorator("Interval", {
                initialValue: 10,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select
                  style={{ width: "100%" }}
                  onChange={this.intervalChange}
                >
                  {this.intervals.map((item, index) => (
                    <Select.Option key={`interval${index + 1}`} value={item}>
                      {item}phút
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Item>
          </Col>
          <Col span={1}>
            <Item>
              <Button id="button" type="primary" htmlType="submit">
                Xem
              </Button>
            </Item>
          </Col>
          <Col span={1} style={{paddingLeft:10}}>
            <Item >
              <Button id="buttondl" type="default" onClick={this.handleDownload}>
                Tải file
              </Button>
            </Item>
          </Col>
          <Col span={3} style={{paddingLeft:30}}>
            <Item >
            <Select style={{ width: "100%" }} placeholder='Xuất b/c năm' onChange={this.yearChange}>
                  {years}
            </Select>
            </Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

StatisticForm.protoTypes = {
  // user: ProTypes.object,
  // editMode: ProTypes.bool,
  form: ProTypes.object,
  onSubmit: ProTypes.func,
  getExcelTables:ProTypes.func,
  // onDelete: ProTypes.func
};
StatisticForm.defaultProps = {
  // user: {},
  form: {},
  // editMode: false,
  onSubmit: () => {},
  getExcelTables :()=>{}
  // onDelete: () => { }
};

export default (StatisticForm);
