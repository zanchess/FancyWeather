import './search.scss';
import { control, search, error } from '../../../constants/constants.js';
import controlConfig from '../control-config.js';


class Search {
  constructor(container, lang) {
    this.container = container;
    this.lang = lang;

    this.searchWrap = document.createElement('form');
    this.searchWrap.classList.add(`${control}__${search}`);

    this.searchInput = document.createElement('input');
    this.searchInput.classList.add(`${search}__input`);
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', `${controlConfig[this.lang].searchCity}`);

    this.searchBtn = document.createElement('input');
    this.searchBtn.setAttribute('type', 'submit');
    this.searchBtn.setAttribute('value', `${controlConfig[this.lang].search}`);
    this.searchBtn.classList.add(`${search}__search-btn`);

    this.speechBtn = document.createElement('div');
    this.speechBtn.className = `${search}__speech-btn fas fa-microphone start`;
    /* this.speechBtn.style.backgroundImage = `url(${speechIcon})`; */

    this.searchWrap.append(this.searchInput, this.speechBtn, this.searchBtn);

    this.container.append(this.searchWrap);
  }

  changeLanguage(lang) {
    this.lang = lang;
    this.searchInput.setAttribute('placeholder', `${controlConfig[this.lang].searchCity}`);
    this.searchBtn.setAttribute('value', `${controlConfig[this.lang].search}`);
  }

  clearInput() {
    this.searchInput.value = '';
  }

  getRequestCityWord() {
    return this.searchInput.value;
  }

  showErrorInput() {
    this.searchInput.classList.toggle(`${error}`);
    this.searchInput.placeholder = `${controlConfig[this.lang].error}`;
  }

  hideErrorInput() {
    this.searchInput.classList.toggle(`${error}`);
    this.searchInput.placeholder = `${controlConfig[this.lang].searchCity}`;
  }
}

export default Search;
