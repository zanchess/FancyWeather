/* eslint-disable no-console */
import Location from '../Location/Location.js';
import Control from '../Control/Control.js';
import Weather from '../Weather/Weater.js';
import getCurrentGeoData from '../../api/get-current-geodata.js';
import getBackgroundImg from '../../api/get-backgroung.js';
import './app.scss';
import backgroung from '../../../assets/img/biel-morro-J_F_003jcEQ-unsplash.jpg';
import {
  RU, content, celsius, ENG, farenheit, BE, active, degrees, empty,
} from '../../constants/constants.js';
import getCurrentWeather from '../../api/get-current-weather.js';
import getGeoData from '../../api/get-geodata.js';
import getTranslate from '../../api/get-translate.js';
import SpeechApi from '../Control/Search/speech-api.js';


class App {
  constructor(container) {
    this.container = container;
    this.locationData = null;
    this.weatherData = null;
    this.currentDegree = localStorage.getItem(`${degrees}`) === farenheit ? farenheit : celsius;
    this.currentLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : ENG;
    this.speechRecording = null;
    this.error = false;

    this.contentWrap = document.createElement('div');
    this.contentWrap.classList.add(`${content}`);

    this.weatherWrap = document.createElement('div');
    this.weatherWrap.classList.add(`${content}__weather-wrap`);

    this.locationWrap = document.createElement('div');
    this.locationWrap.classList.add(`${content}__location-wrap`);

    this.control = new Control(this.container, this.currentLang);
    this.weather = null;
    this.location = null;

    this.contentWrap.append(this.weatherWrap, this.locationWrap);
    this.container.append(this.contentWrap);
  }

  setBackgroundImg(timezone) {
    const dateForBckgrd = new Date();
    const hour = dateForBckgrd.toLocaleString(RU, { hour: 'numeric', timeZone: `${timezone}`, hour12: false });
    let partOfDay = null;
    if (hour > 20 || hour < 5) {
      partOfDay = 'night';
    } else {
      partOfDay = 'sunshine';
    }
    console.log(partOfDay);

    getBackgroundImg(`${partOfDay}`)
      .then((res) => {
        let path = null;
        try {
          path = res.urls.regular;
          this.container.style.backgroundImage = `url(${path})`;
        } catch (error) {
          path = backgroung;
          this.container.style.backgroundImage = `url(${path})`;
        }
      });
  }

  removeActiveDegreeClass() {
    const buttons = this.control.buttons.degreeWrap.querySelectorAll('div');
    buttons.forEach((elem) => {
      if (elem.classList.contains(`${active}`)) {
        elem.classList.remove(`${active}`);
      }
    });
  }

  toFarenheit() {
    this.removeActiveDegreeClass();
    this.control.buttons.degreeF.classList.add(`${active}`);
    this.weather.temp.toFarenheit();
    this.weather.forecasts.forEach((elem) => elem.toFarenheit());
    localStorage.setItem(`${degrees}`, `${farenheit}`);
  }

  toCelsius() {
    this.removeActiveDegreeClass();
    this.control.buttons.degreeC.classList.add(`${active}`);
    this.weather.temp.toCelsius();
    this.weather.forecasts.forEach((elem) => elem.toCelsius());
    localStorage.setItem(`${degrees}`, `${celsius}`);
  }

  getWeather(country, city, lang, units, placeName) {
    getCurrentWeather(country, city, lang, units)
      .then((res) => {
        this.error = false;
        this.weatherData = res;
        try {
          if (this.weatherData.data) {
            this.weatherWrap.innerHTML = '';
            this.weather = new Weather(
              this.weatherWrap,
              this.weatherData.data,
              country,
              city,
              units,
              placeName,
              this.currentLang,
              this.currentDegree,
            );
            this.weather.initWeather();
            this.setBackgroundImg(this.weatherData.data[0].timezone);
          }
        } catch (error) {
          this.control.search.showErrorInput();
          setTimeout(() => {
            this.control.search.hideErrorInput();
          }, 3000);
          this.error = true;
        }
      })
      .then(() => {
        if (this.currentDegree === farenheit) {
          this.toFarenheit();
        } else {
          this.control.buttons.degreeC.classList.add(`${active}`);
        }
      });
  }

  getCurrentGeolocation() {
    getCurrentGeoData()
      .then((res) => {
        getGeoData(res.city, this.currentLang)
          .then((res1) => {
            this.locationData = res1;
            this.location = new Location(
              this.locationWrap,
              res1.results[0].geometry,
              this.currentLang,
            );
            this.getWeather(
              res1.results[0].components.country_code.toUpperCase(),
              res1.results[0].components.state,
              RU,
              celsius,
              res1.results[0].formatted,
            );
          });
      });
  }

