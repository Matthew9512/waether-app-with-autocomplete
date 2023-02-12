import * as config from './config.js';
import { dayInfo } from './controller.js';
import { hourlyView } from './views/hourlyView.js';
import { currentView } from './views/currentView.js';
import { weeklyView } from './views/weeklyView.js';
import { cityOptions } from './views/cityOptionsView.js';

export const state = {
  lat: [],
  long: [],
  cityName: [],
  current: [],
  forecast: [],
  hourly: [],
  cityData: [],
};

//
export const iconsMap = new Map();
export const valuesMap = new Map();

//
export const getWeather = async function () {
  const respond = await fetch(`${config.API_LINK}latitude=${state.lat}&longitude=${state.long}&${config.API_SCOPE}
  `);
  const data = await respond.json();

  destructuringData(data);
};

//
const destructuringData = function (data) {
  const hourly = true;

  state.current = {
    temp: parseInt(data.current_weather.temperature),
    wind: parseInt(data.current_weather.windspeed),
    icon: data.current_weather.weathercode,
    time: data.current_weather.time,
  };

  state.weekly = {
    tempDay: data.daily.temperature_2m_max,
    tempNight: data.daily.temperature_2m_min,
    realTemp: data.daily.apparent_temperature_max,
    time: data.daily.time,
    icon: data.daily.weathercode,
  };

  const actualTime = dayInfo(hourly);

  // need 24 indexes from actual hour
  const indexOfActualTime = data.hourly.time.indexOf(actualTime);

  //
  state.hourly = {
    temp: data.hourly.temperature_2m.splice(indexOfActualTime, 24),
    time: data.hourly.time.splice(indexOfActualTime, 24),
    icon: data.hourly.weathercode.splice(indexOfActualTime, 24),
    wind: data.hourly.windspeed_10m.splice(indexOfActualTime, 24),
  };

  weeklyView();
  currentView();
  hourlyView();
};

//
export const setIcons = function (values, icon) {
  values.forEach((value) => {
    iconsMap.set(value, icon);
  });
};

setIcons([0, 1], 'sun');
setIcons([2], 'cloud-sun');
setIcons([3], 'cloud');
setIcons([45, 48], 'smog');
setIcons([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'cloud-showers-heavy');
setIcons([71, 73, 75, 77, 85, 86], 'snowflake');
setIcons([95, 96, 99], 'cloud-bolt');

//
export const addIcons = function (icon) {
  return iconsMap.get(icon);
};

//
export const addValues = function (value) {
  return valuesMap.get(value);
};

//
export const cityName = config._debounce(async function () {
  const respond = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${state.cityName}`,
    config._options
  );
  const data = await respond.json();

  state.cityData = data.data.map((value) => {
    return {
      cityName: value.city,
      countryName: value.country,
      countryCode: value.countryCode,
      lat: value.latitude,
      long: value.longitude,
    };
  });

  cityOptions();
});
