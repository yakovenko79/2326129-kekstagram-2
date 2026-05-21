import { openPopup } from './popup';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
let currentPhotos = [];

function createThumbnail (photo) {
  const thumbnail = template.cloneNode(true);
  thumbnail.dataset.id = photo.id;
  const picture = thumbnail.querySelector('.picture__img');
  const likes = thumbnail.querySelector('.picture__likes');
  const comments = thumbnail.querySelector('.picture__comments');
  picture.src = photo.url;
  picture.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  return thumbnail;
}

function onPicturesClick(evt) {
  const picture = evt.target.closest('.picture');
  if(picture) {
    const id = parseInt(picture.dataset.id, 10);
    const photo = currentPhotos.find((img) => img.id === id);
    if(photo){
      openPopup(photo);
    }
  }
}

function createThumbnails(photos) {
  pictures.querySelectorAll('.picture').forEach((el) => el.remove());
  currentPhotos = photos;
  const fragment = document.createDocumentFragment();
  photos.forEach((image) => {
    fragment.append(createThumbnail(image));
  });
  pictures.append(fragment);
}

pictures.addEventListener('click', onPicturesClick);

export { createThumbnails };
