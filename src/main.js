import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import warningIcon from './img/warning.svg';
import closeIcon from './img/close.svg';

import { getImagesByQuery } from './js/pixabay-api';

import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

hideLoader();

const formSearch = document.querySelector('.form');

const input = formSearch.querySelector('input[name="search-text"]');

formSearch.addEventListener('submit', handleSubmit);

function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    iconUrl: warningIcon,
    progressBarColor: '#ffffff',
    messageColor: '#ffffff',
    titleColor: '#ffffff',
    backgroundColor: '#ef4040',
    timeout: 2000,
    close: true,
    onOpening: (instance, toast) => {
      const closeBtn = toast.querySelector('.iziToast-close');
      if (closeBtn) {
        closeBtn.style.backgroundImage = `url(${closeIcon})`;
        closeBtn.style.backgroundSize = '12px 12px';
        closeBtn.style.backgroundRepeat = 'no-repeat';
        closeBtn.style.backgroundPosition = 'center';
        closeBtn.style.color = '#ffffff';
      }
    },
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const query = input.value.toLowerCase().trim();

  if (query === '') {
    showError('Please enter a search query.');
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      showError('Something went wrong. Please try again later.');
    })
    .finally(() => {
      hideLoader();
    });
}
