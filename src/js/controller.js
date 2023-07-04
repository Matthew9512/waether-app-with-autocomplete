import '/src/sass/styles.scss';
import { state, getWeather, cityName } from './model.js';
import { _options } from './config.js';

const btnLocation = document.querySelector('.btn-location');
const inpLocation = document.querySelector('.inp-location');

// get users current location
const locationAccess = function (position) {
   const { latitude } = position.coords;
   const { longitude } = position.coords;
   state.lat = latitude;
   state.long = longitude;

   location();
};

// user decline location access
const locationDecline = function () {
   const loader = document.querySelector('.loader');
   //  const weekly = document.querySelector('.weekly');
   loader.classList.add('hidden');
   //  weekly.classList.add('hidden');
   setTimeout(() => {
      alert(`There was an error getting your location. Please allow us to use your location and refresh the page.`);
   }, 500);
};

// fetch data for users current location
const location = async function () {
   const respond = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=%2B${state.lat}%2B${state.long}`,
      _options
   );
   const data = await respond.json();

   state.cityName = `${data.data.at(0).city}, ${data.data.at(0).country}`;

   getWeather();
};

// slice fetched data to retrive hourly weather for next day based on local city time
export const dayInfo = function (hourly) {
   const index = state.current.time.indexOf('T');
   const time = state.current.time.trim().slice(index + 1);
   const day = state.current.time.trim().slice(0, index);

   if (hourly) return `${day}T${time}`;
   else return [day, time];
};

navigator.geolocation.getCurrentPosition(locationAccess, locationDecline);

// fetch data of city based on fetched city list
btnLocation.addEventListener('click', () => {
   const loader = document.querySelector('.loader');
   loader.classList.remove('hidden');
   const city = state.cityData.find((value) => `${value.cityName}, ${value.countryCode}` === inpLocation.value);

   state.lat = city.lat;
   state.long = city.long;
   state.cityName = `${city.cityName}, ${city.countryName}`;

   getWeather();

   const weekly = document.querySelector('.weekly');
   weekly.classList.remove('hide');

   inpLocation.value = '';
});
inpLocation.addEventListener('input', () => {
   state.cityName = inpLocation.value;
   if (inpLocation.value.includes(',')) return;
   cityName();
});
