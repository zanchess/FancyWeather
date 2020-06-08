const getCurrentGeoData = () => {
  const url = 'https://ipinfo.io/json?token=5e35581ecb715b';

  const resolve = fetch(url)
    .then((res) => res.json());
  return resolve;
};

export default getCurrentGeoData;
