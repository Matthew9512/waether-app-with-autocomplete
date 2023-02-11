// export const API_FORECAST = 'https://api.weatherbit.io/v2.0/forecast/daily?';
export const API_ICONS = 'http://openweathermap.org/img/wn/';

export const API_KEY = '9f85d6299b6f9661ec3044446a51ac7d';
// export const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?';
// export const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?';
// export const API_ICON = 'http://openweathermap.org/img/wn/';
// export const USER_LOCALIZATION = navigator.language.toLowerCase().slice(3);

// new===
// export const API_KEY = '5c3196ad7aa7e13c2b1ef1a808bad09f';
// export const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?';
export const USER_LANG = navigator.language.toLowerCase().slice(3);
export const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?';
// new===

// ================================================
export const API_LINK = `https://api.open-meteo.com/v1/forecast?`;
export const API_SCOPE = `hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&&timezone=auto`;

export const _options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '32a6bd7e9dmsh3552baee89ed382p189bfejsne6b479110e8f',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const _debounce = function (fn, deley = 1200) {
  let id;
  return (...args) => {
    if (id) clearInterval(id);
    id = setTimeout(() => {
      fn(...args);
    }, deley);
  };
};
