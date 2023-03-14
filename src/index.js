// IMPORT COMPONENTS

import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

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
    console.log(totalHits);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// ONSUBMIT FUNCTION

async function onSubmit(e) {
  e.preventDefault();

  loadMoreBtn.classList.remove('is-visible');
  galleryList.innerHTML = '';
  page = 1;

  try {
    console.log(inputEl.value);
    const { hits, totalHits } = await getImages();
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    renderImageList(hits);
    page += 1;

    if (page > 1) {
      loadMoreBtn.classList.add('is-visible');
    }
    console.log(hits);
  } catch (error) {
    console.log(error);
  }
}

// LOADMORE FUNCTION

async function loadMoreImages(e) {
  e.preventDefault();
  page += 1;

  const { hits, totalHits } = await getImages();

  renderImageList(hits);

  const leftHits = totalHits - page * limit;

  Notiflix.Notify.success(`"Hooray! We found ${leftHits} images."`);
  console.log(page);

  if (page > 1 && page * limit < totalHits) {
    loadMoreBtn.classList.add('is-visible');
  } else {
    loadMoreBtn.classList.remove('is-visible');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }

  onScroll();
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
  const markup = hits
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
  galleryList.insertAdjacentHTML('beforeend', markup);
}
