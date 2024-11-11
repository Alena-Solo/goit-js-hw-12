import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
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
    <a href="${largeImageURL}" class="gallery__link">
      <div class="gallery__item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="gallery__info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </div>
    </a>
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').classList.remove('hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.load-more').classList.add('hidden');
}

export function showToastMessage(message) {
  iziToast.info({ title: 'Info', message });
}
