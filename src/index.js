// IMPORT COMPONENTS

import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  showCounter: false,
});

// lightbox.refresh();

// CONST

const KEY = '31653435-37328083d6bab3363a0f0d9c1';
const BASE_URL = 'https://pixabay.com/api/';
let limit = 40;
let page = 1;

// REFS

const inputEl = document.querySelector('input');
const submitEl = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// EVENTS

submitEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

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
    const { hits, totalHits } = response.data;

    console.log(hits);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// ONSUBMIT EVENT FUNCTION

async function onSubmit(e) {
  e.preventDefault();

  loadMoreBtn.classList.remove('is-visible');
  galleryList.innerHTML = '';
  page = 1;

  try {
    const { hits, totalHits } = await getImages();
    if (hits.length === 0 || inputEl.value === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);

    renderImageList(hits);
  } catch (error) {
    console.log(error);
  }
}

// LOADMORE EVENT FUNCTION

async function loadMoreImages(e) {
  e.preventDefault();

  try {
    const { hits, totalHits } = await getImages();

    renderImageList(hits);

    const leftHits = totalHits - (page - 2) * limit;

    Notiflix.Notify.success(`"Hooray! Left ${leftHits} images."`);

    if (page * limit >= totalHits) {
      loadMoreBtn.classList.remove('is-visible');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }

    onScroll();
  } catch (error) {
    console.log(error);
  }
}

// CREATE LOADMORE BTN

function createtLoadMoreBtn() {
  page += 1;

  if (page > 1 && galleryList.innerHTML.trim() !== '') {
    loadMoreBtn.classList.add('is-visible');
  }
  console.log(page);
}

// SCROLL FUNCTION

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

// RENDER FUNCTION

function renderImageList(hits) {
  let markup = '';

  hits.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      markup += `
      <a href="${largeImageURL}">
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
      </a>
    `;
    }
  );

  galleryList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  createtLoadMoreBtn();

  const lastImage = document.querySelector('.gallery a:last-child');

  if (lastImage) {
    infiniteScroll.observe(lastImage);
  }
}

// INFINITE SCROLL (IntersectionObserver)

const infiniteScroll = new IntersectionObserver(async ([entry], observer) => {
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    const { hits, totalHits } = await getImages();
    renderImageList(hits);
  }
}, {});

// ----------------------------------------------------
// BACKUP-------------------------------------------------
// ------------------------------------------------------

// // IMPORT COMPONENTS

// import './css/styles.css';
// import axios from 'axios';
// import Notiflix from 'notiflix';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const lightbox = new SimpleLightbox('.gallery a', {
//   showCounter: false,
// });

// // lightbox.refresh();

// // CONST

// const KEY = '31653435-37328083d6bab3363a0f0d9c1';
// const BASE_URL = 'https://pixabay.com/api/';
// let limit = 40;
// let page = 1;

// // REFS

// const inputEl = document.querySelector('input');
// const submitEl = document.querySelector('#search-form');
// const galleryList = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// // EVENTS

// submitEl.addEventListener('submit', onSubmit);
// loadMoreBtn.addEventListener('click', loadMoreImages);

// // ONSUBMIT EVENT FUNCTION

// async function onSubmit(e) {
//   e.preventDefault();

//   loadMoreBtn.classList.remove('is-visible');
//   galleryList.innerHTML = '';
//   page = 1;

//   try {
//     const { hits, totalHits } = await getImages();
//     if (hits.length === 0 || inputEl.value === '') {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);

//     renderImageList(hits);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // LOADMORE EVENT FUNCTION

// async function loadMoreImages(e) {
//   e.preventDefault();

//   try {
//     const { hits, totalHits } = await getImages();

//     renderImageList(hits);

//     const leftHits = totalHits - (page - 2) * limit;

//     Notiflix.Notify.success(`"Hooray! Left ${leftHits} images."`);

//     if (page * limit >= totalHits) {
//       loadMoreBtn.classList.remove('is-visible');
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }

//     onScroll();
//   } catch (error) {
//     console.log(error);
//   }
// }

// // CREATE LOADMORE BTN

// function createtLoadMoreBtn() {
//   page += 1;

//   if (page > 1 && galleryList.innerHTML.trim() !== '') {
//     loadMoreBtn.classList.add('is-visible');
//   }
//   console.log(page);
// }

// // SCROLL FUNCTION

// function onScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 3,
//     behavior: 'smooth',
//   });
// }

// // RENDER FUNCTION

// function renderImageList(hits) {
//   const markup = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
// <a href="${largeImageURL}">
//     <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b> <br>${likes}
//     </p>

//     <p class="info-item">
//       <b>Views</b><br>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b><br>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b><br>${downloads}
//     </p>
//   </div>
// </div>
// </a>
//     `
//     )
//     .join('');

//   galleryList.insertAdjacentHTML('beforeend', markup);

//   lightbox.refresh();

//   createtLoadMoreBtn();
// }

// //
// // FETCH FUNCTION

// async function getImages() {
//   try {
//     const response = await axios.get(`${BASE_URL}`, {
//       params: {
//         key: `${KEY}`,
//         q: `${inputEl.value}`,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         per_page: limit,
//         page: page,
//       },
//     });
//     const { hits, totalHits } = response.data;

//     console.log(hits);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
//
