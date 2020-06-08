const weatherForDays = (country, city, lang, units) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=4&units=${units}&lang=${lang}&key=1056c88b921446f99b71b281b40709a3`;

  const resolve = fetch(url)
    .then((res) => res.json());
  return resolve;
};

export default weatherForDays;
