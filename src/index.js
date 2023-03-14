import './css/styles.css';

// import fetchCountries from './feth';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;

// const MAX_COUNTRIES = 10;

// const inputEl = document.querySelector('#search-box');

// inputEl.addEventListener('input', debounce(onInputGetCountry, 300));

// const countryInfoEl = document.querySelector('.country-info');
// const countryListEl = document.querySelector('.country-list');

// // РАЗМЕТКА ВСТАВКА

// function showCountry(country) {
//   countryInfoEl.innerHTML = countryMarkup(country);
//   const { height: cardHeight } = document
//     .querySelector('.country-info')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 100,
//     behavior: 'smooth',
//   });
// }

// function showCountries(countries) {
//   countryListEl.innerHTML = countriesMarkup(countries);
//   const { height: cardHeight } = document
//     .querySelector('.country-list')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 100,
//     behavior: 'smooth',
//   });
// }

// // INPUT

// function onInputGetCountry(e) {
//   const searchTerm = e.target.value.trim();
//   clearInfo();
//   if (searchTerm === '') return;
//   fetchCountries(searchTerm)
//     .then(countries => processCountries(countries))
//     .catch(error =>
//       Notiflix.Notify.failure('Oops, there is no country with that name')
//     );
// }

// function processCountries(countries) {
//   if (countries.length === 1) showCountry(countries[0]);
//   else if (countries.length <= MAX_COUNTRIES) showCountries(countries);
//   else
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
// }

// // РАЗМЕТКА ОДНОЙ СТРАНЫ

// function countriesMarkup(countries) {
//   return countries
//     .map(
//       ({ flags, name }) => `
//         <li>
//             <div class="wrapper">
//                 <img
//                  width='30px'
//                     src="${flags.svg}"
//                     alt="${name.common}"
//                     class="image"
//                 />
//                 <span class="details-value">${name.common}</span>
//             </div>
//         </li>
//     `
//     )
//     .join('');
// }

// // РАЗМЕТКА СПИСКА СТРАН

// function countryMarkup({ flags, name, capital, population, languages }) {
//   return `
//         <div class="wrapper">
//             <img src="${flags.svg}" alt="${
//     name.common
//   }" class="image"width='50px'hei/>
//             <h2>${name.common}</h2>
//         </div>
//         <ul>
//             <li>
//                 <p class="details">
//                 Capital: <span class="details-value">${capital}</span>
//                 </p>
//             </li>
//             <li>
//                 <p class="details">
//                 Population: <span class="details-value">${population}</span>
//                 </p>
//             </li>
//             <li>
//                 <p class="details">
//                 Languages:
//                 <span class="details-value">${Object.values(languages).join(
//                   ', '
//                 )}</span>
//                 </p>
//             </li>
//          </ul>
//       `;
// }

// function clearInfo() {
//   countryInfoEl.innerHTML = '';
//   countryListEl.innerHTML = '';
// }