  changeDegree() {
    this.control.buttons.degreeWrap.addEventListener('click', (e) => {
      const targetClass = e.target.classList.value;
      if (targetClass[targetClass.length - 1] !== this.currentDegree) {
        this.currentDegree = targetClass[targetClass.length - 1];
        this.currentDegree === `${farenheit}` ? this.toFarenheit() : this.toCelsius();
      }
    });
  }

  changeBackground() {
    this.control.buttons.btnChangeBackgr.addEventListener('click', () => {
      this.setBackgroundImg(this.weatherData.data[0].timezone);
    });
  }

  changeTheme() {
    this.control.buttons.changeTheme.addEventListener('click', () => {
      this.control.control.classList.toggle('white');
      this.weather.weather.classList.toggle('white');
      this.location.locationInfo.classList.toggle('white');
      this.control.search.searchInput.classList.toggle('black');
    });
  }

  changeLanguage() {
    this.control.buttons.selectLang.addEventListener('change', () => {
      this.currentLang = this.control.buttons.selectLang.value;
      localStorage.setItem('lang', this.currentLang);
      this.weather.temp.changeLangauge(this.currentLang);
      this.weather.forecasts.forEach((elem) => elem.changeLanguage(this.currentLang));
      this.weather.head.changeLanguage(this.currentLang);
      this.location.changeLanguage(this.currentLang);
      this.control.search.changeLanguage(this.currentLang);
      this.locationWrap.innerHTML = '';
      this.location = new Location(
        this.locationWrap,
        this.locationData.results[0].geometry,
        this.currentLang,
      );
    });
  }

  rennderContent(city, lang) {
    getGeoData(city, lang)
      .then((res1) => {
        try {
          const place = res1.results[0].components.city
        || res1.results[0].components.state
        || res1.results[0].components.county
        || empty;

          if (place !== empty) {
            this.locationData = res1;

            this.getWeather(
              res1.results[0].components.country_code.toUpperCase(),
              city,
              RU,
              celsius,
              res1.results[0].formatted,
            );
          } else {
            this.control.search.showErrorInput();
            setTimeout(() => {
              this.control.search.hideErrorInput();
            }, 3000);
          }
          setTimeout(() => {
            if (this.error === false) {
              this.locationWrap.innerHTML = '';
              this.location = new Location(
                this.locationWrap,
                res1.results[0].geometry,
                this.currentLang,
              );
            }
          }, 500);
        } catch (error) {
          this.control.search.showErrorInput();
          setTimeout(() => {
            this.control.search.hideErrorInput();
          }, 3000);
        }
      });
  }

  searchCity() {
    this.control.search.searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const city = this.control.search.getRequestCityWord();
      if (city) {
        if (this.currentLang === BE) {
          getTranslate(city, BE, RU)
            .then((resolve) => {
              const translateCity = resolve.text[0];
              this.rennderContent(translateCity, RU);
            });
        } else {
          this.rennderContent(city, RU);
        }
      }
      this.control.search.clearInput();
    });
  }

  initListeningSpeech() {
    this.speechRecording = new SpeechApi(this.control.search.speechBtn);

    this.control.search.speechBtn.addEventListener('click', () => {
      if (this.control.search.speechBtn.classList.contains('start')) {
        this.speechRecording.init();
        this.control.search.speechBtn.classList.toggle('start');
        this.control.search.speechBtn.style.color = 'rgb(228, 122, 122)';

        this.speechRecording.speechApi.onresult = (event) => {
          const { resultIndex } = event;
          const { transcript } = event.results[resultIndex][0];
          this.control.search.speechBtn.classList.toggle('start');
          this.control.search.speechBtn.style.color = 'grey';
          if (this.currentLang === BE && transcript) {
            getTranslate(transcript, BE, RU)
              .then((resolve) => {
                const translateCity = resolve.text[0];
                this.rennderContent(translateCity, RU);
              });
          } else {
            this.rennderContent(transcript, RU);
          }
        };
      } else {
        this.speechRecording.stop();
        this.control.search.speechBtn.classList.toggle('start');
        this.control.search.speechBtn.style.color = 'grey';
      }
    });
  }

  setCurrentOption() {
    const options = this.control.buttons.selectLang.querySelectorAll('option');
    options.forEach((elem) => {
      const langValue = elem.getAttribute('value');
      elem.removeAttribute('selected');
      if (langValue === this.currentLang) {
        elem.setAttribute('selected', 'selected');
      }
    });
  }


  setListeners() {
    this.changeDegree();
    this.searchCity();
    this.changeLanguage();
    this.changeBackground();
    this.initListeningSpeech();
    this.changeTheme();
  }

  initStartPage() {
    this.getCurrentGeolocation();
    this.setListeners();
    this.setCurrentOption();
  }
}


export default App;
