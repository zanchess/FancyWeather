import { RU, celsius } from '../constants/constants.js';

const getCurrentWeather = (country = 'BY', city = 'Minsk', lang = RU, units = `${celsius}`) => {
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&units=${units}&lang=${lang}&key=1056c88b921446f99b71b281b40709a3`;

  const resolve = fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch(() => console.log('some error'));
  return resolve;
};

export default getCurrentWeather;
