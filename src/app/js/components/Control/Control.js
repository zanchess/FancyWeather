import './control.scss';
import { control } from '../../constants/constants.js';
import Buttons from './Buttons/Buttons.js';
import Search from './Search/Search.js';


class Control {
  constructor(container, lang) {
    this.container = container;

    this.control = document.createElement('header');
    this.control.classList.add(`${control}`);

    this.buttons = new Buttons(this.control, lang);
    this.search = new Search(this.control, lang);

    this.container.append(this.control);
  }
}

export default Control;
