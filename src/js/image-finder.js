import updateFetch from './apiService.js';
import debounce from 'lodash.debounce';
import imageCard from '../templates/imagecard-template.hbs';
import { refs } from './refs.js';

refs.input.addEventListener('input', debounce(imageSearchHandler, 1000));
refs.loadingBtn.addEventListener('click', loader);

function imageSearchHandler() {
  if (refs.input.value === '' || refs.input.value === ' ') return;

  updateFetch.query = refs.input.value;
  refs.imagesContainer.innerHTML = '';
  updateFetch.resetPage();

  loader();
}

function loader() {
  updateFetch.makeFetch().then(collection => {
    renderImages(collection);
  });
}

function renderImages(images) {
  const arr = images.hits;

  if (arr.length === 0) {
    refs.imagesContainer.innerHTML = '';
    refs.totalHits.textContent = 'Please, check your query';
    refs.loadingBtn.classList.add('is-hidden');
    refs.scroller.classList.add('is-hidden');

    return;
  }

  const markup = imageCard(arr);

  if (arr.length < updateFetch.pageCapacity) {
    refs.totalHits.textContent = `${images.totalHits} images in the album`;
    refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
    refs.loadingBtn.classList.add('is-hidden');
    return;
  }

  refs.totalHits.textContent = `${images.totalHits} images in the album`;
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
  refs.loadingBtn.classList.remove('is-hidden');
  refs.scroller.classList.remove('is-hidden');
}

// MODAL HANDLING

refs.imagesContainer.addEventListener('click', modalOpener);
refs.modalClosingBtn.addEventListener('click', modalCloser);
refs.modalOverlay.addEventListener('click', modalCloser);

function modalOpener() {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.modal.classList.add('is-open');
  refs.modalImage.setAttribute('src', event.target.dataset.fullscreen);
}

function modalCloser() {
  refs.modal.classList.remove('is-open');
  refs.modalImage.setAttribute('src', '#');
}

//SCROLL TO TOP

refs.scroller.addEventListener('click', e =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  }),
);
