/* eslint-disable no-unused-expressions */
import './temp.scss';
import { weather } from '../../../constants/constants.js';
import weathIcons from '../../../configs/weather-images.js';
import weatherConfig from '../weather-config.js';


class Temp {
  constructor(container, data, weatherImgs, lang) {
    this.container = container;
    this.data = data;
    this.weatherImgs = weatherImgs;
    this.lang = lang;
    this.date = new Date();
    this.currentConfig = weatherConfig.weatherDescription[this.lang];

    this.sunriseArr = this.data[0].sunrise.split(':');
    this.sunsetArr = this.data[0].sunset.split(':');
    this.currentTime = [`${this.date.getUTCHours()}`, `${this.date.getUTCMinutes()}`];
    this.imgLink = null;

    this.temp = document.createElement('div');
    this.temp.classList.add(`${weather}__temp`);

    this.tempValue = document.createElement('h2');
    this.tempValue.classList.add(`${weather}__temp-value`);
    this.tempValue.innerHTML = `${Math.floor(this.data[0].temp)}&deg;`;

    this.otherInfoWrap = document.createElement('div');
    this.otherInfoWrap.classList.add(`${weather}__other-info`);

    this.weatherDescription = document.createElement('div');
    this.weatherDescription.classList.add(`${weather}__descr`);

    this.weatherState = document.createElement('h4');
    this.weatherState.classList.add(`${weather}__weather-state`);
    this.weatherState.innerHTML = `${this.currentConfig.weather[this.data[0].weather.code]}`;

    this.weatherWind = document.createElement('h4');
    this.weatherWind.classList.add(`${weather}__wind`);
    this.weatherWind.innerHTML = `${this.currentConfig.wind}: ${this.data[0].wind_spd.toFixed(1)} ${this.currentConfig.metric}`;

    this.windDirection = document.createElement('h4');
    this.windDirection.classList.add(`${weather}__wind-dirct`);
    this.windDirection.innerHTML = `${this.currentConfig.feel}: ${Math.round(this.data[0].app_temp)}&deg;`;

    this.weatherHunidity = document.createElement('h4');
    this.weatherHunidity.classList.add(`${weather}__humidity`);
    this.weatherHunidity.innerHTML = `${this.currentConfig.humidity}: ${this.data[0].rh}%`;

    this.weatherImgWrap = document.createElement('div');
    this.weatherImgWrap.classList.add(`${weather}__img-wrap`);

    this.infoImg = document.createElement('div');
    this.infoImg.classList.add(`${weather}__info-ing`);


    this.weatherDescription.append(
      this.weatherState,
      this.weatherWind,
      this.windDirection,
      this.weatherHunidity,
    );

    this.temp.append(this.weatherImgWrap, this.tempValue, this.weatherDescription);

    this.container.append(this.temp);
  }

  getWeatherIconLink() {
    this.sunsetArr[0] === '00' ? this.sunsetArr[0] = '24' : this.sunsetArr[0];
    if (+this.currentTime[0] > +this.sunriseArr[0] && +this.currentTime[0] < +this.sunsetArr[0]) {
      this.imgLink = this.weatherImgs[weathIcons[this.data[0].weather.code].iconDaySrc].default;
    } else {
      this.imgLink = this.weatherImgs[weathIcons[this.data[0].weather.code].iconNightSrc].default;
    }
    this.weatherImgWrap.style.backgroundImage = `url(${this.imgLink})`;
  }

  toCelsius() {
    this.tempValue.innerHTML = `${Math.floor(this.data[0].temp)}&deg;`;
    this.windDirection.innerHTML = `${this.currentConfig.feel}: ${Math.round(this.data[0].app_temp)}&deg;`;
  }

  toFarenheit() {
    const value = Math.floor((1.8 * this.data[0].temp) + 32);
    this.tempValue.innerHTML = `${value}F`;
    const valueFeelApp = Math.floor((1.8 * this.data[0].app_temp)) + 32;
    this.windDirection.innerHTML = `${this.currentConfig.feel}: ${valueFeelApp}F`;
  }

  initTemp() {
    this.getWeatherIconLink();
  }

  changeLangauge(lang) {
    this.currentConfig = weatherConfig.weatherDescription[lang];
    this.weatherHunidity.innerHTML = `${this.currentConfig.humidity}: ${this.data[0].rh}%`;
    this.windDirection.innerHTML = `${this.currentConfig.feel}: ${Math.round(this.data[0].app_temp)}`;
    this.weatherWind.innerHTML = `${this.currentConfig.wind}: ${this.data[0].wind_spd.toFixed(1)} ${this.currentConfig.metric}`;
    this.weatherState.innerHTML = `${this.currentConfig.weather[this.data[0].weather.code]}`;
  }
}

export default Temp;
