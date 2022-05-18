import React from 'react';
// import PropTypes, { object } from 'prop-types';
import { Table } from 'antd';


export default class DetailTable  extends React.Component{

 

  
       createCol = (data)=>{
        var columns = [
        {
              title: "Mã Trạm",
              dataIndex: "StationID",
              key: "StationID",
              width: 100,
              fixed: 'left',
    
        }, {
          title: "Tên Trạm",
          dataIndex: "StationName",
          key: "StationName",
          width: 180,
          fixed: 'left',

    },{
      title: "Vị Trí",
      dataIndex: "StationAddress",
      key: "StationAddress",
      width: 100,
      fixed: 'left',

},{
  title: "Tổng",
  dataIndex: "TotalRain",
  key: "TotalRain",
  width: 100,
  fixed: 'left',
  render(text) {
    return {
      props: {
        style: { background: parseInt(text) > 20 ? "red" : "green" }
      },
      children: <div style={{color:"white"}}>{text}</div>
    };
  }

}]
      
        if (data.length !==0){
          let i =0
         
          Object.entries(data[0]).forEach(([key, value])=>{
           
            
            if(key !=='StationID' && key !=='StationName'&& key !=='StationAddress'&& key !=='TotalRain'){
              var a= key.split('T')[0]
              var date =key.split('T')[1] +"\n"+ a.substring(8,10)+"/"+ a.substring(5,7)
              
              i===Object.keys(data[0]).length-1?
              columns.push({
                title: date,
                dataIndex: key,
               
               
              }):
              columns.push({
                title: date,
                dataIndex: key,
                width:70
              })
            }
            i++
         })
         
        }
        
             
        return columns
      } 
    render(){ 

    var columns= this.createCol(this.props.dataTables)
    
	return (
        <Table
        style={{ whiteSpace: 'pre'}}
        columns={columns}
        dataSource={this.props.dataTables}
        bordered
        // size="middle"
        pagination={false}
        // scroll={{ x: 'max-content' }}
        scroll={{ x: '2000', y: 450 }}
      />
    )
}}

// export default WithLoading(DetailTable);
