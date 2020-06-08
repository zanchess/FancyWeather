import './forecast.scss';
import { forecast, BE } from '../../../constants/constants.js';
import weatherImgs from '../../../configs/weather-images.js';
import weatherConfig from '../weather-config.js';


class Forecast {
  constructor(container, data, weatherImages, lang) {
    this.container = container;
    this.data = data;
    this.lang = lang;
    this.currentConfig = weatherConfig.weatherDescription[this.lang];

    this.weatherImages = weatherImages;
    this.imageLink = this.weatherImages[weatherImgs[this.data.weather.code].iconDaySrc].default;

    this.date = data.datetime.split('-').join(',');
    this.currentDay = new Date(`${this.date}`).toLocaleString(`${this.lang}`, { weekday: 'long' });

    this.forecastItem = document.createElement('div');
    this.forecastItem.classList.add(`${forecast}__item`);

    this.forecast = document.createElement('div');
    this.forecast.classList.add(`${forecast}`);

    this.forecastDay = document.createElement('h2');
    this.forecastDay.classList.add(`${forecast}__day`);
    this.forecastDay.innerHTML = this.lang === BE ? weatherConfig.days.be[this.currentDay] : this.currentDay;

    this.forecastImg = document.createElement('div');
    this.forecastImg.classList.add(`${forecast}__img`);
    this.forecastImg.style.backgroundImage = `url(${this.imageLink})`;

    this.forecastTemp = document.createElement('h2');
    this.forecastTemp.classList.add(`${forecast}__temp`);
    this.forecastTemp.innerHTML = `${Math.floor(this.data.temp)}&deg;`;


    this.forecastItem.append(this.forecastTemp, this.forecastImg);
    this.forecast.append(this.forecastDay, this.forecastItem);
    this.container.append(this.forecast);
  }

  changeLanguage(lang) {
    this.lang = lang;
    this.currentDay = new Date(`${this.date}`).toLocaleString(`${this.lang}`, { weekday: 'long' });
    this.forecastDay.innerHTML = this.lang === BE
      ? weatherConfig.days.be[this.currentDay]
      : this.currentDay;
  }

  toCelsius() {
    this.forecastTemp.innerHTML = `${Math.round(this.data.temp)}&deg;`;
  }

  toFarenheit() {
    const value = Math.round((1.8 * this.data.temp) + 32);
    this.forecastTemp.innerHTML = `${value}F`;
  }
}

export default Forecast;
