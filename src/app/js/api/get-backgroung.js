const getBackgroundImg = (day) => {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${day}&client_id=EDpe958LQCAuZnoLwtLbc1J6Du4E91DtZt4dKMMQLBE`;

  const resolve = fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch(() => console.log('backgroung dont get'));
  return resolve;
};

export default getBackgroundImg;
