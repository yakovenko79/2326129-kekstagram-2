import { getPhotos } from './generateData';
import { isEscapeKey } from './utils';

const modal = document.querySelector('.big-picture');
const modalImage = modal.querySelector('.big-picture__img').querySelector('img');
const modalLikes = modal.querySelector('.likes-count');

const socialComments = modal.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const socialPicture = modal.querySelector('.social__avatar');
const socialComment = modal.querySelector('.social__comment');
const modalVisibleCommentsAmount = modal.querySelector('.social__comment-shown-count');
const modalCommonCommentsAmount = modal.querySelector('.social__comment-total-count');
const commentsCount = modal.querySelector('.social__comment-count');
const commentsLoader = modal.querySelector('.social__comments-loader');
const modalDescription = modal.querySelectorAll('.social__caption');
const closePopupButton = modal.querySelector('.big-picture__cancel');


function closeBigImage() {
  // evt.preventDefault();
  closeBigImagePopup();
}

function pressEscKey() {
  // evt.preventDefault();
  if(isEscapeKey){
    closeBigImagePopup();
  }
}

function closeBigImagePopup() {
  modal.classList.add('hidden');
  modal.removeEventListener('click', closeBigImage);
  document.removeEventListener('keydown', pressEscKey);
}

export function openPopup(photos, imageId){
  const currentImage = photos.find((img) => img.id === parseInt(imageId, 10));
  if(!currentImage) {
    return;
  }
  const socialCommentsFragment = document.createDocumentFragment();
  modalImage.src = currentImage.url;
  modalImage.alt = currentImage.description;
  modalLikes.textContent = currentImage.likes;
  modalCommonCommentsAmount.textContent = currentImage.comments.length;
  modalDescription.textContent = currentImage.description;
  modalCommonCommentsAmount.textContent = currentImage.comments.length;

  socialComments.innerHTML = '';

  currentImage.comments.forEach((comment) => {
    const newComment = socialCommentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(newComment);
  });

  socialComments.append(socialCommentsFragment);
  modalDescription.textContent = currentImage.description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closePopupButton.addEventListener('click', closeBigImage);
  document.addEventListener('keydown', pressEscKey);
}
