import { countryInfo, countryList } from './refs';
import Notify from 'notiflix';

export function tracksResults(data) {
  //якщо результат один - вивести у country-info
  if (data.length == 1) {
    createCountryInfo(data);
  }
  //якщо результатів від 2 до 10 - вивести у country-list
  else if (data.length <= 10) {
    createCountryList(data);
  }
  //якщо результатів більше ніж 10 - вивести сповіщення "Too many matches found. Please enter a more specific name."
  else if (data.length > 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    Notify.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function createCountryInfo(info) {
  const name = info[0].name.official;
  const capital = info[0].capital;
  const population = info[0].population;
  const flags = info[0].flags.svg;
  const languages = info[0].languages;
  const stringTag = `
      <li>
      <h1>${name}</h1>
      <img src="${flags}" alt="flag" width="200">
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>
      </li>`;

  countryList.innerHTML = '';
  countryInfo.insertAdjacentHTML('beforeend', stringTag);
}

function createCountryList(info) {
  let stringTag = '';
  for (let i = 0; i < info.length; i += 1) {
    stringTag += `
          <li><img src="${info[i].flags.svg}" alt="flag" width="30"> ${info[i].name.official}</li>`;
  }

  countryInfo.innerHTML = '';
  countryList.insertAdjacentHTML('beforeend', stringTag);
}
