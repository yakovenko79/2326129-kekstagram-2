import { isEscapeKey } from './utils.js';
import { createComments, clearComments } from './create-comments.js';

const modal = document.querySelector('.big-picture');
const modalImage = modal.querySelector('.big-picture__img').querySelector('img');
const modalLikes = modal.querySelector('.likes-count');
const modalDescription = modal.querySelector('.social__caption');
const closePopupButton = modal.querySelector('.big-picture__cancel');
const modalCommonCommentsAmount = modal.querySelector('.social__comment-total-count');
const messageInputField = modal.querySelector('.social__footer-text');
const documentBody = document.body;

function onDocumentKeydown() {
  if(isEscapeKey){
    closeBigImagePopup();
  }
}

function closeBigImagePopup() {
  clearComments();
  modal.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openPopup(currentImage){
  modalImage.src = currentImage.url;
  modalImage.alt = currentImage.description;
  modalLikes.textContent = currentImage.likes.toString();
  modalDescription.textContent = currentImage.description;
  modalCommonCommentsAmount.textContent = currentImage.comments.length.toString();

  clearComments();
  createComments(currentImage.comments);

  modal.classList.remove('hidden');
  documentBody.classList.add('modal-open');

  closePopupButton.addEventListener('click', () => {
    closeBigImagePopup();
  });
  document.addEventListener('keydown', onDocumentKeydown);
}

messageInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

export { openPopup };
