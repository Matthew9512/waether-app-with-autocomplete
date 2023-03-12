import { state, addIcons } from '../model.js';

export const weeklyView = function () {
  const weeklyForecast = document.querySelector('.weekly__forecast');

  weeklyForecast.innerHTML = '';

  for (let i = 1; i < state.weekly.icon.length; i++) {
    const icon = addIcons(state.weekly.icon[i]);
    const html = `
    <div class="weekly__forecast-item">
      <p class="weekly__forecast-item-date">${state.weekly.time[i]}</p>
      <img src="../../../img/${icon}.svg" alt="Weather icon" class="weekly__forecast-item-icon" />
      <div class="weekly__forecast-item-temp">
        <p class="weekly__forecast-item-temp-day">${parseInt(state.weekly.tempDay[i])}°C</p>
        <p class="weekly__forecast-item-temp-night">${parseInt(state.weekly.tempNight[i])}°C</p>
    </div>
  </div>`;
    weeklyForecast.insertAdjacentHTML('beforeend', html);
  }
};
