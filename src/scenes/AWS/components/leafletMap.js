import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import "./styles.css";

import "../../../assets/css/leaflet.extra-markers.min.css";
import map from "../map";
// import {getCurrentDate,getPreviousTime} from '../../../util/getCurrentDateTime'
const moment = require("moment");
// var bounce = require('leaflet.smooth_marker_bouncing')
var esri = require("esri-leaflet");
var exmarker = require("leaflet-extra-markers");
class Map extends React.Component {
  truongsa = L.divIcon({ className: "textlabel", html: "Trường Sa" });
  hoangsa = L.divIcon({ className: "textlabel", html: "Hoàng Sa" });
  bachlongvi = L.divIcon({ className: "textlabel", html: "Bạch Long Vĩ" });

  // addHours = (current,h)=> {
  //   current.setTime(current+ (h*60*60*1000));
  //   return current;
  // }
  // convertDate2String =(date)=>{
  //   //2021-04-04T08:52:00
  //   return  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // }
  getColor = (d) => {
  
  
      return d
      >1000?
      "#001529"
      :d>= 100
      ? "#FB0303"
      : d > 50
      ? "#600178"
      : d > 16
      ? "#136B04"
      : d > 0
      ? "#0767D8"
      : d >-0.001
      ? "#9DC183"
      : "#BEBEBE";
    
   
  };
  // getColorWater= d=>{
  //   return d>0? "":d
  // }
  convertNumber2String =(value)=>{
     return  value >1000 ?Math.floor(value):parseFloat(value).toFixed(1)   
  }
  customMarker = (value, shape) =>
    L.ExtraMarkers.icon({
      icon: "fa fa-bold fa-number",
      markerColor:this.getColor(value),
      shape: shape,
      prefix: "",
      iconColor: "#fff",
      extraClasses: "",
      number: value === -100 ? "" : value,
      svg: true,
    });

