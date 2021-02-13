import updateFetch from './apiService.js';
import imageCard from '../templates/imagecard-template.hbs';

const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.getElementById('input'),

  imagesContainer: document.getElementById('images-container'),
  totalHits: document.getElementById('total-result'),

  loadingBtn: document.getElementById('loading-button'),
};

refs.input.addEventListener('blur', e => {
  
  updateFetch.inputedText = refs.input.value;
  refs.imagesContainer.innerHTML = '';
  updateFetch.resetPage();

  updateFetch.makeFetch().then(images => {
    renderImages(images);
  });
});

refs.loadingBtn.addEventListener('click', e => {
  updateFetch.makeFetch().then(images => {
    renderImages(images);
  });
});

// function loadMore() {
// }

function renderImages(images) {
  const arr = images.hits;

  if (arr.length === 0) return;

  const markup = imageCard(arr);
  refs.totalHits.textContent = `${images.totalHits} images in the album`;
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
  refs.loadingBtn.classList.remove('is-hidden');
}
