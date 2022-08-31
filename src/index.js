import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import { input, countryList, countryInfo } from './js/refs';

const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(evt => onInput(evt), DEBOUNCE_DELAY)
);

function onInput(evt) {
  const textInput = evt.target.value.trim();
  // console.log('~ textInput', textInput);
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (textInput) {
    fetchCountries(textInput);
  }
}