  componentDidMount() {
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      var div = L.DomUtil.create("div", "info templegend");
      const grades = [0, 16, 50, 100];
      let labels = [];
      let from;
      let to;
      labels.push('<i class="color" style="background:#BEBEBE"></i>Null');
      labels.push('<i class="color" style="background:#9DC183"></i>0 mm');
      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
          '<i class="color" style="background:' +
            this.getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+") +
            "mm"
        );
      }

      div.innerHTML = labels.join("<br>");

      return div;
    };

    var southWest = L.latLng(6.7123, 115.203),
      northEast = L.latLng(23.381068, 99.517153),
      bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map("map", {
      attributionControl: false,
      maxBounds: bounds,
      maxZoom: 12,
      minZoom: 3,
    }).setView([14.26, 108.39], 9);
    esri.basemapLayer("Topographic").addTo(this.map);
    // this.layer = L.layerGroup().addTo(this.map);

    this.textlayer = L.layerGroup().addTo(this.map);
    this.legenLayer = L.layerGroup().addTo(this.map);
    this.truongsa = L.marker([10.727548, 115.819366], {
      icon: this.truongsa,
    }).addTo(this.textlayer);
    this.hoangsa = L.marker([16.354251, 111.898246], {
      icon: this.hoangsa,
    }).addTo(this.textlayer);

    legend.addTo(this.map);
  }


  myevent = (markerid) => (event) => {
    var current = moment().format("YYYY-MM-DDTHH:mm:ss");
    // var DateTimeFrom =  moment().add(-24, 'h').format('YYYY-MM-DDTHH:mm:ss')

    this.props.get10mStationDatas({
      StationIDs: markerid,
      DateTimeFrom: moment().add(-24, "h").format("YYYY-MM-DDTHH:mm:ss"),
      DateTimeTo: current,
    });
    this.props.get1hStationDatas({
      StationIDs: markerid,
      DateTimeFrom: moment().add(-72, "h").format("YYYY-MM-DDTHH:mm:ss"),
      DateTimeTo: current,
    });
             
    this.props.clickWaterLevel(false)
  };

  mywaterevent = (markerid) => (event) => {
    var current = moment().format("YYYY-MM-DDTHH:mm:ss");
    // var DateTimeFrom =  moment().add(-24, 'h').format('YYYY-MM-DDTHH:mm:ss')

    this.props.get10mStationWaters({
      StationIDs: markerid,
      DateTimeFrom: moment().add(-24, "h").format("YYYY-MM-DDTHH:mm:ss"),
      DateTimeTo: current,
    });
    this.props.get1hStationWaters({
      StationIDs: markerid,
      DateTimeFrom: moment().add(-72, "h").format("YYYY-MM-DDTHH:mm:ss"),
      DateTimeTo: current,
    });
    this.props.clickWaterLevel(true)
  };


  lstlayerGroup = {};
  layerControl = "";

  updateMarkers(markersData, stationGroup) {
    //remove all layer and control
    for (var key in this.lstlayerGroup) {
      this.map.removeLayer(this.lstlayerGroup[key]);
    }
    this.lstlayerGroup = {};
    // if(this.layercontrol){
    //   this.map.removeControl(this.layerControl)
    // }
    if (this.layerControl !== "") {
      this.map.removeControl(this.layerControl);
    }

    //create layergroup
    
    stationGroup.forEach((group) => {
      var IconlayerGroup = L.layerGroup().addTo(this.map);
      this.lstlayerGroup[group.Name] = IconlayerGroup;
      markersData.forEach((marker) => {
        if (marker.StationGroupCode == group.Code) {
          if (marker.DefaultType === "rain") {
            let shape = "circle";
            let mymarker = L.marker([marker.Lat, marker.Lon], {
              icon:
                marker.TotalRain === undefined
                  ? this.customMarker(-100, shape)
                  : this.customMarker(this.convertNumber2String(marker.TotalRain), shape),
            }).addTo(IconlayerGroup);
            mymarker.bindPopup(
              "<table><tr><td>Mã trạm: </td><td>" +
                marker.StationID +
                "</td></tr><tr><td>Tên: </td><td>" +
                marker.StationName +
                "</td></tr><tr><td>Lat: </td><td>" +
                marker.Lat.toFixed(2) +
                "</td></tr><tr><td>Lon: </td><td>" +
                marker.Lon.toFixed(2) +
                "</td></tr></table>"
            );
            mymarker.on("mouseover", function (e) {
              this.openPopup();
            });
            mymarker.on("mouseout", function (e) {
              this.closePopup();
            });
            mymarker.on("click", this.myevent(marker.StationID));
          }
          if (marker.DefaultType === "waterlevel") {
            let shape = "square";

            let mymarker = L.marker([marker.Lat, marker.Lon], {
              icon:
                marker.AvgWaterlevel === undefined
                  ? this.customMarker(-100, shape)
                  : this.customMarker(this.convertNumber2String(marker.AvgWaterlevel), shape),
            }).addTo(IconlayerGroup);
            mymarker.bindPopup(
              "<table><tr><td>Mã trạm: </td><td>" +
                marker.StationID +
                "</td></tr><tr><td>Tên: </td><td>" +
                marker.StationName +
                "</td></tr><tr><td>Lat: </td><td>" +
                marker.Lat.toFixed(2) +
                "</td></tr><tr><td>Lon: </td><td>" +
                marker.Lon.toFixed(2) +
                "</td></tr></table>"
            );
            mymarker.on("mouseover", function (e) {
              this.openPopup();
            });
            mymarker.on("mouseout", function (e) {
              this.closePopup();
            });
            mymarker.on("click", this.mywaterevent(marker.StationID));
          }
        }
      });
      // this.layerControl.addOverlay(IconlayerGroup,group.Name
    });
    this.layerControl = L.control
      .layers(null, this.lstlayerGroup, { collapsed: false })
      .addTo(this.map);
  }

  componentDidUpdate({ dataTables, waterDataTables }) {
    // console.log(this.props.stations,this.props.stationGroup,this.props.dataTables)
    if (
      this.props.dataTables !== dataTables ||
      this.props.waterDataTables !== waterDataTables
    ) {
      let mergeRainList = this.props.stations.map((t1) => ({
        ...t1,
        ...this.props.dataTables.find((t2) => t2.StationID === t1.StationID),
      }));
      let mergeWaterList = this.props.waterstations.map((t1) => ({
        ...t1,
        ...this.props.waterDataTables.find(
          (t2) => t2.StationID === t1.StationID
        ),
      }));
      let mergeList = [...mergeRainList, ...mergeWaterList];
      this.updateMarkers(mergeList, this.props.stationGroup);
    }

    // if (this.props.waterDataTables !==waterDataTables ) {
    //   let mergeList= this.props.waterstations.map(t1 => ({...t1, ...this.props.waterDataTables.find(t2 => t2.StationID === t1.StationID)}))
    //   console.log(mergeList)
    //   this.updateMarkers(mergeList,this.props.stationGroup)
    // }
  }

  render() {
    return (
      <div>
        {/* <Helmet>
              <script src="./dist/leaflet.awesome-markers.min.js" type="text/javascript" />
            </Helmet> */}
        <div id="map"></div>
      </div>
    );
  }
}
export default Map;
