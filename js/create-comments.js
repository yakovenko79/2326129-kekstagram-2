const COMMENTS_STEP = 5;
let currentAmountComments = 0;
let comments = [];

const modal = document.querySelector('.big-picture');
const socialComments = modal.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const shownCountSpan = modal.querySelector('.social__comment-shown-count');
const totalCountSpan = modal.querySelector('.social__comment-total-count');
const commentsLoader = modal.querySelector('.social__comments-loader');

function createNextComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentAmountComments, currentAmountComments + COMMENTS_STEP);
  const newShown = currentAmountComments + nextComments.length;

  nextComments.forEach((comment) => {
    const newComment = socialCommentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(newComment);
  });

  socialComments.appendChild(fragment);
  shownCountSpan.textContent = newShown;
  totalCountSpan.textContent = comments.length;

  if (newShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentAmountComments = newShown;
}

function clearComments() {
  currentAmountComments = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', createNextComments);
}

function createComments(currentComments) {
  comments = currentComments;
  commentsLoader.addEventListener('click', createNextComments);
  createNextComments();
}

export { createComments, clearComments };
