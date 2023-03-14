import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '31653435-37328083d6bab3363a0f0d9c1';
const BASE_URL = 'https://pixabay.com/api/';
const inputEl = document.querySelector('input');
const submitEl = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
let limit = 40;
let page = 2;

submitEl.addEventListener('submit', onSubmit);

// ONSUBMIT FUNCTION

async function onSubmit(e) {
  e.preventDefault();
  //   galleryList.innerHTML = '';
  try {
    console.log(inputEl.value);
    const images = await getImages();
    renderImageList(images);
    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    console.log(images);
  } catch (error) {
    console.log(error);
  }
}

// FETCH FUNCTION

async function getImages() {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: `${KEY}`,
        q: `${inputEl.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: limit,
        page: page,
      },
    });
    return response.data.hits;
    // console.log(response.data.hits);
  } catch (error) {
    console.error(error);
  }
}

// RENDER FUNCTION

function renderImageList(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> <br>${likes} 
    </p>
    
    <p class="info-item">
      <b>Views</b><br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${downloads}
    </p>
  </div>
</div>
    `
    )
    .join('');
  galleryList.innerHTML = markup;
}

// 'https://pixabay.com/api/?key=31653435-37328083d6bab3363a0f0d9c1';

// https://pixabay.com/api/?key=31653435-37328083d6bab3363a0f0d9c1
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.

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
