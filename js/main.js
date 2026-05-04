import { createThumbnails, pictures } from './thumbnails';
import { openPopup} from './popup.js';
import { getPhotos } from './generateData.js';

const photos = getPhotos();

createThumbnails(photos);

pictures.addEventListener('click' ,(evt) =>{
  const picture = evt.target.closest('.picture');

  if(picture) {
    evt.preventDefault();
    const id = parseInt(picture.dataset.id, 10);
    openPopup(photos, id);
  }
});
