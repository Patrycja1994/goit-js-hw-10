import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputCountry.addEventListener ('input', debounce(inputCheck, DEBOUNCE_DELAY)); 

function inputClear() {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
};

function inputCheck (event) {
const nameCountryCheck = event.target.value.trim();
    inputClear();

    fetchCountries(nameCountryCheck)
    .then(country => {
         if (country.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.')
        }
        else if (country.length >= 2 && country.length <= 10) {
         multipleCountry(country);
        }
        else if (country.length === 1) {
         resultCountry(country);
        }
        else if (country.status === 404) {
         return Notify.failure('Oops, there is no country with that name');
       }
    })
 
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
    }



function resultCountry(resultOneCountry) {
    const oneCountry = resultOneCountry 
    .map(el => {
        return `<div> 
        <img src="${el.flags.svg}" 
        width="40" height="40" alt="flag"> </img>
        <h1> ${el.name.official} </h1>
        </div>
        <ul>
        <li> <span> Capital: </span>"${el.capital}" </li>
        <li> <span> Population: </span>"${el.population}" </li>
        <li> <span> Languages: </span>"${Object.values(el.languages)}" </li>
        </ul>`;
    })
    .join('');
    infoCountry.insertAdjacentHTML('beforeend', oneCountry)
}

function multipleCountry(multiple) {
const result = multiple
    .map(({flags, name}) => {
    return `<li> 
        <img src="${flags.svg}" width="40px" height="40px"> </img>
        <p>${name.official}</p>
    </li>` 
})
    .join('');
    listCountry.insertAdjacentHTML('beforeend', result);
};

