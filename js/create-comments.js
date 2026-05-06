const COMMENTS_STEP = 5;
const modal = document.querySelector('.big-picture');
const socialComments = modal.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const shownCounter = modal.querySelector('.social__comment-shown-count');
const totalCounter = modal.querySelector('.social__comment-total-count');
const commentsLoader = modal.querySelector('.social__comments-loader');
let currentAmountComments = 0;
let comments = [];

function onNextComment() {
  const fragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentAmountComments, currentAmountComments + COMMENTS_STEP);
  currentAmountComments += nextComments.length;

  nextComments.forEach((comment) => {
    const newComment = socialCommentTemplate.cloneNode(true);
    const socialPicture = newComment.querySelector('.social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(newComment);
  });

  socialComments.appendChild(fragment);
  shownCounter.textContent = currentAmountComments.toString();
  totalCounter.textContent = comments.length.toString();

  if (currentAmountComments >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function clearComments() {
  currentAmountComments = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
}

function createComments(currentComments) {
  comments = currentComments;
  commentsLoader.removeEventListener('click', onNextComment);
  commentsLoader.addEventListener('click', onNextComment);
  commentsLoader.click();
}

export { createComments, clearComments };
