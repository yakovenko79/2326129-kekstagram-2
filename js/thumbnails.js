const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

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

function createThumbnails(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((image) => {
    fragment.append(createThumbnail(image));
  });
  pictures.append(fragment);
}

export { createThumbnails, pictures };
