import '/src/sass/styles.scss';
import * as config from './config.js';
import { state, getWeather, cityName } from './model.js';

const btnLocation = document.querySelector('.btn-location');
const inpLocation = document.querySelector('.inp-location');

//
const locationAccess = function (position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  state.lat = latitude;
  state.long = longitude;

  getWeather();
};

//
const locationDecline = function () {
  alert(`no access`);
};

//
export const dayInfo = function (hourly) {
  const date = new Date();

  let numberDay = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  const nameDay = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (numberDay < 10) numberDay = `0${numberDay}`;
  if (month < 10) month = `0${month}`;
  if (minute < 10) minute = `0${minute}`;

  if (hourly) {
    const day = `${year}-${month}-${numberDay}`;
    const time = `${hour}:00`;

    const actualTime = `${day}T${time}`;
    return actualTime;
  } else {
    const day = `${numberDay}.${month}.${year}`;
    const time = `${nameDay}, ${hour}:${minute}`;
    return [day, time];
  }
};

navigator.geolocation.getCurrentPosition(locationAccess, locationDecline);
btnLocation.addEventListener('click', () => {
  getWeather();
});
inpLocation.addEventListener('input', () => {
  state.cityName = inpLocation.value;
  cityName();
});
