import { state, addIcons } from '../model';

export const hourlyView = function () {
  const forecastHours = document.querySelector('.forecast__hours');
  forecastHours.innerHTML = '';

  for (let i = 0; i < state.hourly.icon.length; i++) {
    const icon = addIcons(state.hourly.icon[i]);

    const index = state.hourly.time[i].indexOf('T');
    const html = `
      <div class="forecast__hours-item">
        <p class="forecast__hours-item-hour">${state.hourly.time[i].slice(index + 1)}</p>
        <img src="../../img/${icon}.svg" alt="Weather icon" class="weekly__forecast-item-icon" />
        <p class="forecast__hours-item-temp">${parseInt(state.hourly.temp[i])}°C</p>
        <p class="forecast__hours-item-wind">${parseInt(state.hourly.wind[i])}km/h</p>
      </div>`;
    forecastHours.insertAdjacentHTML('beforeend', html);
  }
};
