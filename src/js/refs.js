export const refs = {
  input: document.getElementById('input'),
  imagesContainer: document.getElementById('images-container'),
  totalHits: document.getElementById('total-result'),
  loadingBtn: document.getElementById('loading-button'),
  modal: document.getElementById('lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalClosingBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  modalOverlay: document.querySelector('.lightbox__overlay'),

  scroller: document.getElementById('scroller-box'),
};
