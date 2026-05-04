import { isEscapeKey } from './utils.js';
import { createComments, clearComments } from './create-comments.js';

const modal = document.querySelector('.big-picture');
const modalImage = modal.querySelector('.big-picture__img').querySelector('img');
const modalLikes = modal.querySelector('.likes-count');
const modalDescription = modal.querySelector('.social__caption');
const closePopupButton = modal.querySelector('.big-picture__cancel');
const modalCommonCommentsAmount = modal.querySelector('.social__comment-total-count');


function closeBigImage() {
  closeBigImagePopup();
}

function pressEscKey() {
  if(isEscapeKey){
    closeBigImagePopup();
  }
}

function closeBigImagePopup() {
  clearComments();
  modal.classList.add('hidden');
  modal.removeEventListener('click', closeBigImage);
  document.removeEventListener('keydown', pressEscKey);
}

export function openPopup(photos, imageId){
  const currentImage = photos.find((img) => img.id === parseInt(imageId, 10));
  modalImage.src = currentImage.url;
  modalImage.alt = currentImage.description;
  modalLikes.textContent = currentImage.likes;
  modalDescription.textContent = currentImage.description;
  modalCommonCommentsAmount.textContent = currentImage.comments.length;

  clearComments();
  createComments(currentImage.comments);

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closePopupButton.addEventListener('click', closeBigImage);
  document.addEventListener('keydown', pressEscKey);
}
