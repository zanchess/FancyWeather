const getTranslate = (word, lang, needLang) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200430T080402Z.5b15ff67f24a2a24.0c8d5521a8d5964c0575299d08c396a6e2fa3e80&text=${word}&lang=${lang}-${needLang}`;

  const result = fetch(url)
    .then((res) => res.json());
  return result;
};

export default getTranslate;
