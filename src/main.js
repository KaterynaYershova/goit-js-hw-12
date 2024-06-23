import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showNoResultsMessage,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfResultsMessage,
} from './js/render-functions.js';

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

document
  .getElementById('search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();

    query = document.getElementById('search-input').value.trim();
    if (!query) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search term!',
        position: 'topRight',
      });
      return;
    }

    showLoader();
    hideLoadMoreButton();
    document.getElementById('gallery').innerHTML = '';
    page = 1;

    try {
      const { hits, totalHits: newTotalHits } = await fetchImages(
        query,
        page,
        perPage
      );
      totalHits = newTotalHits;

      if (hits.length === 0) {
        showNoResultsMessage();
      } else {
        renderImages(hits);
        if (totalHits > perPage) {
          showLoadMoreButton();
        }
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message:
          'Something went wrong while fetching images. Please try again later.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });

document.getElementById('load-more').addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const { hits } = await fetchImages(query, page, perPage);

    if (hits.length === 0) {
      showEndOfResultsMessage();
    } else {
      renderImages(hits);
      if (page * perPage >= totalHits) {
        hideLoadMoreButton();
        showEndOfResultsMessage();
      } else {
        showLoadMoreButton();
      }

      const { height: cardHeight } = document
        .querySelector('.gallery li')
        .getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'Something went wrong while fetching images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
