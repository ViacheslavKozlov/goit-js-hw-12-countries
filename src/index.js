import singleCountryMarkup from './templates/country.hbs'
import countryListMarkup from './templates/country-list.hbs'
import fetchCountries from './js/fetchCountries.js'

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('.js-input'),
    countryList: document.querySelector('.countries'),
};

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(evt) {
    const normalizedInput = evt.target.value.toLowerCase();
    refs.countryList.innerHTML = '';

    if (normalizedInput !== '') {
        return fetchCountries(normalizedInput)
            .then(renderMarkup);
    }
}

function renderMarkup(numberOfCountries) {
    
    if (numberOfCountries.length > 10) {
        error({
            text: 'Too many matches has been found. Please specify your query!',
            delay: 2500,
        });
    }
    if (numberOfCountries.length >= 2 && numberOfCountries.length <= 10) {
        return numberOfCountries.forEach(() => (refs.countryList.innerHTML = countryListMarkup(numberOfCountries)));
    }
    if (numberOfCountries.length === 1) {
        return refs.countryList.insertAdjacentHTML('afterbegin', singleCountryMarkup(numberOfCountries));
    }
}