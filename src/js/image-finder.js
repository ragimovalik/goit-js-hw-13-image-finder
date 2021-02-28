import updateFetch from './apiService.js';
import debounce from 'lodash.debounce';
import imageCard from '../templates/imagecard-template.hbs';
import { refs } from './refs.js';

refs.input.addEventListener('input', debounce(imageSearchHandler, 1000));
refs.input.addEventListener('keydown', e => {
  if (e.code !== 'Enter') return;
  e.preventDefault();
  imageSearchHandler();
});
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

  scrolling();
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

//SCROLL
//Scroller hide&show
window.addEventListener('scroll', function () {
  document.documentElement.scrollTop <= 120
    ? scrollHandler.hide()
    : scrollHandler.show();
});

const scrollHandler = {
  hide() {
    refs.scroller.classList.add('is-hidden');
  },

  show() {
    refs.scroller.classList.remove('is-hidden');
  },
};

//Scroll to loaded page top

const scrolling = () => {
  if (updateFetch.pageNumber > 2)
    return scrollBy(0, document.documentElement.clientHeight - 80);
};

//Scroll to Pagetop

refs.scroller.addEventListener('click', scrollToTop);

function scrollToTop() {
  return scrollTo({ top: 0 });
}
