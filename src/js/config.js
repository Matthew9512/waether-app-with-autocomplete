export const API_LINK = `https://api.open-meteo.com/v1/forecast?`;
export const API_SCOPE = `hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&&timezone=auto`;

export const _options = {
  method: 'GET',
  params: { namePrefixDefaultLangResults: 'true', languageCode: 'pl' },
  headers: {
    'X-RapidAPI-Key': '32a6bd7e9dmsh3552baee89ed382p189bfejsne6b479110e8f',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const _debounce = function (fn, deley = 1100) {
  let id;
  return (...args) => {
    if (id) clearInterval(id);
    id = setTimeout(() => {
      fn(...args);
    }, deley);
  };
};
