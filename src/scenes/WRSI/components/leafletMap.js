import * as L from 'leaflet';
import React from "react";
import { connect } from "react-redux";
// import select from "../../util/select";
import "./styles.css";
// import moment from "moment";

// import "leaflet-geotiff";
import "leaflet-geotiff-2";
import "leaflet-geotiff-2/dist/leaflet-geotiff-rgb";
import "leaflet-geotiff-2/dist/leaflet-geotiff-plotty";
// import ROUTER from '../../constants/router';
import GeoTIFF from "geotiff";

import "leaflet/dist/leaflet.css";
var plotty = require("plotty");
var esri = require("esri-leaflet");




class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  clickEvent=(tiffLayer)=>(e)=>{
    var tiffValue="null"

    tiffValue = tiffLayer.getValueAtLatLng(+e.latlng.lat, +e.latlng.lng);
    tiffValue = tiffValue === undefined || tiffValue === null ? "null" : tiffValue.toFixed(1);
    if(tiffValue !==undefined&& tiffValue!=="-999.0"){
      let content1 = tiffValue === "null" ? "" : "SPI: " + tiffValue; 
      L.popup()
        .setLatLng(e.latlng)
        .setContent(content1)
        .openOn(this.map);
    }

  }
  radarLayerGroup = L.featureGroup();
  radarTiff 
  zoomend = false
 
  
  truongsa = L.divIcon({className:'mytextlabel',html:'Trường Sa'})
  hoangsa = L.divIcon({className:'mytextlabel',html:'Hoàng Sa'})
  bachlongvi = L.divIcon({className:'mytextlabel',html:'Bạch Long Vĩ'})

  tiffLayerGroup = L.featureGroup();
  async componentDidMount() {
     
    // tao bang mau radar
    plotty.addColorScale(
      "radar",
      ["#9900cc",
      "#ff1c01",
      "#fe8113",
      "#ffd800",
      "#06e032",
      "#0745f9",
        "rgba(104,211,250,0.2)",
      ],
      [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1.0]
    );
    //load base map

    var baseLayer = esri.basemapLayer("Topographic");

    this.map = L.map("map", {
      layers: [baseLayer],
      maxZoom: 13,
      minZoom: 6,
    }).setView([17.529, 106.25], 5);
    // esri.basemapLayer("ImageryLabels").addTo(this.map);

    //add truong sa hoang sa

    this.textlayer = L.layerGroup().addTo(this.map);
    this.truongsa = L.marker([10.727548, 115.819366], {
      icon: this.truongsa,
    }).addTo(this.textlayer);
    this.hoangsa = L.marker([16.354251, 111.898246], {
      icon: this.hoangsa,
    }).addTo(this.textlayer);

    //add legend mau

    var Templegend = L.control({
      position: "bottomleft",
    });
    Templegend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "radarLegend");
      const options = {
        displayMin: 0,
        displayMax: 1,
        applyDisplayRange: true,
        clampLow: true,
        clampHigh: true,
        colorScale: "radar",
      };
      var a = L.LeafletGeotiff.plotty(options)
      // let colorScale = firstR.layer.options.renderer.colorScaleData;
      let colorScale = a.colorScaleData


      div.innerHTML +=
        '<p style ="color: black" font-weight:600 > <-2 <img id="colorScaleImage" src="' +
        colorScale +
        '" style="vertical-align: middle; height:18px; width:200px;"/> >2</p>';
      return div;
    };
    Templegend.addTo(this.map);
    this.tiffLayerGroup.addTo(this.map);
    
    this.addLayer2Map(this.props.fileTiff)
   
  }

  componentDidUpdate(){
    this.addLayer2Map(this.props.fileTiff)
  }
  convertSCWB2Text(thi){
    return thi===-999.0? 'null': thi>2? 'Cực kỳ ẩm ướt':thi >1.49?'Rất ẩm ướt'  :thi>0.99?'ẩm ướt vừa phải':thi>-0.99?'Bình thường':thi>-1.49?'Khô vừa phải':thi>-1.99?'rất khô':'cực kỳ khô'
  }
  //addLayer2Map
  clickEvent = (radarLayer) => (e) => {
    var radar = "null";
    if (radarLayer !== null) {
      radar = radarLayer.getValueAtLatLng(+e.latlng.lat, +e.latlng.lng);
      radar = radar === undefined || radar === null ? "null" : radar.toFixed(1) +" "+this.convertSCWB2Text(radar.toFixed(1)) ;
    
    }

   
    if (radar !== undefined ) {
      let content1 = radar === "null" ? "" : "scwb: " + radar;
      L.popup()
        .setLatLng(e.latlng)
        .setContent(content1)
        .openOn(this.map);
    }
  };
  addLayer2Map(tiffLayer){
    debugger
    this.tiffLayerGroup.clearLayers();
    if(tiffLayer!==''){
      var plottyRenderer = L.LeafletGeotiff.plotty({
        displayMin: -2,
        displayMax:2,
        clampLow: false,
        clampHigh: true,
        colorScale: "radar",
        noDataValue: -999,
        clearBeforeMove: false,
        applyDisplayRange: false,
  
        
      });
      const windSpeedLayer = L.leafletGeotiff(tiffLayer , {
        renderer: plottyRenderer,
        opacity:0.5,
        blockSize: 65536,
              sourceFunction: GeoTIFF.fromUrl,
      }).addTo(this.tiffLayerGroup)

      this.map.closePopup();
      this.map.off("click");
      this.map.on(
        "click",
        this.clickEvent(windSpeedLayer)
      );
    }
  }

  render() {
    
    return (
      <div>
        <div id="map"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
