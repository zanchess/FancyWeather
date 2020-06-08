import getEngTranslate from '../src/app/js/api/get-translate.js';
import weatherForDays from '../src/app/js/api/get-weather.js';
import getGeoData from '../src/app/js/api/get-geodata.js';


beforeEach(() => {
  fetch.resetMocks();
});


test('returns result if non-empty object in getEngTranslate', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return getEngTranslate('футбол', 'ru', 'en')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({});
    });
});

test('returns result if non-empty object in weather for Days', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return weatherForDays('BY', 'Minsk', 'ru', 'C')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({});
    });
});

test('returns result if non-empty object in get geodata', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return getGeoData('Minsk', 'ru')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({});
    });
});
