import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showToastMessage,
  initializeLightbox,
} from './js/render-functions.js';

let query = '';
let page = 1;
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  initializeLightbox();
  const searchForm = document.querySelector('.search-form');
  const loadMoreButton = document.querySelector('.load-more');

  searchForm.addEventListener('submit', onSearch);
  loadMoreButton.addEventListener('click', onLoadMore);
});

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    showToastMessage('Please enter a search query.');
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchAndRenderImages();
}

async function onLoadMore() {
  page += 1;
  await fetchAndRenderImages();
  smoothScroll();
}

async function fetchAndRenderImages() {
  try {
    const { hits, totalHits: newTotalHits } = await fetchImages(query, page);

    if (hits.length === 0) {
      showToastMessage('Sorry, no images found. Try again!');
      return;
    }

    totalHits = newTotalHits;
    renderImages(hits);

    if (page * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      showToastMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    showToastMessage(
      'An error occurred while fetching images. Please try again.'
    );
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery__item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
