import './location.scss';
import { location, BE, RU } from '../../constants/constants.js';
import locationConfig from './location-config.js';


const mapboxgl = require('mapbox-gl');
const MapboxLanguage = require('@mapbox/mapbox-gl-language');

class Location {
  constructor(container, data, lang) {
    this.container = container;
    this.data = data;
    this.lang = lang;
    this.currentConfig = locationConfig[this.lang];

    this.locationInfo = document.createElement('div');
    this.locationInfo.classList.add(`${location}__info`);
    this.locationInfo.innerHTML = `<p>${this.currentConfig.lat}: ${Math.floor(this.data.lat)}&deg;${Math.floor((this.data.lat - Math.floor(this.data.lat)) * 60)}' 
                                    <br> ${this.currentConfig.long}: ${Math.floor(this.data.lng)}&deg;${Math.floor((this.data.lng - Math.floor(this.data.lng)) * 60)}'</p>`;


    this.mapContainer = document.createElement('div');
    this.mapContainer.className = `${location} triangle`;

    this.container.append(this.mapContainer, this.locationInfo);

    mapboxgl.accessToken = 'pk.eyJ1IjoiemFuY2hlc3MiLCJhIjoiY2thZmFxeXkzMjhjYzJ5cDQ0c21vaXNyOSJ9.B_mXKJHdZxxrb_qZzt3guQ';

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [this.data.lng, this.data.lat],
      minZoom: 2,
      zoom: 10,
    });
    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
    }
    this.map.addControl(new MapboxLanguage({
      defaultLanguage: this.lang !== BE ? lang : RU,
    }));

    this.marker = new mapboxgl.Marker()
      .setLngLat([this.data.lng, this.data.lat])
      .addTo(this.map);
  }

  changeLanguage(lang) {
    this.currentConfig = locationConfig[lang];
    this.locationInfo.innerHTML = `<p>${this.currentConfig.lat}: ${Math.floor(this.data.lat)}&deg;${Math.floor((this.data.lat - Math.floor(this.data.lat)) * 60)}' 
                                    <br> ${this.currentConfig.long}: ${Math.floor(this.data.lng)}&deg;${Math.floor((this.data.lng - Math.floor(this.data.lng)) * 60)}'</p>`;
  }
}

export default Location;
