import { state, addIcons } from '../model.js';
import { dayInfo } from '../controller.js';

export const currentView = function () {
  const location = document.querySelector('.location');

  const [day, time] = dayInfo();
  const icon = addIcons(state.current.icon);

  location.innerHTML = '';

  const html = `
    <article class="location__info">
      <div class="location__info-div">
        <p class="location__info-div-title">Weather forecast</p>
        <p class="location__info-div-date">${day}</p>
        <p class="location__info-div-time">${time}</p>
      </div>
      <div class="location__info-city">
        <p class="location__info-city-capitol">${state.cityName}</p>
      </div>
      <div class="location__info-weather">
        <p class="location__info-weather-temp">${state.current.temp}°C</p>
        <p class="location__info-weather-wind">Wind: ${state.current.wind}km/h</p>
        <p class="location__info-weather-rain">Real fell: ${parseInt(state.weekly.realTemp.at(0))}°C</p>
      </div>
    </article>
      <img src="../../../img/${icon}.svg" alt="" class="location-img" />`;
  location.insertAdjacentHTML('afterbegin', html);
};
