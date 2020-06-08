import '../css/style.scss';
import App from './components/App/App.js';


window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  const app = new App(root);
  app.initStartPage();
});
