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
    if(tiffValue !==undefined ){
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
  onAddLayer =(tiffLayer)=>{
    if (this.zoomend === false) {
      tiffLayer.layer.off('load')
      if (this.radarTiff!==undefined && this.radarTiff.filename !==tiffLayer.filename) {
        this.radarLayerGroup.removeLayer(this.radarTiff.layer)
        this.radarTiff = tiffLayer
      }
      let isRNull = tiffLayer.layer ? false : true;
    }
    else {
      this.zoomend = false
    }
  }

  addLayer2Map(tiffLayer){
    this.radarLayerGroup.clearLayers();
    if (tiffLayer.layer) {
      tiffLayer.layer.addTo(this.radarLayerGroup);
      tiffLayer.layer.setZIndex(0);
      tiffLayer.layer.on("load", () => this.onAddLayer(tiffLayer))
    }
  }

  //dataUrl ='https://raster.weathervietnam.vn/'
  radarFolder = '/tiffile/final.tif';

  
  truongsa = L.divIcon({className:'mytextlabel',html:'Trường Sa'})
  hoangsa = L.divIcon({className:'mytextlabel',html:'Hoàng Sa'})
  bachlongvi = L.divIcon({className:'mytextlabel',html:'Bạch Long Vĩ'})

  async componentDidMount() {
    // tao bang mau radar
    plotty.addColorScale(
      "radar",
      [
        "rgba(104,211,250,0.2)",
        "#0745f9",
        "#06e032",
        "#ffd800",
        "#fe8113",
        "#ff1c01",
        "#9900cc",
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
        '<p style ="color: wheat" font-weight:600 > 0mm <img id="colorScaleImage" src="' +
        colorScale +
        '" style="vertical-align: middle; height:18px; width:200px;"/> >50mm</p>';
      return div;
    };
    Templegend.addTo(this.map);
   
  
    var plottyRenderer = L.LeafletGeotiff.plotty({
      displayMin: -2,
      displayMax:2,
      clampLow: false,
      clampHigh: true,
      colorScale: "radar",
      noDataValue: -999,
      clearBeforeMove: false,
      applyDisplayRange: false,
      blockSize: 65536,
      
    });
    const windSpeedLayer = L.leafletGeotiff( this.radarFolder , {
      renderer: plottyRenderer,
      opacity:0.5
    }).addTo(this.map);


  }

  render() {
    const { isPlay, currentFile } = this.state;
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
