import { state } from '../model.js';
import { dayInfo } from '../controller.js';
import { API_ICONS } from '../config.js';

export const overallView = function () {
  const location = document.querySelector('.location');

  const [day, time] = dayInfo();

  location.innerHTML = '';

  const html = `
    <article class="location__info">
  <div class="location__info-div">
  <p class="location__info-div-title">Weather forecast</p>
  <p class="location__info-div-date">${day}</p>
  <p class="location__info-div-time">${time}</p>
</div>
<div class="location__info-city">
  <p class="location__info-city-capitol">asdasdasd</p>
  <p class="location__info-city-country">asdasdasd</p>
</div>
<div class="location__info-weather">
  <p class="location__info-weather-temp">${state.current.temp}*C</p>
  <p class="location__info-weather-wind">Wind: ${state.current.wind}km</p>
  <p class="location__info-weather-rain">Rainfall : 50%</p>
  </div>
  </article>
<img src="" alt="" class="location-img" />`;
  location.insertAdjacentHTML('afterbegin', html);
};
{
  /* <img src="${API_ICONS}${newstate.weatherData.icon}@4x.png" alt="" class="location-img" />`; */
}
{
  /* <p class="location__info-weather-humidity">Humidity: ${newstate.current.humidity}%</p> */
}
