import './styles.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import template from './template/countryTemplate.hbs';
import countriesListTemplate from './template/countriesListTemplate.hbs';
import fetchCountries from './fetchCountries';

const debounce = require('lodash.debounce');

const root = document.querySelector('.root');
const input = document.querySelector('#input');

function countryDescriber(event) {
  const value = event.target.value;
  if (value) {
    fetchCountries(value).then(data => {
      if (data.length === 1) {
        root.innerHTML = template(data[0]);
        return;
      } else if (data.length > 1 && data.length < 11) {
        root.innerHTML = countriesListTemplate(data);
        return;
      } else if (data.length >= 11) {
        PNotify.error({
          text: 'Too many matches found, enter more specific query',
          delay: 1000,
        });
      }
    });
  }
  root.innerHTML = '';
}

input.addEventListener('input', debounce(countryDescriber, 500));
