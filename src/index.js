import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('input#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');


function inputClear() {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
};

function inputCheck (event) {
const nameCountryCheck = event.target.value.trim();
    inputClear();

fetchCountries (nameCountryCheck) 
    .then(combination)
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
       
      });
};

function combination(data) {
    if (data.length > 10) {
       return Notify.info('Too many matches found. Please enter a more specific name.')
    }
    else if (data.length >= 2 && data.length <= 10) {
        multipleCountry(data);
    }
    else if (data.lenght === 1) {
        resultCountry(data);
    }

function resultCountry(resultOneCountry) {
    const oneCountry = resultOneCountry 
    .map(el => {
        return `<div> 
        <img src="${flags.svg}" 
        width="40" height="40" alt="flag"> </img>
        <h1> ${el.name.official} </h1>
        </div>
        <ul>
        <li> <span> Capital: <span>src="${el.capital}" </li>
        <li> <span> Population: <span>src="${el.population}" </li>
        <li> <span> Languages: <span>src="${Object.values(el.languages)}" </li>
        </ul>`;
    });

    infoCountry.insertAdjacentHTML('beforeend',oneCountry);
}

function multipleCountry(multiple) {
const result = multiple
    .map(({flags, name}) => {
    return `<li> 
        <img src="${flags.svg}" width="40" height="40"> </img>
        <p>${name.official}</p>
    </li>` 
});

    listCountry.insertAdjacentHTML('beforeend', result);
}};

inputCountry.addEventListener ('input', debounce(inputCheck, DEBOUNCE_DELAY)); 