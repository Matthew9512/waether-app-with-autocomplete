import { API_ICONS } from '../config.js';
import { state } from '../model.js';

export const weeklyView = function () {
  const weeklyForecast = document.querySelector('.weekly__forecast');

  weeklyForecast.innerHTML = '';

  for (let i = 1; i < state.forecast.icon.length; i++) {
    const html = `
    <div class="weekly__forecast-item">
      <p class="weekly__forecast-item-date">${state.forecast.time[i]}</p>
      <img src="" alt="Weather icon" class="weekly__forecast-item-icon" />
      <div class="weekly__forecast-item-temp">
        <p class="weekly__forecast-item-temp-day">${parseInt(state.forecast.tempDay[i])}*C</p>
        <p class="weekly__forecast-item-temp-night">${parseInt(state.forecast.tempNight[i])}*C</p>
    </div>
  </div>`;
    weeklyForecast.insertAdjacentHTML('afterbegin', html);
  }
};
