import './buttons.scss';
import {
  control, RU, ENG, BE, controlBtns, celsius, farenheit,
} from '../../../constants/constants.js';
import chageImageBgrd from '../../../../assets/img/update-button.svg';
import spinnerBtn from '../../../../assets/img/sync-outline.svg';

class Buttons {
  constructor(container) {
    this.container = container;

    this.buttonsWrap = document.createElement('div');
    this.buttonsWrap.classList.add(`${control}__btns`);

    this.btnChangeBackgr = document.createElement('div');
    this.btnChangeBackgr.classList.add(`${controlBtns}__change-img`);
    this.btnChangeBackgr.style.backgroundImage = `url(${chageImageBgrd})`;

    this.btnChangeSpinner = document.createElement('div');
    this.btnChangeSpinner.classList.add(`${controlBtns}__spinner`);
    this.btnChangeSpinner.style.backgroundImage = `url(${spinnerBtn})`;


    this.selectLang = document.createElement('select');
    this.selectLang.classList.add(`${controlBtns}__change-lang`);

    this.RU = document.createElement('option');
    this.RU.setAttribute('value', RU);
    this.RU.setAttribute('selected', 'selected');
    this.RU.innerHTML = `${RU.toUpperCase()}`;

    this.ENG = document.createElement('option');
    this.ENG.setAttribute('value', ENG);
    this.ENG.innerHTML = `${ENG.toUpperCase()}`;

    this.BE = document.createElement('option');
    this.BE.setAttribute('value', BE);
    this.BE.innerHTML = `${BE.toUpperCase()}`;

    this.degreeWrap = document.createElement('div');
    this.degreeWrap.classList.add(`${controlBtns}__degrees`);

    this.degreeC = document.createElement('div');
    this.degreeC.innerHTML = `${celsius}`;
    this.degreeC.classList.add(`${controlBtns}__C`);

    this.degreeF = document.createElement('div');
    this.degreeF.innerHTML = `${farenheit}`;
    this.degreeF.classList.add(`${controlBtns}__F`);

    this.changeTheme = document.createElement('div');
    this.changeTheme.className = `${controlBtns}__themes fas fa-tshirt`;

    this.degreeWrap.append(this.degreeC, this.degreeF);
    this.btnChangeBackgr.append(this.btnChangeSpinner);

    this.selectLang.append(this.RU, this.ENG, this.BE);
    this.buttonsWrap.append(
      this.btnChangeBackgr,
      this.selectLang,
      this.degreeWrap,
      this.changeTheme,
    );

    this.container.append(this.buttonsWrap);
  }
}

export default Buttons;
