import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryElement = document.getElementById('gallery');
let lightbox;

export function renderImages(images) {
  const markup = images
    .map(
      image => `
    <li>
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <div class="labels">
          <p>Likes</p>
          <p>Views</p>
          <p>Comments</p>
          <p>Downloads</p>
        </div>
        <div class="values">
          <p>${image.likes}</p>
          <p>${image.views}</p>
          <p>${image.comments}</p>
          <p>${image.downloads}</p>
        </div>
      </div>
    </li>
  `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('[data-lightbox="gallery"]', {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
  }
}

export function showNoResultsMessage() {
  iziToast.info({
    title: 'Info',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

export function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

export function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

export function showLoadMoreButton() {
  document.getElementById('load-more').style.display = 'block';
}

export function hideLoadMoreButton() {
  document.getElementById('load-more').style.display = 'none';
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}
