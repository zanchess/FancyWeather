import './weather.scss';
import { weather, celsius, farenheit } from '../../constants/constants.js';
import Head from './Head/Head.js';
import Temp from './Temp/Temp.js';
import weatherForDays from '../../api/get-weather.js';
import Forecast from './Forecast/Forecast.js';
import importAll from '../../constants/functions.js';


class Weather {
  constructor(container, data, country, city, units, placeName, lang, currentDeg) {
    this.container = container;
    this.data = data;
    this.country = country;
    this.city = city;
    this.units = units;
    this.lang = lang;
    this.currentDeg = currentDeg;
    this.weatherImages = importAll(require.context('./../../../assets/img/weather-icon', false, /\.(png|jpe?g|svg)$/));

    this.weather = document.createElement('div');
    this.weather.classList.add(`${weather}`);

    this.forecastsWrap = document.createElement('div');
    this.forecastsWrap.classList.add(`${weather}__forecast-wrap`);

    this.head = new Head(this.weather, this.data, placeName, this.lang);
    this.temp = new Temp(this.weather, this.data, this.weatherImages, this.lang);
    this.forecasts = [];

    this.weather.append(this.forecastsWrap);
    this.container.append(this.weather);
  }

  setWatch() {
    this.head.digitalWatch();
    setInterval(() => {
      this.head.digitalWatch();
    }, 1000);
    this.head.setCityName();
  }

  setForecast() {
    weatherForDays(this.country, this.city, this.lang, celsius)
      .then((res) => {
        res.data.forEach((data, i) => {
          if (i > 0) {
            this.forecasts.push(
              new Forecast(this.forecastsWrap, data, this.weatherImages, this.lang),
            );
            if (this.currentDeg === farenheit) {
              this.forecasts.forEach((elem) => elem.toFarenheit());
            }
          }
        });
      });
  }

  initWeather() {
    this.setWatch();
    this.setForecast();
    this.temp.initTemp();
  }
}

export default Weather;
