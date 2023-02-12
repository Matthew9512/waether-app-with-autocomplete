import { state } from '../model';

export const cityOptions = function () {
  const cities = document.querySelector('#cities');

  cities.innerHTML = '';

  for (const city of state.cityData) {
    const html = `
    <option class="options" value="${city.cityName}, ${city.countryCode}"></option>`;
    cities.insertAdjacentHTML('afterbegin', html);
  }
};
