import * as config from './config.js';
import { dayInfo } from './controller.js';
import { hourlyView } from './views/hourlyView.js';
import { overallView } from './views/overallView.js';
import { weeklyView } from './views/weeklyView.js';

export const state = {
  lat: [],
  long: [],
  cityName: [],
  current: [],
  forecast: [],
  hourly: [],
};

//
export const getWeather = async function () {
  const respond = await fetch(`${config.API_LINK}latitude=${state.lat}&longitude=${state.long}&${config.API_SCOPE}
  `);
  // const respond = await fetch(`
  // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.4056&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&&timezone=auto
  // `);

  const data = await respond.json();
  // console.log(data);

  destructuringData(data);
};

//
const destructuringData = function (data) {
  const hourly = true;

  // need 24 indexes from actual hour
  const actualTime = dayInfo(hourly);

  //
  const indexOfActualTime = data.hourly.time.indexOf(actualTime);

  state.current = {
    temp: parseInt(data.current_weather.temperature),
    wind: parseInt(data.current_weather.windspeed),
    icon: data.current_weather.weathercode,
    time: data.current_weather.time,
  };

  state.forecast = {
    tempDay: data.daily.temperature_2m_max,
    tempNight: data.daily.temperature_2m_min,
    time: data.daily.time,
    icon: data.daily.weathercode,
  };

  //
  state.hourly = {
    temp: data.hourly.temperature_2m.splice(indexOfActualTime, 24),
    time: data.hourly.time.splice(indexOfActualTime, 24),
    icon: data.hourly.weathercode.splice(indexOfActualTime, 24),
    wind: data.hourly.windspeed_10m.splice(indexOfActualTime, 24),
  };

  weeklyView();
  overallView();
  hourlyView();
};

//
export const cityName = config._debounce(async function () {
  console.log(state.cityName);
  const respond = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${state.cityName},`, config._options);
  const data = await respond.json();
  console.log(data);
});
