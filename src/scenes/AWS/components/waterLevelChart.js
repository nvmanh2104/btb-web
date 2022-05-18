import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import WithLoading from '../../../hoc/loading';
import PropTypes from 'prop-types'


const CustomizedAxisTick = (tick) => {
  
  var time =tick.split('T')[1].slice(0, -3);
  var a =tick.split('T')[0]
  var date =time+ " "+ a.substring(8,10)+"/"+ a.substring(5,7)
  

  return date
}

// const renderQuarterTick = (tickProps) => {
//   const { x, y, payload } = tickProps;
//   const { value } = payload;
//   // var firstTime = Data[0]
//   var date = value.split('T')[0]
//   return <text x={x} y={y} >{date}</text>;
//   }

 class DetailWaterChart extends React.PureComponent {

  render(){
    return(
<ResponsiveContainer  width='100%' aspect={4.0/3.0} minHeight={400}>
 <LineChart
   
    data={this.props.detailRainData}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="DateTime" angle={30} dx={15} dy ={15} height={70}
            interval={6}  tickFormatter={CustomizedAxisTick}  />
    {/* <XAxis dataKey="DateTime"   height={20}
            // axisLine={false}
            // tickLine={false}
            angle={30} dx={20} 
            interval={12}
            
            // tick={renderQuarterTick}
            //scale="band"
            // xAxisId="quarter" 
          //  angle={30} dx={20}
           /> */}
    <YAxis interval="preserveStartEnd" unit="cm"  domain={[dataMin => ( (dataMin*0.998).toFixed(0)), dataMax => (dataMax*1.002).toFixed(0)]} />
    <Tooltip formatter={(value) => (value.toFixed(0))}/>
    <Line type="monotone" dataKey="Value" stroke="#000000" activeDot={{ r: 8 }} strokeWidth={1.5}/>
    {/* <Brush dataKey='name' stroke="#8884d8" height={10} /> */}
    {/* <Line type="monotone" dataKey="err" stroke="none" /> */}
  </LineChart>
  </ResponsiveContainer>
    )
  }}
//const DetailRainChart =({detailRainData}) => (

    DetailWaterChart.propTypes = {
    detailRainData:  PropTypes.array.isRequired,

}

DetailWaterChart.defaultProps = {
    detailRainData: [],

}


export default WithLoading(DetailWaterChart)