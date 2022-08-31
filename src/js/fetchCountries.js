import Notify from 'notiflix';
import { countryInfo, countryList } from './refs';

export default function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        Notify.Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('console.log in then');
      //тут отримано об'єкт з результатом/-и
      tracksResults(data);
    })
    .catch(error => {
      console.log('~ error', error);
    });
}

function tracksResults(data) {
  //сюди перенаправлені результати запиту для обробки
  // console.log('~ params', data);
  // console.log('~ params', data.length);
  //перевірка на кількість результатів
  //якщо результат один - вивести у country-info
  if (data.length == 1) {
    console.log('один варіант, виведено результат');

    createCountryInfo(data);
  }
  //якщо результатів від 2 до 10 - вивести у country-list
  else if (data.length <= 10) {
    console.log('Результатів від 2 до 10. Додати у список');

    createCountryList(data);
  }
  //якщо результатів більше ніж 10 - вивести сповіщення "Too many matches found. Please enter a more specific name."
  else if (data.length > 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    console.log('Too many matches found. Please enter a more specific name.');
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
