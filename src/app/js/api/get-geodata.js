const getGeoData = (city, lang) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=68ca70048c0c4f7fab404ab9aa731ef8&pretty=1&no_annotations=1&language=${lang}`;

  const resolve = fetch(url)
    .then((res) => res.json());
  return resolve;
};

export default getGeoData;
