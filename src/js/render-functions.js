import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images, galleryElement) {
  const markup = images
    .map(image => {
      return `
<a href="${image.largeImageURL}" class="gallery-item">
<img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
<div class="image-info">
<p><b>Likes:</b> ${image.likes}</p>
<p><b>Views:</b> ${image.views}</p>
<p><b>Comments:</b> ${image.comments}</p>
<p><b>Downloads:</b> ${image.downloads}</p>
</div>
</a>`;
    })
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
