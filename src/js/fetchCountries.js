import Notify from 'notiflix';
import { tracksResults } from './tracksResults';

export default function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        //помилка 404??
        Notify.Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      //тут отримано об'єкт з результатом/-и
      //функція tracksResults обробляє результат/-и
      tracksResults(data);
    })
    .catch(error => {
      // console.log('~ error', error);
    });
}
