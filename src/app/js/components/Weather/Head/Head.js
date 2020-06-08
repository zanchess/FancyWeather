/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
import './head.scss';
import { weather, RU, BE } from '../../../constants/constants.js';
import getTranslate from '../../../api/get-translate.js';
import weatherConfig from '../weather-config.js';


class Head {
  constructor(container, data, placeName, lang) {
    this.container = container;
    this.data = data;
    this.placeName = placeName;
    this.lang = lang;

    this.head = document.createElement('div');
    this.head.classList.add(`${weather}__head`);

    this.location = document.createElement('h2');
    this.location.classList.add(`${weather}__location`);
    this.location.innerHTML = null;

    this.time = document.createElement('h2');
    this.time.classList.add(`${weather}__time`);

    this.head.append(this.location, this.time);
    this.container.append(this.head);
  }

  digitalWatch() {
    const options = {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: `${this.data[0].timezone}`,
      hour12: false,
    };

    const date = new Date();
    if (this.lang === BE) {
      const day = weatherConfig.shortDays.be[date.toLocaleString('ru', { weekday: 'short' })];
      const month = weatherConfig.months.be[date.toLocaleString('ru', { month: 'long' })];
      const time = date.toLocaleString('ru', {
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: `${this.data[0].timezone}`,
      });
      const numericDay = date.toLocaleString('ru', { day: 'numeric' });
      this.time.innerHTML = `${day}, ${numericDay}, ${month}, ${time}`;
    } else {
      const dateString = date.toLocaleString(this.lang, options);
      this.time.innerHTML = `${dateString}`;
    }
  }

  setCityName() {
    getTranslate(this.placeName, RU, this.lang)
      .then((res) => {
        this.placeName = res.text[0];
        this.location.innerHTML = this.placeName;
      });
  }

  changeLanguage(lang) {
    getTranslate(this.placeName, this.lang, lang)
      .then((res) => {
        this.placeName = res.text[0];
        this.location.innerHTML = this.placeName;
      });
    this.lang = lang;
    const options = {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: `${this.data[0].timezone}`,
      hour12: false,
    };

    const date = new Date();
    if (lang === BE) {
      const day = weatherConfig.shortDays.be[date.toLocaleString('ru', { weekday: 'short' })];
      const month = weatherConfig.months.be[date.toLocaleString('ru', { month: 'long' })];
      const time = date.toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: `${this.data[0].timezone}`,
        hour12: false,
      });
      const numericDay = date.toLocaleString('ru', { day: 'numeric' });
      this.time.innerHTML = `${day}, ${numericDay}, ${month}, ${time}`;
    } else {
      const dateString = date.toLocaleString(this.lang, options);
      this.time.innerHTML = dateString;
    }
  }
}

export default Head;
